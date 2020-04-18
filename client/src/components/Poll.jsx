import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import { vote } from "../store/action";

import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    h2: {
        marginLeft: '10%'
    },
    ans: {
        marginLeft: 'calc(10% - 30px)'
    }
  }));

const color = () => {
    return ('#'+Math.random().toString(16).slice(2, 8));
}

const Poll = ({poll, vote}) => {

    const answers = poll.options && poll.options.map(option => (
        <Button variant="outlined" style={{marginLeft: '30px'}} color="primary" onClick={()=> vote( poll._id, {answer: option.option})} key={option._id}>{option.option}</Button>
    ))

    const data = {
        labels: (poll.options && poll.options.map(option => option.option)) || [],
        datasets: [{
            label: poll.question,
            backgroundColor: (poll.options && poll.options.map(option => color())) || [],
            borderColor: '#323643',
            data: (poll.options && poll.options.map(option => option.votes)) || []
        }]
    }

    const question = poll.question; 
    const classes = useStyles();
    return (
        <div>
            <h2 className={classes.h2}>{question}</h2>
            <div className={classes.ans}>
                {answers}
            </div>
            <br></br>
            <Pie data={data} />
        </div>
    )
}

export default connect( store => ({poll : store.currentPoll}), {vote})(Poll);