import * as api from "../../services/api";
import { SET_POLLS, SET_CURRENT_POLL, DEL_POLL } from "../actionTypes";
import {  addError, removeError } from "./error";

export const setPolls = polls =>({
    type: SET_POLLS,
    polls
})

export const delPoll = poll => ({
    type: DEL_POLL,
    poll
})

export const setCurrentPoll = poll =>({
    type: SET_CURRENT_POLL,
    poll
})

export const getPolls = () => {
    return async dispatch => {
        try{
            const polls = await api.call('get','polls');
            dispatch(setPolls(polls));
            dispatch(removeError());
        }catch(err){
            const e = err.response.data;
            const t = e.split("\n")[0];
            const error = t.substring(4, t.length-5);
            dispatch(addError(error));
        }
    }
}

export const getUserPolls = () => {
    return async dispatch => {
        try{
            const polls = await api.call('get','polls/user');
            dispatch(setPolls(polls));
            dispatch(removeError());
        }catch(err){
            const e = err.response.data;
            const t = e.split("\n")[0];
            const error = t.substring(4, t.length-5);
            dispatch(addError(error));
        }
    }
}

export const createPoll = (data) => {
    return async dispatch => {
        try{
            const poll = await api.call('post','polls', data);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
        }catch(err){
            const e = err.response.data;
            const t = e.split("\n")[0];
            const error = t.substring(4, t.length-5);
            dispatch(addError(error));
        }
    }
}

export const getCurrentPoll = (id) => {
    return async dispatch => {
        try{
            const poll = await api.call('get',`polls/${id}`);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
        }catch(err){
            const e = err.response.data;
            const t = e.split("\n")[0];
            const error = t.substring(4, t.length-5);
            dispatch(addError(error));
        }
    }
}

export const deleteCurrentPoll = (id) => {
    return async dispatch => {
        try{
            const dpoll = await api.call('delete',`polls/${id}`);
            const poll = await api.call('get','polls/user');
            dispatch(delPoll(dpoll))
            dispatch(setPolls(poll));
            dispatch(removeError());
        }catch(err){
            console.log(err)
            const e = err.response.data;
            const t = e.split("\n")[0];
            const error = t.substring(4, t.length-5);
            dispatch(addError(error));
        }
    }
}

export const vote = (path, data) => {
    return async dispatch => {
        try{
            const poll = await api.call('post', `polls/${path}`, data);
            dispatch(setCurrentPoll(poll));
            dispatch(removeError());
        }catch(err){
            const e = err.response.data;
            const t = e.split("\n")[0];
            const error = t.substring(4, t.length-5);
            dispatch(addError(error));
        }
    }
}