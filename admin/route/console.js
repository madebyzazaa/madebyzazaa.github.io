require('dotenv').config()

const express = require('express')
const route = express.Router()
route.use(express.urlencoded({extended: true}))
route.use(express.json())
const bcrypt = require('bcrypt');
const {secret} = require('../../supabase-secret');
const e = require('express');
const crypto = require('crypto');

// create user
route.get('/console', (req, res)=>{
res.render('console')
})

route.post('/add/user', async(req, res)=>{
const {username, password, key} = req.body
const now = new Date();

const expiration = new Date();
expiration.setDate(now.getDate() + 7);

const keyexpire = expiration.toISOString(); 


    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$,./-=';
    let result = '';
    const randomBytes = crypto.randomBytes(20);
    
    for (let i = 0; i < 20; i++) {
        result += chars[randomBytes[i] % chars.length];
    }



async function createAdminUser(username, plainTextPassword) {
    // 10 is the "salt rounds" — the higher the number, the more secure but slower it is. 10 is the industry standard.
    const saltRounds = 10; 
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    
//write to supabase
try {
const {error} = await secret.from('admin').insert({
    username: username,
    password: hashedPassword,
    key_expire: keyexpire,
    session_key: result
})    
if(error){console.log(error); return res.status(400).send('database error')}
else{return res.send('database success')}
} catch (error) {
console.log(error)
return res.status(400).send('database error')
}


}
//send key to an env file before production !IMPORTANT
if(key===process.env.CONSOLE_KEY){
await createAdminUser(username, password);
}
else{
return res.send('failed')
}
})



module.exports = route