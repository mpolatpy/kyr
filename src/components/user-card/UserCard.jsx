import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../../redux/users/usersActions';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const UserCard = ({ user, deleteUser }) => {

    if(!user) return null;

    return (
        <Box sx={{ width: '80vw', maxWidth: 600, margin: '10px' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography>
                        Email: {user.email.toLowerCase()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title="Edit User">
                        <IconButton 
                            component={Link}  
                            to={`/users/${user.id}`}
                            aria-label="edit-details"
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                        <IconButton
                            onClick={() => deleteUser(user.id)} 
                            aria-label="delete-user"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Box>
    );
}

const mapDispatchToProps = dispatch => ({
    deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(null, mapDispatchToProps)(UserCard);
