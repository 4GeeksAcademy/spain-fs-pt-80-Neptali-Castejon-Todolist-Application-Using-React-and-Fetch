import React, { useEffect, useState } from "react";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

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

	// Manejar el envío del formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim()) {
			const newTodo = { label: task, id: Date.now() };
			setTodos([...todos, newTodo]);
			setTask('');
			createTodo(newTodo); // Crear la tarea en el servidor
		}
	};

	// Función para eliminar una tarea
	const handleClick = (id) => {
		deleteTodo(id); // Llama a la función para eliminar la tarea del servidor
	};

	// Funcion para crear usuario en el servidor
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

	// Función para crear tareas en el servidor
	const createTodo = async (todo) => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/todos/castejon', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: todo.label,
					is_done: false
				})
			});
			const createdTodo = await response.json(); // Obtener la respuesta del servidor
			setTodos([...todos, { id: createdTodo.id, label: todo.label }]); // Agregar el ID real al estado
		} catch (error) {
			console.error("Error creating todo:", error);
		}
	};
	

	// Función para obtener datos de el servidor
	const getData = async () => {
		try {
			const resp = await fetch('https://playground.4geeks.com/todo/users/castejon');
			const data = await resp.json();
			setTodos(data.todos.map(todo => ({ ...todo, id: todo.id }))); // Actualiza los todos con el ID real
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

 						{/* Componente para mostrar la lista de tareas */}
						<TodoList 
							todos={todos}
							visibleIcons={visibleIcons}
							onDelete={handleClick}
							handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
						/>
                        
						{/* Componente para el footer*/}
                        <TodoFooter todos={todos}/>
                    </div>
                </div>
            </div>
        </main>   
	);
};

export default Home;
