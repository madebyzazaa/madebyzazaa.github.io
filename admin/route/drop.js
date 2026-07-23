const express = require('express')
const route = express.Router()
route.use(express.json({ limit: '50mb' }));
route.use(express.urlencoded({ limit: '50mb', extended: true }));
const {secret} = require('../../supabase-secret');
const cookie_parser = require('cookie-parser');
const { base } = require('../../supabase');
route.use(cookie_parser())

//update
route.post('/drop/update', async(req, res)=>{
const update = req.body
try {
const base64Data = update.form_img.split(',')[1];
const fileBuffer = Buffer.from(base64Data, 'base64');

const uniqueFileName = `${Date.now()}-${update.img_name}`;

const {data, error} = await secret.storage.from('product_assets').upload(uniqueFileName, fileBuffer, {
    contentType: update.img_type,
    upsert: true
})

if(error){console.log(error); return res.status(400).json({status: false})}

const { data: urlData, error: url_err} = secret.storage
    .from('product_assets')
    .getPublicUrl(uniqueFileName);

if(url_err){return res.status(400).json({status: false})}

if(urlData){
const imageurl = urlData.publicUrl

const {error: err} = await secret.from('drop').update({
    product_name: update.form_name,
    details: update.form_data,
    timer: update.form_timer,
    url: imageurl
}).eq('id', 1)

if(err){return res.status(400).json({status: false})}

return res.status(200).json({status: true})
}
} catch (error) {
console.log(error); return res.status(500).json({status: false})
}
})

//send data
route.get('/drop/data', async(req, res)=>{
try {
const {data, error} = await secret.from('drop').select('*')    
if(!data || error){console.log('server error', error); return res.status(400).json({data: false})}
return res.status(200).json({data: data})
} catch (error) {
console.log('server error', error); return res.status(500).json({data: false})
}
})

//delete
route.post('/drop/delete', async(req, res)=>{

})

module.exports = route