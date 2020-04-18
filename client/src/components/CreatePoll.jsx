import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

import { createPoll } from '../store/action'

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

class CreatePoll extends Component {

    constructor(props){
        super(props);

        this.state = {
            question: '',
            options: ['','']
        }

        this.handleChange = this.handleChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeAnswer = this.removeAnswer.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleAnswer(e, index){
        const options = [...this.state.options];
        options[index] = e.target.value;
        this.setState({options});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createPoll(this.state);
        const {error, history} = this.props;
        if(error && error.message !== null){
            console.log("error");
        }else{
            history.push('/');
        }
    }

    addAnswer(){
        this.setState({ options: [...this.state.options, ''] });
    }

    removeAnswer(){
        var opt = this.state.options;
        opt.splice(-1, 1);
        this.setState({options: opt})
    }


    render(){

        const { classes } = this.props;

        const options = this.state.options.map((option, i) => <Fragment key={i}>
                <TextField value={option} onChange={e => this.handleAnswer(e, i)} label="Option" className={classes.inputlook} />
            </Fragment>
        )

        return (
            <div>
                <h2 className={classes.h2}>Enter New Poll Details: </h2>
                <form onSubmit={this.handleSubmit} className={classes.tomid}>
                    <TextField name="question" value={this.state.question} onChange={this.handleChange} label="Question" className={classes.inputlook} />

                    {options}
                    <br></br>
                    <br></br>

                    <Button variant="contained" color="primary" type="button" onClick={this.addAnswer}>Add Option</Button>
                    <Button variant="contained" color="primary" type="button" onClick={this.removeAnswer} style={{marginLeft: '30px'}}>Remove Option</Button>
                    <Button variant="contained" color="primary" type="submit" style={{marginLeft: '30px'}}>Submit</Button>
                </form>
            </div>
        )
    }
}

export default withRouter((withStyles(styles, { withTheme: true }))(connect(()=>({}), {createPoll})(CreatePoll)));