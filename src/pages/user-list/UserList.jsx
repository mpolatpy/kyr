import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserList} from '../../redux/users/usersSelectors';
import UserCard from '../../components/user-card/UserCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const UserList = ({userList}) => {
    const [users, setUsers] = useState(userList);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        let { value } = e.target;
        setSearch(value);
        let searchVal = value.toLowerCase();

        let users = userList.filter(user => 
            (user.name.toLowerCase().includes(searchVal)) || (user.email.toLowerCase().includes(searchVal))
        );
        setUsers(users);
    }

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography mt={2} variant="h4">User List</Typography>
            <Box sx={{width: '80vw', maxWidth: 600, margin: '10px'}}>
                <TextField 
                    value={search}
                    fullWidth
                    label="Search"
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                />
            </Box>
            
            {
                users && users.map((user, i) => (
                    <UserCard key={`user-${i}`} user={user} />
                ))
            }
        </Box>
    )
};

const mapStateToProps = createStructuredSelector({
    userList: selectUserList
});

export default connect(mapStateToProps)(UserList);