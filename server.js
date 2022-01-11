const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); // For hashing

require('dotenv').config()

app.use(express.json());

const users = [];

app.get('/users', (req, res)=>{
    res.json(users);
});

app.post('/users', async (req, res)=>{
    try{
        const hashedpassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password:hashedpassword }
        users.push(user);
        res.status(201).send('Push okay');
    }
    catch{
        res.status(500).console.log('An error has occured');
    }
    
});

app.post('/users/login', async (req,res)=>{
    const user = users.find(user=> user.name === req.body.name)
    if (user == null){
        return res.status(400).send('Cannot find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('success');
        }else{
            res.send('Not allowed... Check password again');
        }
    }
    catch{
        res.status(500).send()
    }
})

app.listen(3000);