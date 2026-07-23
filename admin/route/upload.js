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



//upload
route.post('/upload-base64', async(req, res)=>{
res.json({recieved: 'true'})
try {
const {description, name, imageData, imageType} = req.body
const base64Data = imageData.split(',')[1];
const fileBuffer = Buffer.from(base64Data, 'base64');

const uniqueFileName = `${Date.now()}-${name}`;

const {data, error} = await secret.storage.from('product_assets').upload(uniqueFileName, fileBuffer, {
    contentType: imageType,
    upsert: true
})

if(error){console.log(error); return}

const { data: urlData} = secret.storage
    .from('product_assets')
    .getPublicUrl(uniqueFileName);

if(urlData){
const imageurl = urlData.publicUrl
const {error: dberr} = await secret.from('products').insert({
    name: name,
    description: description,
    url: imageurl
})    
}
else{return}

console.log(uniqueFileName)
} catch (error) {
console.log(error); return
}

})



module.exports = route