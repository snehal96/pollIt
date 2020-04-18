import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authUser, logout, removeError } from '../store/action';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    inputlook: {
      width: '80%'
    },
    tomid: {
        textAlign: "center"
    },
    h2: {
        marginLeft: '10%'
    }
  });

export class Auth extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(removeError());
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e){
        const {username, password} = this.state;
        const { authType } = this.props;
        e.preventDefault();
        this.props.dispatch(authUser(authType || 'login', {username, password}));
    }

    render() {
        const { username, password } = this.state
        const { classes, authType } = this.props;

        let head = ''
        if(authType === 'register') {head = "Enter details to Register";}
        else {head = "Enter details to Login";}

        return <div>
            <h2 className={classes.h2}>{head}</h2>
            <form onSubmit={this.handleSubmit} className={classes.tomid}>
                <TextField name="username" value={username} onChange={this.handleChange} label="Username" className={classes.inputlook} />
                <TextField name="password" type="password" value={password} onChange={this.handleChange} label="Password" className={classes.inputlook} />
                <br></br>
                <br></br>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </div>
    }
}

  
  export default (withStyles(styles, { withTheme: true }))(connect(() =>({authUser, logout}))(Auth));