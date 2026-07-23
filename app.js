require('dotenv').config()

const express = require('express')
const app = new express()
const path = require('path')
const { env } = require('process')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './admin/views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', express.static(path.join(__dirname, 'admin/public')));


const sigin = require('./admin/route/signin')
const email = require('./admin/route/email')
const consol = require('./admin/route/console')
const server = require('./admin/route/server')
const product = require('./admin/route/product')
const upload = require('./admin/route/upload')
const drop = require('./admin/route/drop')
app.use('/admin', server)
app.use('/admin', sigin)
app.use('/admin', consol)
app.use('/admin', email)
app.use('/admin', upload)
app.use('/admin', product)
app.use('/admin', drop)

app.get('/home', (req, res)=>{
res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/', (req, res)=>{
res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/collection', (req, res)=>{
res.sendFile(path.join(__dirname, 'public', 'collection.html'));
})
app.get('/drop', (req, res)=>{
res.sendFile(path.join(__dirname, 'public', 'drops.html'));
})
app.get('/perks', (req, res)=>{
res.sendFile(path.join(__dirname, 'public', 'perks.html'));
})

const port = process.env.PORT || 3000
app.listen(port)
console.log('listening')