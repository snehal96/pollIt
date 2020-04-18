import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    err: {
        width: '90%',
        marginLeft: '7.5%',
        textAlign: 'center'
    },
    root: {
        width: '80vw',
        '& > * + *': {
          marginTop: theme.spacing(0),
        },
        marginLeft: '7.5%',
      }
  })); 

const ErrorMessage = ({error}) => {
    const classes = useStyles();

    return <div style={{marginTop: '1vh'}}>
                {error.message && <Alert severity="error" className={classes.root}>
                    <AlertTitle>Error</AlertTitle>
                        {error.message}
                    </Alert>
                }
    </div>
};

export default connect(store => ({error: store.error}))(ErrorMessage);