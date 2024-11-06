import React from "react";

const TodoList = ({todos, visibleIcons, onDelete, handleMouseEnter, handleMouseLeave}) => {
    return(
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
                            onClick={() => onDelete(element.id)} // Usar ID para eliminar
                            aria-label="Delete task"
                            title="Delete this task"
                        >
                            <i className="todo-app__delete-icon fa-solid fa-xmark fs-4"></i>
                        </a>
                    )}
                </li>
            )) : ''} 
        </ul>
    )
}

export default TodoList;