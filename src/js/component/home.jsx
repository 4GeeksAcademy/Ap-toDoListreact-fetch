import React, {useEffect, useState} from "react";

//include images into your bundle
import {getAllToDos, deleteToDos, createToDos, updateToDos} from "./toDoList"

//create your first component
const Home = () => {
	const [Todos, setTodos] = useState([]);
	const [inputValue, setInputValue]= useState("")


	useEffect(()=> {
		const fetchData =async () => {
			let apiTodos = await getAllToDos();
			
			setTodos(apiTodos);
		};
		fetchData();
	}, [])

	const handleCreateTodos = async (label) =>{
		const newTodo = await createToDos({label: label, is_done: false});
		if (newTodo){
			setTodos(prev => [...prev, newTodo]);
		}
	};

	const onType = (event) => {
		setInputValue(event.target.value);
		if (event.key === "Enter" && event.target.value.trim() !== "") {
		  handleCreateTodos(event.target.value);
		  setInputValue("");
		}
	  };
	  
	  const toggleTodoDone = async (index) => {
		const updatedTodos = [...Todos];
		updatedTodos[index] = {
			...updatedTodos[index],
			done: !updatedTodos[index].done
		};
		try {
			const response = await updateToDos(updatedTodos[index].id, updatedTodos[index]);
			if (response) {
				console.log('Updated todo:', response);
				setTodos(updatedTodos);
			} else {
				console.error("API call was successful, but no response was returned.");
			}
		} catch (error) {
			console.error('Failed to update todo:', error);
		}
	  };

	  const handleDeleteTodo = async (index) => {
		const todoId = Todos[index].id;
		if (await deleteToDos(todoId)) {
		  let newTodos = [...Todos];
		  newTodos.splice(index, 1);
		  setTodos(newTodos);
		}
	  };

	  return (
		<div className="todo-container">
		  <h1 className="todo-title">Todo List</h1>
		  <div className="todo-input-container">
			<input
			  className="todo-input"
			  onKeyUp={onType}
			  placeholder="Enter Todo"
			  value={inputValue}
			  onChange={(e) => setInputValue(e.target.value)}
			/>
		  </div>
		  <ul className="todo-ul">
			{Todos.map((todo, index) => (
			  <li className="todo-item" key={index}>
				<input
				  className="todo-checkbox"
				  type="checkbox"
				  checked={todo.done}
				  onChange={() => toggleTodoDone(index)}
				/>
				<p className="todo-label">{todo.label}</p>
				<button
				  className="todo-delete-item"
				  onClick={() => handleDeleteTodo(index)}
				>
				  🗑️
				</button>
			  </li>
			))}
		  </ul>
		  <div className="todo-footer">
			<p className="todo-items-left">{Todos.length} item(s) left</p>
		  </div>
		</div>
	  );
};



export default Home;
