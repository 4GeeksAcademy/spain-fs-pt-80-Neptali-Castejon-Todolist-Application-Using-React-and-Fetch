import React, { useState } from "react";

const Home = () => {

	// Estado para almacenar el valor de la tarea actual
	const [task, setTask] = useState('');
	const [todos, setTodos] = useState([]);
	const [visibleIcons, setVisibleIcons] = useState({});
	
	// Manejar el cambio de valor en el campo de entrada
    const handleChange = (e) => setTask(e.target.value);

	// Manejar el envío del formulario para agregar una nueva tarea
	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim()) {
			setTodos([...todos, task]);
			setTask(''); // Limpia el campo de entrada
		}
	};

	// Función para eliminar una tarea
    const handleClick = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

	const handleMouseEnter= (index) => setVisibleIcons((prev) => ({ ...prev, [index]: true }));
	const handleMouseLeave= (index) => setVisibleIcons((prev) => ({ ...prev, [index]: false }));

	return (
		<main className="container"> 
            <div className="todo-app d-flex justify-content-center align-items-center vh-100">
                <div className="todo-app__container text-center">

                    {/* Componente para el título */}
					<header>
						<h1 className="todo-app__title">todosList</h1>
					</header>

                    <div className="todo-app__content shadow p-0">

                        {/* Componente para ingresar nuevas tareas */}
                        <form onSubmit={handleSubmit} className="todo-app__form">
							<input
								type="text"
								onChange={handleChange}
								value={task} 
								className="todo-app__input form-control ps-5"
								placeholder="What needs to be done?"
								aria-label="New task input"
								title="Type a new task and press Enter to add it"
							/>
						</form>

                        {/* Componente para mostrar la lista de tareas */}
                        <ul className="todo-app__list d-flex flex-column p-0 m-0 w-100">
							{todos.length > 0 ?
								todos.map((element, index) => (
								<li
									key={index}
									className="todo-app__item d-flex align-items-center justify-content-between ps-5 pe-4"
									title="Task item"
									onMouseEnter={() => handleMouseEnter(index)}
                    				onMouseLeave={() => handleMouseLeave(index)}
								>
									{element}
									{visibleIcons[index] && (
										<a 
											className="todo-app__delete-btn"
											onClick={() => handleClick(index)}
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
                        <footer className="todo-app__footer d-flex align-items-center justify-content-between px-4">
							<p className="todo-app__remaining text-start" >{todos.length} items left </p>
						</footer>
                    </div>
                </div>
            </div>
        </main>   
	);
};

export default Home;
