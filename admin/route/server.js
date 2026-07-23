const express = require('express')
const route = express.Router()
route.use(express.json({ limit: '50mb' }));
route.use(express.urlencoded({ limit: '50mb', extended: true }));
const {secret} = require('../../supabase-secret');
const cookie_parser = require('cookie-parser');
const { base } = require('../../supabase');
route.use(cookie_parser())
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cors = require('cors')
route.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

async function verify_admin(req, res, next){
try {
const token = req.cookies.admin_session
if(!token || !token.id || !token.token){return res.render('signin', {text: 'username'})}

const {data: server_token, error} = await secret.from('admin').select().eq('session_key', token.token).eq('id', token.id).single()

if(error || !server_token){return res.render('signin', {text: 'username'})}

const date = new Date
const expires = new Date(server_token.key_expire)

if(server_token.session_key == token.token && expires > date){
req.adminid =  token.id
next()
}
else if(date > expires){
res.clearCookie('admin_session')
return res.render('signin', {text: 'username'})
}

} catch (error) {
console.log(`middleware error ${error}`) 
return res.send('middleware error contact admin with code (0149)')
}

}

//products
route.get('/collection/data', async(req, res)=>{
try {
const {data, error} = await secret.from('products').select('*')
if(error){console.log(error); return res.status(400)}
if(data){return res.json({data: data})  }
else{return res.status(400)}

} catch (error) {
console.log(error); return res.status(400)   
}
})

//drop
route.get('/drop/data/landing', async(req, res)=>{
try {
const {data, error} = await secret.from('drop').select('*')
if(error){console.log(error); return res.status(400)}
if(data){return res.json({data: data})  }
else{return res.status(400)}

} catch (error) {
console.log(error); return res.status(400)   
}
})





module.exports = route