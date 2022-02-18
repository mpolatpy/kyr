import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMessage } from '../../redux/users/usersSelectors';
import { resetMessage } from '../../redux/users/usersActions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = ({message, resetMessage}) => {

    return (
        <>
            <Snackbar 
                open={!!message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000} 
                onClose={resetMessage}
            >
                <Alert 
                    onClose={resetMessage} 
                    severity={message && message.severity} 
                    sx={{ width: '100%' }}
                >
                    {message && message.content}
                </Alert>
            </Snackbar>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    message: selectMessage
});

const mapDispatchToProps = (dispatch) => ({
    resetMessage: () => dispatch(resetMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert);