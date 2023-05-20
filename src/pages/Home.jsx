import { useState, useEffect } from "react";
import "./Home.css";
import Modal from "react-modal";
import { AiOutlineClose, AiFillDelete } from "react-icons/ai";

function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      Width: "500px",
      transform: "translate(-50%, -50%)",
      color: "black",
    },
  };
  const modalHandler = async () => {
    setIsOpen(!modalIsOpen);
  };

  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const addTodoHandler = async (e) => {
    e.preventDefault();
    if (todo) {
      setTodoList([
        ...todoList,
        {
          id: todoList.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
    setIsOpen(!modalIsOpen);
  };

  function deleteTodoHandler(id) {
    const removeTodo = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(removeTodo);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const [filterText, setFilterText] = useState("");
  const [filterList, setFilterList] = useState([]);
  const filterBtnHandler = async (e) => {
    setFilterText(e.target.value);
    if (filterText) {
      setFilterList(
        todoList.filter((todo) =>
          todo.text.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }
  };

  const resetBtnHandler = async () => {
    setFilterList([]);
    setFilterText("");
  };

  return (
    <>
      <div className="filterMain">
        <div className="filterDiv">
          <input
            type="text"
            className="inputField"
            value={filterText}
            placeholder="search here..."
            // onChange={(e) => setFilterText(e.target.value)}
            onChange={filterBtnHandler}
            // onMouseDown={resetBtnHandler}
            // onMouseOut={resetBtnHandler}
          
          ></input>
          {/* <button className="submitBtn" onClick={filterBtnHandler}>
          Search
        </button> */}
          <button className="submitBtn" onClick={resetBtnHandler}>
          Reset
        </button>
        </div>

        <div className="listMain cardContainer">
          {filterList &&
            filterList?.map((elem) => {
              return (
                <div key={elem.id} className="filtercard">
                  <div className="filterCard">{elem.text}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="homeMain">
        <h1 className="head">Add Todo</h1>
        <button className="addBtn" onClick={modalHandler}>
          Add Todo
        </button>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <button className="closeBtn" onClick={modalHandler}>
              <AiOutlineClose />
            </button>
          </div>
          <div>
            <input
              type="text"
              className="inputField"
              value={todo}
              placeholder="Write your todo.."
              onChange={(e) => setTodo(e.target.value)}
            ></input>
            <button className="submitBtn" onClick={addTodoHandler}>
              {" "}
              Add
            </button>
          </div>
        </Modal>
      </div>
      <div className="listMain cardContainer">
        {todoList &&
          todoList?.map((elem) => {
            return (
              <div key={elem.id} className="card">
                <div className="todoCard">{elem.text}</div>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTodoHandler(elem.id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
