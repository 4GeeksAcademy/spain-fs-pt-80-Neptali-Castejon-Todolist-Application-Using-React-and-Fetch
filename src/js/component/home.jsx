import React, { useEffect, useState } from "react";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";

const Home = () => {
	// Estado para almacenar el valor de la tarea actual
	const [task, setTask] = useState('');
	const [todos, setTodos] = useState([]);
	const [visibleIcons, setVisibleIcons] = useState({});

	useEffect(() => {
		crearUser();
		getData();
	}, []);

	// Manejar el cambio de valor en el campo de entrada
	const handleChange = (e) => setTask(e.target.value);

	// Manejar el envío del formulario para agregar una nueva tarea
	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim()) {
			const newTodo = { label: task, id: Date.now() };
			setTodos([...todos, newTodo]);
			setTask('');
			createTodo(newTodo); // llama a la función para crear el todo en el servidor
		}
	};

	// Función para eliminar una tarea
	const handleClick = (id) => {
		deleteTodo(id); // Llama a la función para eliminar la tarea del servidor
	};

	const handleMouseEnter = (id) => setVisibleIcons((prev) => ({ ...prev, [id]: true }));
	const handleMouseLeave = (id) => setVisibleIcons((prev) => ({ ...prev, [id]: false }));

	const crearUser = async () => {
		try {
			await fetch('https://playground.4geeks.com/todo/users/castejon', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
			});
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	const createTodo = async (todo) => {
		try {
			await fetch('https://playground.4geeks.com/todo/todos/castejon', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: todo.label, // Usa el valor de la tarea ingresada
					is_done: false
				})
			});
		} catch (error) {
			console.error("Error creating todo:", error);
		}
	};

	const getData = async () => {
		try {
			const resp = await fetch('https://playground.4geeks.com/todo/users/castejon');
			const data = await resp.json();
			setTodos(data.todos || []); // Usa la respuesta para establecer los todos
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const resp = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (resp.ok) {
				setTodos(todos.filter((todo) => todo.id !== id)); // Actualiza el estado local
			} else {
				console.error("Failed to delete todo");
			}
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	return (
		<main className="container"> 
            <div className="todo-app d-flex justify-content-center align-items-center vh-100">
                <div className="todo-app__container text-center">

					{/*Componente para el título*/}
					<TodoHeader title="todoList"/>
					
                    <div className="todo-app__content shadow p-0">

						{/* Componente para ingresar nuevas tareas */}
						<TodoInput 
                            inputValue={task}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />

                        <ul className="todo-app__list d-flex flex-column p-0 m-0 w-100">
							{todos.length > 0 ?
								todos.map((element) => (
								<li
									key={element.id}
									className="todo-app__item d-flex align-items-center justify-content-between ps-5 pe-4"
									title="Task item"
									onMouseEnter={() => handleMouseEnter(element.id)}
                    				onMouseLeave={() => handleMouseLeave(element.id)}
								>
									{element.label}
									{visibleIcons[element.id] && (
										<a 
											className="todo-app__delete-btn"
											onClick={() => handleClick(element.id)} // Usar ID para eliminar
											aria-label="Delete task"
											title="Delete this task"
										>
											<i className="todo-app__delete-icon fa-solid fa-xmark fs-4"></i>
										</a>
									)}
								</li>
							)) : ''} 
						</ul>

						{/* Componente para el footer*/}
                        <TodoFooter todos={todos} onClear={()=> setTodos([])}/>
                    </div>
                </div>
            </div>
        </main>   
	);
};

export default Home;
