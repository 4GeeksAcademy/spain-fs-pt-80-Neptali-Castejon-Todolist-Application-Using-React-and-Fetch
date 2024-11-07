import React, { useEffect, useState } from "react";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import UserForm from "./UserForm";

const Home = () => {
	// Estado para almacenar el valor de la tarea actual
	const [task, setTask] = useState('');
	const [todos, setTodos] = useState([]);
	const [visibleIcons, setVisibleIcons] = useState({});
	const [userName, setUserName] = useState('');
	const [userExists, setUserExists] = useState(false);

	const handleUserChange = (e) => setUserName(e.target.value);
	const handleChange = (e) => setTask(e.target.value);

	// Manejar el envío del formulario de usuario
	const handleSubmitUser = async (e) => {
		e.preventDefault();
	
		if (userName.toLowerCase().trim()) {
			const userAlreadyExists = await checkUserExists();
	
			if (userAlreadyExists) {
				setUserExists(true);
				getData();
			} else {
				alert("Usuario no existe. Creando nuevo usuario...");
				await crearUser();
				setUserExists(true);
				getData();
			}
		}
	};
	  
	// Manejar el envío del formulario de task
	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim()) {
			const newTodo = { label: task, id: Date.now() };
			//setTodos([...todos, newTodo]);
			setTask('');
			createTodo(newTodo); // Crear la tarea en el servidor
		}
	};

	// Función para eliminar una tarea
	const handleClick = (id) => {
		deleteTodo(id); // Llama a la función para eliminar la tarea del servidor
	};

	const checkUserExists = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return response.ok;
		} catch (error) {
			console.error("Error checking user:", error);
			return false;
		}
	};
	
	const crearUser = async () => {
		try {
			await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});
			console.log("User created successfully");
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	// Función para crear tareas en el servidor
	const createTodo = async (todo) => {
		try {
		   const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
			  	method: 'POST',
			  	headers: { 
					'Content-Type': 'application/json' 
				},
			  	body: JSON.stringify({ 
					label: todo.label, is_done: false 
				})
		   });
		   const createdTodo = await response.json();
		   setTodos(prevTodos => [...prevTodos, { id: createdTodo.id, label: todo.label }]); // solo actualizas el estado una vez
		} catch (error) {
		   console.error("Error creating todo:", error);
		}
	};
	 
	// Función para obtener datos de el servidor
	const getData = async () => {
		try {
			const resp = await fetch(`https://playground.4geeks.com/todo/users/${userName}`);
			const data = await resp.json();
			
			if (data && Array.isArray(data.todos)) {
				setTodos(data.todos.map(todo => ({ ...todo, id: todo.id }))); // Actualiza los todos con el ID real
			} else {
				console.error("No todos found or invalid response");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	
	// Función para eliminar tareas del servidor
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
	
	// Funciones para mostrar y ocultar el icono de borrado
	const handleMouseEnter = (id) => {
        setVisibleIcons((prev) => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id) => {
        setVisibleIcons((prev) => ({ ...prev, [id]: false }));
    };
	
	useEffect(() => {
		// Si el nombre de usuario cambia, reinicia el estado
		if (userName.trim()) {
			setUserExists(false);
			setTodos([]); // Borra la lista de tareas
		}
	}, [userName]); // Ejecuta cada vez que cambia el nombre de usuario
	
	return (
		<main className="container"> 
			<div className="todo-app d-flex justify-content-center align-items-center vh-100">
				<div className="todo-app__container text-center">

					{/* Título principal de la aplicación */}
					<TodoHeader title="todoList" />
					
					{/* Formulario para capturar y enviar el nombre del usuario */}
					<UserForm 
						userName={userName} 
						handleUserChange={handleUserChange} 
						handleSubmitUser={handleSubmitUser} 
					/>

					{/* Mensaje de bienvenida cuando el usuario ya ha ingresado su nombre */}
					{!userExists ? '' : (<h3 className="todo-app__subtitle mb-4">Welcome! {userName}, Here is your to-do list!</h3>)}

					<div className="todo-app__content shadow p-0">
						{/* Componentes principales: Sólo se muestran si el usuario existe */}
						{!userExists ? '' : (
							<>
								{/* Input para agregar nuevas tareas */}
								<TodoInput 
									inputValue={task}
									handleChange={handleChange}
									handleSubmit={handleSubmit}
								/>

								{/* Lista de tareas: Muestra las tareas actuales y gestiona eventos de mouse */}
								<TodoList 
									todos={todos}
									visibleIcons={visibleIcons}
									onDelete={handleClick}
									handleMouseEnter={handleMouseEnter}
									handleMouseLeave={handleMouseLeave}
								/>

								{/* Footer: Resumen de tareas y otras acciones */}
								<TodoFooter todos={todos} />
							</>
						)}
					</div>
				</div>
			</div>
		</main>

	);
};

export default Home;
