import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserNotFound = () => (
  <div>
      <h3>Couldn't find the user.</h3>
      <Box sx={{ marginBottom: 2 }}>
        <Button component={Link} to="/add-user" variant="outlined">Add New User</Button>
      </Box>
      <Button component={Link} to="/" variant="outlined">Go back to Home Page</Button>
  </div>
);

export default UserNotFound;