let email_array = []
let recent_array = []
let drop_array = []
let send_option = 'all'
let send_array = []

//email
const now = new Date();
const check = new Date();
check.setDate(now.getDate() - 3);

async function loademail() {
const response = await fetch('/admin/email/data')
const data = await response.json()
if(!data){return}
const obj = data.data

const last_date = new Date(obj[obj.length-1].created_at).toUTCString()
document.getElementsByClassName('report-email').item(0).innerHTML='total emails: '+obj.length
document.getElementsByClassName('report-date').item(0).innerHTML='updated: '+ last_date

for (let index = 0; index < obj.length; index++) {
const create1 = document.createElement('tr')
const create2 = document.createElement('td')
const create3 = document.createElement('td')
const create4 = document.createElement('td')
let email = document.createElement('p')
let description = document.createElement('p')
let date = document.createElement('p')

create2.append(email)
create3.append(description)
create4.append(date)

date.className='report-date'
email.className= 'report-email'
description.className= 'report-des'
const simple_date = new Date(obj[index].created_at).toUTCString()
date.innerHTML=simple_date
email.innerHTML=obj[index].email
description.innerHTML=obj[index].description

create1.append(create2, create3, create4)
document.getElementById('email-table').append(create1)

email_array.push(obj[index].email)
//recent emails
const email_date = new Date(obj[index].created_at)
if(email_date > check){
recent_array.push(obj[index].email)
}

create1.addEventListener('click', ()=>{
document.getElementById('custom-target').value=obj[index].email
send_option='custom'
document.getElementById('active-option').innerHTML=obj[index].email})
}

document.getElementsByClassName('report-des').item(0).innerHTML=`new: ${recent_array.length}`
}

loademail()


const email = document.getElementById('emailcontent')
const send_email_btn = document.getElementById('send-email-btn')


const subject = document.getElementById('subject')
document.getElementById('send-email').addEventListener('submit', async(e)=>{
e.preventDefault()
const permit = confirm('are you sure you want to complete this request')
if(permit==false){return} send_email_btn.disable=true;
send_email_btn.style.cursor = 'not-allowed'
send_email_btn.innerHTML='wait'
let list = []
if(send_option=='all' || send_option=='drop'){list=email_array}
else if(send_option=='recent'){list=recent_array}
else if(send_option=='custom'){list.push(document.getElementById('custom-target').value)}
if(subject.value==''){alert('provide the email title'); send_email_btn.disable=false; send_email_btn.style.cursor = 'auto'; return send_email_btn.innerHTML='send'}
try {
const result = await fetch('/admin/email/send', {
    method: 'POST',
    headers: {
        'content-Type': 'application/json'
    },
body: JSON.stringify({ email: email.value, name:  subject.value, list: list})
})
if(result){
const data = await result.json()
if(data.status===true){
send_email_btn.innerHTML='done ✓';  send_email_btn.disable=false; send_email_btn.style.cursor = 'auto'; 
setTimeout(() => {
send_email_btn.innerHTML='send';  send_email_btn.disable=false; send_email_btn.style.cursor = 'auto'; 
}, 2000);
console.log('email sent'); return }
alert('server error could not complete request'); send_email_btn.disable=false; send_email_btn.style.cursor = 'auto';  return send_email_btn.innerHTML='send'
} 
alert('server error could not complete request'); send_email_btn.disable=false; send_email_btn.style.cursor = 'auto';  return send_email_btn.innerHTML='send'
} catch (error) {
alert('server error could not complete request'); send_email_btn.disable=false; send_email_btn.style.cursor = 'auto';  return send_email_btn.innerHTML='send'
}
})


document.getElementById('btn-all-email').addEventListener('click', ()=>{
send_option='all'
document.getElementById('active-option').innerHTML=send_option
})
document.getElementById('btn-recent-email').addEventListener('click', ()=>{
send_option='recent'
document.getElementById('active-option').innerHTML=send_option
})
document.getElementById('btn-new-drop').addEventListener('click', ()=>{
send_option='drop'
document.getElementById('active-option').innerHTML=send_option
})
document.getElementById('custom-target').addEventListener('input', ()=>{
send_option='custom'
document.getElementById('active-option').innerHTML=document.getElementById('custom-target').value
})
