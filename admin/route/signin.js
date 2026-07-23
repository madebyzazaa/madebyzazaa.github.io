
const express = require('express')
const route = express.Router()
route.use(express.urlencoded({extended: true}))
route.use(express.json())
const bcrypt = require('bcrypt');
const {secret} = require('../../supabase-secret');
const crypto = require('crypto');
const session = require('express-session');
const cookie_parser = require('cookie-parser')
route.use(cookie_parser())


route.get('/', async(req, res)=>{
const token = req.cookies.admin_session
if(!token || !token.id || !token.token){console.log('no token'); return res.render('signin', {text: 'username'})}

const {data: server_token, error} = await secret.from('admin').select().eq('session_key', token.token).eq('id', token.id).single()

if(error || !server_token){console.log('error 1203', error);  return res.render('signin', {text: 'username'})}

const date = new Date
const expires = new Date(server_token.key_expire)

if(server_token.session_key == token.token && expires > date){
console.log('status 1001');return res.render('admin', {username: server_token.username})
}
else if(date > expires){console.log('err 1025')
res.clearCookie('admin_session')
return res.render('signin', {text: 'username'})
}
console.log('status 1005')
return res.render('signin', {text: 'username'})
})

route.post('/signin', async(req, res)=>{
const {admin, password} = req.body
try {
const {data, error} = await secret.from('admin').select().eq('username', admin).single()
if(data){
const hashedpassword = data.password
const isMatch = await bcrypt.compare(password, hashedpassword);
if(isMatch){

//create token
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$,./-=';
let result = '';
const randomBytes = crypto.randomBytes(20);   
for (let i = 0; i < 20; i++) {
result += chars[randomBytes[i] % chars.length];
}

//create token expire date
const now = new Date();
const expiration = new Date();
expiration.setDate(now.getDate() + 7);
const keyexpire = expiration.toISOString();
const token = result 

//update db
const {error: updateerr} = await secret.from('admin').update({'session_key': token, 'key_expire': keyexpire}).eq('id', data.id)
if(updateerr){return res.render('signin', {text: 'update error'})}

// save cookie
const admindata = {
    token: token,
    id: data.id
}
res.cookie('admin_session', admindata, { 
            httpOnly: true, // Hacker scripts can't read this cookie!
            secure: true,   // Only sent over HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
});
console.log('logged in');

//loadpage
return res.redirect('/admin')}
else{return res.render('signin', {text: 'invalid credential'})}
}
else{console.log(error); return res.render('signin', {text: 'invalid credential'})}

} catch (error) {
console.log(error)
return res.status(400).render('signin', {text: 'server error'})
}

})

module.exports = route