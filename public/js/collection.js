
//fetch products 
async function load() {
const response = await fetch('/admin/collection/data')
const data = await response.json()
if(!data){return}
const obj = data.data
for (let index = 0; index < obj.length; index++) {
let create = document.createElement('img')
let create1 = document.createElement('div')
let create2 = document.createElement('div')
let create3 = document.createElement('div')
let create5 = document.createElement('div')
let create6 = document.createElement('button')
let create7 = document.createElement('span')
let create8 = document.createElement('span')
let no = index
if(no<10){no='0'+index}
create.src= obj[index].url
create.className='product-image-wrapper-img'
create1.className='product-image-wrapper'
create2.className='product-card'
create3.className='product-meta-header'
create5.className='product-spec-text'
create6.className='shop-btn'
create8.className='asset-tag'
create6.innerHTML='shop now'
create5.innerHTML=obj[index].description
create7.innerHTML='SRC: DROP_0 '+no
create8.innerHTML=obj[index].name

create3.append(create7)
create3.append(create8)
create2.append(create3)
create2.append(create1)
create2.append(create5)
create2.append(create6)
create1.append(create)
document.getElementsByClassName('grid').item(0).append(create2)
create6.addEventListener('click', async()=>{
window.open('https://freshuniverseworld.myshopify.com/collections/all', '_blank')
try {
const response = await fetch('/admin/collection/traffic', {
    method: 'POST',
    headers: {
        'content-Type': 'application/json'
    },
    
    body: JSON.stringify({traffic_id: obj[index].id})
})
if(response){
const data = await response.json()
if(data.status===true){console.log('traffic sent'); return }
console.log('traffic error'); return 
} 
console.log('traffic error'); return    
} catch (error) {
console.log('traffic error', error); return 
}



})
}

}

load()