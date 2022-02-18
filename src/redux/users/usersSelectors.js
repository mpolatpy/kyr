import { createSelector } from 'reselect';

const selectUserReducer = state => state.users;

export const selectUsers = createSelector(
    [selectUserReducer],
    userReducer => userReducer.users
);

export const selectIsUsersLoading = createSelector(
    [selectUserReducer],
    userReducer => userReducer.isLoading
);

export const selectMessage = createSelector(
    [selectUserReducer],
    userReducer => userReducer.message
);

export const selectUserList = createSelector(
    [selectUsers],
    users => users ? Object.values(users).sort((a, b) => {
        if(a.name < b.name)
            return -1;
        return 1;
    }) : []
);

export const selectIsUsersLoaded = createSelector(
    [selectUsers],
    users => !!users
);
