import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPolls, getUserPolls, getCurrentPoll, deleteCurrentPoll } from '../store/action';

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    gridlook: {
      margin: '20px'
    }
  });

class Polls extends Component{

    constructor(props){
        super(props);

        this.state = {
            my: false
        }

        this.handleSelect = this.handleSelect.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        const { getPolls } = this.props;
        getPolls();
    }

    handleSelect(id){
        const { history } = this.props;
        history.push(`/poll/${id}`);
    }

    handleDelete(id){
        this.props.deleteCurrentPoll(id);
        this.props.getUserPolls();
        this.setState({my: true})
    }

    render(){
        const { auth, getPolls, getUserPolls, polls } = this.props;
        const { classes, state } = this.props;
        
        

        return (
            <Fragment>
                {auth.isAuthenticated && (
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary" onClick={() => {this.setState({my: false});getPolls();}}>All Polls</Button >
                        <Button variant="contained" color="primary" onClick={() => {getUserPolls();this.setState({my: true});}} style={{marginLeft: '30px'}}>My Polls</Button >
                    </div>
                )}
                <Grid container justify="center" alignItems="stretch" direction="row" style={{marginTop: 'calc(0vh + 15px)', height: 'calc(100vh - 175px)', overflowY:'auto'}}>
                    {polls.map((poll, index) => (
                        <Grid item key={poll.question} xs={12} sm={5} className={classes.gridlook} >
                        <Card>
                            <CardContent>
                                <Typography variant="h5">
                                    Poll {index+1}:
                                </Typography>
                                <Typography component="h6">{poll.question}</Typography>
                            </CardContent>
                            <CardActions>
                            { auth.isAuthenticated && 
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            }
                            <Button size="small" color="primary" onClick={() => this.handleSelect(poll._id)} key={poll._id}>
                                View Poll
                            </Button>
                            { this.state.my && 
                                <Button size="small" color="primary" onClick={() => this.handleDelete(poll._id)}>
                                    Delete
                                </Button>
                            }
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
            </Fragment>
        )
    }
}

export default (withStyles(styles, { withTheme: true }))
(connect(store =>({
    auth: store.auth,
    polls: store.polls
}), {getPolls, getUserPolls, getCurrentPoll, deleteCurrentPoll})(Polls));