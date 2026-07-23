async function load() {
const response = await fetch('/admin/product/data')
const data = await response.json()
if(!data){return}
const obj = data.data
for (let index = 0; index < obj.length; index++) {
let create1 = document.createElement('tr')

let create2 = document.createElement('td')
let create3 = document.createElement('td')
let create4 = document.createElement('td')
let create5 = document.createElement('td')
let create6 = document.createElement('td')

let img = document.createElement('img')
let description = document.createElement('p')
let name = document.createElement('p')
let traffic = document.createElement('p')
let delete_btn = document.createElement('button')

img.className='product-img'
description.className='product-des'
traffic.className='product-traffic'
name.className='product-name'
delete_btn.className='remove'
create1.className='product-info'

img.src = obj[index].url
name.innerHTML = obj[index].name
delete_btn.innerHTML = 'remove'
description.innerHTML = obj[index].description
traffic.innerHTML = obj[index].traffic+' clicks'

create2.append(img)
create3.append(description)
create4.append(name)
create5.append(traffic)
create6.append(delete_btn)

delete_btn.addEventListener('click', async()=>{
try {
const result = await fetch('/admin/remove', {
    method: 'POST',
    headers: {
        'content-Type': 'application/json'
    },
body: JSON.stringify({ product_id: obj[index].id })
})
if(result.ok){
const data = await result.json()    
console.log('product request sent', data)
if(data.status===true){
create1.remove()
}
else{window.alert("server error: couldn't delete")}
}
else{window.alert("client error: couldn't delete")}    
} catch (error) {
console.log(error); return
}

})

create1.append(create2, create3, create4, create5, create6)
document.getElementById('product-table').append(create1)
}

}
load()