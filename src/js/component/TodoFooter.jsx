import React from "react";

const TodoFooter = ({todos, onClear}) => {

    return(
        <footer className="todo-app__footer d-flex align-items-center justify-content-between px-4">
            <p className="todo-app__remaining text-start">{todos.length} items left </p>
            {todos.length > 1 && (
                <button 
                    className="todo-app__clear-btn icon-link icon-link-hover p-0"
                    onClick={onClear}
                    aria-label="Clear all tasks"
                    title="Delete all tasks"
                >
                    <span className="todo-app__remaining todo-app__clear-icon">Delete All</span>
                    <i className="bi fs-5 fa-regular fa-trash-can" aria-hidden="true"></i>
                </button>
            )}
        </footer>
    )
}

export default TodoFooter;