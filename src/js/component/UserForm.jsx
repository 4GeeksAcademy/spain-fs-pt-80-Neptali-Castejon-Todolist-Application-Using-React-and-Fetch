import PropTypes from "prop-types";
import React from "react";

const UserForm = ({handleSubmitUser, userName, handleUserChange, userExists, onDelete }) =>{
    return(
        <form onSubmit={handleSubmitUser} className="todo-app__user-form mb-4">
            <input
                type="text"
                className="todo-user__input form-control shadow text-center- text-start ps-5"
                placeholder="What’s your name?"
                title="Type your username"
                value={userName}
                onChange={handleUserChange}
                required
            />
            {!userExists ? '' :(
                <a 
                    className="todo-app__delete-btn ml-custom d-flex align-items-center"
                    aria-label="Delete task"
                    title="Delete this user"
                    onClick={onDelete}
                >
                    <p className="todo-app__remaining todo-app__clear-icon">User</p>
                    <i className="todo-app__delete-icon fa-solid fa-xmark fs-4"></i>
                </a>
            )}
        </form>
    )
}

UserForm.propTypes = {
    handleSubmitUser: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    handleUserChange: PropTypes.func.isRequired,
    userExists: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserForm;