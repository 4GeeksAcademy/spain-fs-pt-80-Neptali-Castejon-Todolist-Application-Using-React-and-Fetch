import PropTypes from "prop-types";
import React from "react";

const TodoInput = ({ handleSubmit, handleChange, inputValue }) => {
    return (
        <form onSubmit={handleSubmit} className="todo-app__form">
            <input
                type="text"
                onChange={handleChange}
                value={inputValue}
                className="todo-app__input form-control ps-5"
                placeholder="What needs to be done?"
                aria-label="New task input"
                title="Type a new task and press Enter to add it"
            />
        </form>
    );
};

TodoInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired
};

export default TodoInput;
