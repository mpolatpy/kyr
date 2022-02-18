import { UsersActionTypes } from "./usersTypes";
import agent from "../../api/agent";

export const fetchUsersStart = () => ({
    type: UsersActionTypes.FETCH_USERS_START
});

export const fetchUsersSuccess = (users) => ({
    type: UsersActionTypes.FETCH_USERS_SUCCESS,
    payload: users
});

export const fetchUsersFailure = (errorMessage) => ({
    type: UsersActionTypes.FETCH_USERS_FAILURE,
    payload: errorMessage
});

export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUsersStart());

        try{
            const userList = await agent.Users.list();
            const users = userList.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});
            dispatch(fetchUsersSuccess(users));
        } catch (e) {
            console.log(e.message);
            dispatch(fetchUsersFailure({content: "A problem has occurred.", severity: 'error'}));
        }
    }
}

export const addUserStart = () => ({
    type: UsersActionTypes.ADD_USER_START
});

export const addUserSuccess = (user, message) => ({
    type: UsersActionTypes.ADD_USER_SUCCESS,
    payload: {user, message}
});

export const addUserFailure = (message) => ({
    type: UsersActionTypes.ADD_USER_FAILURE,
    payload: message
});

export const addUser = (userData) => {
    return async (dispatch) => {
        dispatch(addUserStart());

        try{
            const user = await agent.Users.create(userData);
            dispatch(addUserSuccess(
                user, {content: 'Successfully added user!', severity: 'success'}
            ));
        } catch (e) {
            console.log(e.message);
            dispatch(addUserFailure({content: 'Problem creating the user', severity: 'error'}))
        }
    }
}

export const editUserStart = () => ({
    type: UsersActionTypes.EDIT_USER_START
});

export const editUserSuccess = (user, message) => ({
    type: UsersActionTypes.EDIT_USER_SUCCESS,
    payload: {user, message}
});

export const editUserFailure = (errorMessage) => ({
    type: UsersActionTypes.EDIT_USER_FAILURE,
    payload: errorMessage
});

export const editUser = (user) => {
    return async (dispatch) => {
        dispatch(editUserStart());

        try{
            const {id, ...userData} = user;
            await agent.Users.update(id, userData);
            dispatch(editUserSuccess(
                user, {content: 'Successfully updated user!', severity: 'success'}
            ));
        } catch (e) {
            console.log(e.message);
            dispatch(editUserFailure({content: 'Problem updating the user', severity: 'error'}))
        }
    }
}

export const deleteUserStart = () => ({
    type: UsersActionTypes.DELETE_USER_START
});

export const deleteUserSuccess = (id, message) => ({
    type: UsersActionTypes.DELETE_USER_SUCCESS,
    payload: {id, message}
});

export const deleteUserFailure = (errorMessage) => ({
    type: UsersActionTypes.DELETE_USER_FAILURE,
    payload: errorMessage
});

export const deleteUser = (id) => {
    return async (dispatch) => {
        dispatch(deleteUserStart());

        try {
            await agent.Users.delete(id);
            dispatch(deleteUserSuccess(id, {content: 'Successfully deleted the user', severity: 'success'}))
        } catch (e) {
            console.log(e.message);
            dispatch(deleteUserFailure({content: 'Problem deleting the user', severity: 'error'}))
        }
    }
}

export const resetMessage = () => ({
    type: UsersActionTypes.RESET_MESSAGE
});