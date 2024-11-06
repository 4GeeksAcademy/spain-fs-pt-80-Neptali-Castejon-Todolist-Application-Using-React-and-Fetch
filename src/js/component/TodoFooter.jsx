import PropTypes from "prop-types";
import React from "react";

const TodoFooter = ({todos}) => {

    return(
        <footer className="todo-app__footer d-flex align-items-center justify-content-between px-4">
            <p className="todo-app__remaining text-start">{todos.length} items left </p>
        </footer>
    )
}

TodoFooter.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default TodoFooter;