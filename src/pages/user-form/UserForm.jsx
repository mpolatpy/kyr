import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { selectUsers } from '../../redux/users/usersSelectors';
import {addUser, editUser} from '../../redux/users/usersActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserNotFound from '../user-not-found/UserNotFound';

const UserForm = ({ users, addUser, editUser }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const isExistingUser = id && (!!users) && (!!users[id]);

    if(id && !isExistingUser){
        return (<UserNotFound />);
    }

    const initialState = isExistingUser ? users[id] : { name: '', email: '' };
    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            ...user,
            name: user.name.trim(),
            email: user.email.trim(),
        };

        if(isExistingUser){
            editUser(userData);
        } else {
            addUser(userData);
        }
        navigate('/');
    }

    return (
        <>
        <Typography mt={2} mb={2} variant="h4">
            {isExistingUser ? 'Edit User' : 'Add New User'}
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    marginTop: 2,
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{minWidth: 350, marginTop: 2, width: '40vw'}}>
                    <TextField
                        type="text"
                        fullWidth
                        required
                        error={errors && errors.name}
                        onChange={handleChange}
                        name="name"
                        value={user && user.name}
                        label="Name"
                        variant="outlined"
                    />
                </Box>
                <Box sx={{minWidth: 350, marginTop: 2, width: '40vw'}}>
                    <TextField
                        type="email"
                        fullWidth
                        required
                        error={errors && errors.email}
                        onChange={handleChange}
                        name="email"
                        value={user && user.email}
                        label="Email"
                        variant="outlined"
                    />
                </Box>
                <Box sx={{minWidth: 350, marginTop: 2, width: '40vw'}}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Box>
        </form >
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers,
});

const mapDispatchToProps = (dispatch) => ({
    addUser: (userData) => dispatch(addUser(userData)),
    editUser: (userData) => dispatch(editUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);