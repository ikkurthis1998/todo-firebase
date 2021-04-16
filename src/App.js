import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase_config';


function App() {

  const [todos, setTodos] = useState([]);

  const [inputTodo, setInputTodo] = useState('');

  useEffect(
    () => {
      getTodos();
    }, []
  );

  function toggleIsDone(item) {
    db.collection("todos").doc(item.id).update(
      {
        isDone: !item.isDone
      }
    )
  }
  
  function deleteTodo(item) {
    db.collection("todos").doc(item.id).delete();
  }

  function getTodos() {
    db.collection("todos").onSnapshot(
      (querySnapshot) => {
        setTodos(
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              todo: doc.data().todo,
              isDone: doc.data().isDone
            })
          )
        );
      }
    )
  }

  function addHandler(event) {
    
    event.preventDefault();
    
    var userInput = inputTodo;
    
    db.collection("todos").add(
      {
        "todo": userInput,
        "isDone": false
      }
    );

    var userInputElement = document.querySelector("#userInput");
    userInputElement.value = "";
  }

  return (
    <div className="App">
        <h1>My Todo</h1>
        <form>
          <input className="input-box" placeholder="Enter Todo" id="userInput" onChange={(item) => setInputTodo(item.target.value)}></input>
          <button className="add-button" type="submit" onClick={addHandler}>Add</button>
        </form>
        <div className="todo-list-container">
            {
              todos.map(
                (item) => {
                  return(
                    <div className={item.isDone ? "to-do-item done" : "to-do-item"}>
                      <div className={"left-item"}>
                        <input type="checkbox" checked={item.isDone ? true : false} onClick={() => toggleIsDone(item)} className="checkbox" />
                        <p className={item.isDone ? "to-do-text striked" : "to-do-text"}>{item.todo}</p>
                      </div>
                      <div className={"right-item"}>
                        <button className="delete-button" onClick={() => deleteTodo(item)}>X</button>
                      </div>
                    </div>
                  );
                }
              )
            }
          </div>
    </div>
  );
}

export default App;
