const express = require('express')
const route = express.Router()
route.use(express.json());
route.use(express.urlencoded({extended: true }));
const {secret} = require('../../supabase-secret');
const { base } = require('../../supabase');
const {Resend} = require('resend')
const resend = new Resend('re_4r9d6vLD_L41iezfj7gnhozPUrRqJ4UpS');
const cors = require('cors')
route.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

route.get('/email/data', async(req, res)=>{
try {
const {data, error} = await secret.from('emails').select('*')
if(error){console.log(error); return res.status(400)}
if(data){return res.json({data: data})  }
else{return res.status(400)}

} catch (error) {
console.log(error); return res.status(400)   
}
})

//save email
route.post('/deploy/email', async(req, res)=>{
const email = req.body.email
try {
const {data, error} = await secret.from('emails').select().eq('email', email)

if(data && data.length > 0){console.log('email exist'); return res.json({status: 'exist'})}

if (error) {
console.log('Supabase query error:', error);
return res.status(500).json({ status: false });
}
const {error: err} = await secret.from('emails').insert({
email: email,
description: 'landing page'
})
if(err){console.log('error saving email to supabase')
return res.json({status: false})}
console.log('saved email to supabase')
return res.json({status: true})

} catch (error) {
console.log('err ', error)
return res.json({status: false})
}
})

//send email
route.post('/email/send', async(req, res)=>{
const email = req.body.email
const subject = req.body.name
const list = req.body.list

try {
const {data, error} = await resend.emails.send({
  from: 'Fresh Universe <onboarding@resend.dev>',
  to: ['madebyzazaa@gmail.com'],
  bcc: list,
  subject: subject,
  html: email
});
if(error){
console.log('resend error', error); return res.status(400).json({status: false})
}
console.log('sent'); return res.status(200).json({status: true})
} catch (error) {
console.log(error); return res.status(500).json({status: false}) 
}
res.json({status: false})
})


module.exports = route