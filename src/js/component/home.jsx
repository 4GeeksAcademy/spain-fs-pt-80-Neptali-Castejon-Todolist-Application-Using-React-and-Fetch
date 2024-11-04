import React from "react";

//include images into your bundle

//create your first component
const Home = () => {
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
                        <form onSubmit="" className="todo-app__form">
							<input
								type="text"
								onChange=""
								value=""
								className="todo-app__input form-control ps-5"
								placeholder="What needs to be done?"
								aria-label="New task input"
								title="Type a new task and press Enter to add it"
							/>
						</form>

                        {/* Componente para mostrar la lista de tareas */}
                        <ul className="todo-app__list d-flex flex-column p-0 m-0 w-100">
							
						</ul>

                        {/* Componente para el footer*/}
                        <footer className="todo-app__footer d-flex align-items-center justify-content-between px-4">
							<p className="todo-app__remaining text-start" >1 items left </p>
						</footer>
                    </div>
                </div>
            </div>
        </main>   
	);
};

export default Home;
