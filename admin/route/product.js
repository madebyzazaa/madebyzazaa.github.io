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

//table
route.get('/product/data', async(req, res)=>{
try {
const {data, error} = await secret.from('products').select('*')
if(error){console.log(error); return res.status(400)}
if(data){return res.json({data: data})  }
else{return res.status(400)}

} catch (error) {
console.log(error); return res.status(400)   
}
})


//traffic
route.post('/collection/traffic', async(req, res)=>{
const traffic_id = req.body.traffic_id
try {
const {data, error} = await secret.from('products').select().eq('id', traffic_id).single()
if(!data || error){return res.status(500).json({status: false})}
let traffic = data.traffic
traffic++
const {error: err} = await secret.from('products').update({traffic: traffic}).eq('id', traffic_id)
if(err){return res.status(500).json({status: false})}
return res.json({status: true})
} catch (error) {
console.log('server error',  error)
return res.json({status: false})
}
})

//remove
route.post('/remove', async(req, res)=>{
console.log(req.body)
try {
const {error} = await secret.from('products').delete().eq('id', req.body.product_id)
if(error){console.log('server error, could not delete row'); return res.status(500).json({status: 'server error could not delete row'})}
console.log('successfully deleted row')
return res.json({status: true})
} catch (error) {
console.log('err: ', error); return res.status(500).json({status: 'internal server error at CATCH'})
}

})


module.exports = route