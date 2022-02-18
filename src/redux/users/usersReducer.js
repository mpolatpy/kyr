import { UsersActionTypes } from './usersTypes';

const INITIAL_STATE = {
    isLoading: false,
    users: null,
    message: undefined
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload,
            };
        case UsersActionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };
        case UsersActionTypes.ADD_USER_START:
            return {
                ...state,
                isLoading: true,
            };
        case UsersActionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload.message,
                users: {
                    ...state.users,
                    [action.payload.user.id]: action.payload.user
                }
            };
        case UsersActionTypes.ADD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };
        case UsersActionTypes.EDIT_USER_START:
            return {
                ...state,
                isLoading: true,
            };
        case UsersActionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.payload.message,
                users: {
                    ...state.users,
                    [action.payload.user.id]: action.payload.user
                }
            };
        case UsersActionTypes.EDIT_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };
            case UsersActionTypes.DELETE_USER_START:
            return {
                ...state,
                isLoading: true,
            };
        case UsersActionTypes.DELETE_USER_SUCCESS:
            const key = action.payload.id;
            const {[key]: value, ...updatedUsers} = state.users;
            return {
                ...state,
                isLoading: false,
                message: action.payload.message,
                users: updatedUsers
            };
        case UsersActionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            };
        case UsersActionTypes.RESET_MESSAGE:
            return {
                ...state,
                message: undefined
            }
        default:
            return state;
    }
};

export default usersReducer;