import React from "react";

const TodoHeader = ({title}) => {
    return(
        <header>
            <h1 className="todo-app__title">{title}</h1>
        </header>
    )
}

export default TodoHeader;