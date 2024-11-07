import PropTypes from "prop-types";
import React from "react";

const UserForm = ({handleSubmitUser, userName, handleUserChange }) =>{
    return(
        <form onSubmit={handleSubmitUser} className="todo-app__user-form mb-4 mb-4">
            <input
                type="text"
                className="todo-user__input form-control shadow text-center"
                placeholder={"What’s your name?"}
                title="Type your username"
                value={userName}
                onChange={handleUserChange}
                required
            />
        </form>
    )
}

UserForm.propTypes = {
    handleSubmitUser: PropTypes.func.isRequired,
    handleUserChange: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired
};

export default UserForm;