require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const users = [
    {username: 'snehal', password: 'password'},
    {username: 'tester', password: 'testing'}
]

const polls = [
    {
        question: 'Which is the best front-end framework?',
        options: ['Angular', 'React', 'Vue'], 
    },
    {
        question: 'Who is better?',
        options: ['Marvel', 'DC'], 
    },
    {
        question: 'Most romantic place?',
        options: ['Paris', 'Venice', 'Delhi', 'Tokyo'], 
    }
]

const seed = async() => {
    try{
        await db.User.remove();
        console.log('Dropped All Users');

        await db.Poll.remove();
        console.log("Dropped All Polls");

        await Promise.all(
            users.map( async user => {
                const data = await db.User.create(user);
                await data.save();
            })
        )
        console.log('Created Users', JSON.stringify(users));

        await Promise.all(
            polls.map(async poll => {
                poll.options = poll.options.map(option => ({option, votes: 0}));
                const data = await db.Poll.create(poll);
                const user = await db.User.findOne({username: 'tester'});
                data.user = user;
                user.polls.push(data._id);
                await user.save();
                await data.save();
            })
        )
        console.log('Created Polls', JSON.stringify(polls));
    }catch(err){
        console.log(err);
    }
}

seed();