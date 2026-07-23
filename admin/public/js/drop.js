const form_timer = document.getElementById('timer-input')
const form_name = document.getElementById('name-input')
const form_img = document.getElementById('image-input')
const form_data = {
    item: document.getElementById('spec-item'),
    build:document.getElementById('spec-build'),
    graphic:document.getElementById('spec-graphic'),
    fit:document.getElementById('spec-fit'),
    scarcity:document.getElementById('spec-scarcity')
}

let img_data = ''
let img_name = ''
let img_type = ''
const drop_btn = document.getElementById('drop-save-btn')

form_img.addEventListener('change', (e) => {

  const file = e.target.files[0];
  img_name = file.name
  img_type = file.type
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const fileDataUrl = event.target.result; 
      img_data = fileDataUrl
      
    };

 reader.readAsDataURL(file);
  }
});

document.getElementById('update-form').addEventListener('submit', async(e)=>{
e.preventDefault()
drop_btn.disable = true
drop_btn.innerHTML='please wait'
drop_btn.style.cursor='not-allowed'

try {

const response = await fetch('/admin/drop/update', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({form_name: form_name.value,
         form_img: img_data,
        form_timer: new Date(form_timer.value).toISOString(),
        img_name: img_name,
        img_type: img_type,
        form_data: {
            item: form_data.item.value,
            build: form_data.build.value,
            graphic: form_data.graphic.value,
            fit: form_data.fit.value,
            scarcity: form_data.scarcity.value
        } })
})
if(response){
const data = await response.json()
if(data.status==false){
drop_btn.disable=false
drop_btn.innerHTML='Save & Publish Drop'
drop_btn.style.cursor='auto'
return alert('server error could not update drop')}

document.getElementById('update-form').reset()
drop_btn.disable=false
drop_btn.innerHTML='Save & Publish Drop'
drop_btn.style.cursor='auto'
return console.log('drop status:', data)
}
} catch (error) {drop_btn.disable=false
    drop_btn.innerHTML='Save & Publish Drop'
    drop_btn.style.cursor='auto'
    console.log('server error: ',error); return
}
})


function formatCountdown(targetDateString) {
  const targetDate = new Date(targetDateString);
  const now = new Date();
  
  // Calculate the difference in milliseconds
  let difference = targetDate - now;

  if (difference <= 0) {
    return "0days: 0hrs: 0min";
  }

  // Time calculations for days, hours, and minutes
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((difference % (1000 * 60)) / 1000);

  // Output format: 2days: 2hrs: 30min
  return `${days}days: ${hours}hr: ${minutes}m: ${second}s`;
}



async function drop() {
try {
const response = await fetch('/admin/drop/data')
if(response){
const data = await response.json()
if(data.data==false){console.log('drop server error'); return}
const content = data.data[0]
document.getElementById('drop-img').src = content.url
const timer = formatCountdown(content.timer)
document.getElementById('countdown').innerHTML=timer
setInterval(() => {
const timer = formatCountdown(content.timer)
document.getElementById('countdown').innerHTML=timer   
}, 1000);

document.getElementById('drop-name').innerHTML = content.product_name
}    
} catch (error) {
console.error('drop server error', error); return
}

}
drop()