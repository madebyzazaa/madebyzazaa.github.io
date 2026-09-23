//streak
//name storage
//stats(3)
//calendar(31/30, save&display: object)

document.getElementsByClassName('backdrop').item(0).addEventListener('click', ()=>{
// Vibrates the phone for 200 milliseconds
  if (navigator.vibrate) {
    navigator.vibrate(100);
    console.log('vibrated')
  } else {
    console.log("Vibration API is not supported on this device/browser.");
  }

})

let data = JSON.parse(localStorage.getItem('storeddata'))
console.log(data)
if(!data){data={
  streak: {
    date: '04/15/2025',
    slength: 0
  },
  max_streak: 0,
  saved_month: '04',
  saved_year: '2025',
  last_upload: null
}}
let monthdata = JSON.parse(localStorage.getItem('monthdata'))
if(!monthdata){monthdata={}}

let AttachedDate = 0
const input = document.getElementById('input')
const form = document.getElementById('form')
const username = localStorage.getItem('username')
const date = new Date()
const monthno = date.getMonth()
const month = date.toLocaleString('default', {month: 'short'})
const day = date.getDate()
const daysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 

document.getElementById('add').addEventListener("click", (e)=>{document.getElementById('form').style.display='flex'; 
e.stopPropagation(); AttachedDate=day
input.placeholder=`for ${AttachedDate}`})
document.addEventListener("click", ()=>{document.getElementById('form').style.display='none'})
document.getElementById('form').addEventListener("click", (e)=>{e.stopPropagation()})

console.log(`${month} ${monthno} ${day} ${daysInCurrentMonth} ${date}`)
console.log(data)

document.getElementById('username').addEventListener('click', ()=>{
const newname = window.prompt('new username')
localStorage.setItem('username', newname)
document.getElementById('username').innerHTML=newname
})

//load data
function load(){
if(username){document.getElementById('username').innerHTML=username}
document.getElementById('month').innerHTML=month.slice(0, 3)
document.getElementById('streak-txt').innerHTML=`streak: ${data.streak.slength}days 🔥`
const streak = data.streak
const streakdate = new Date(streak.date)
const differenceInMs = date-streakdate
const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
if(differenceInDays>1){document.getElementById('streak-txt').innerHTML=`streak: 0days 🔥`}
document.getElementById('streak-value').innerHTML=`${data.max_streak} days`
const value = Object.values(monthdata)
const TotalBasket =  value.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0)
const AvgBasket = Math.round(TotalBasket/value.length)
document.getElementById('tbtm-value').innerHTML=`${TotalBasket}`
if(!Number.isNaN(AvgBasket)){document.getElementById('da-value').innerHTML=`${AvgBasket}`}

document.getElementById('record-value').innerHTML=`${value.length} - ${day} days`
input.placeholder=`for ${day}`
}
load()

for (let index = 0; index < daysInCurrentMonth; index++) {
const box = document.createElement('div')
const tag = document.createElement('div')
box.className = 'box'
tag.className = 'tag'
tag.innerHTML='000'
box.append(tag)
box.addEventListener('click', ()=>{
tag.style.display='block'
setTimeout(() => {
tag.style.display='none'
}, 1000);
})

box.addEventListener('dblclick', ()=>{
if(index<=day && index>=day-5){
form.style.display='flex'; AttachedDate=index; 
input.placeholder=`for ${AttachedDate+1}` }
})
document.getElementsByClassName('grid').item(0).append(box)
}

//contribution tracking
function track(){
const entry = Object.entries(monthdata)

entry.forEach(([key, value])=>{
let color = value*0.007
if(color<0.7){color=0.7}
else if(color>1){color=1}
document.getElementsByClassName('box').item(key).style.backgroundColor=`rgb(240, 136, 17, ${color})`
document.getElementsByClassName('tag').item(key).innerHTML=value
})  

const value = Object.values(monthdata)
const TotalBasket =  value.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0)
const AvgBasket = Math.round(TotalBasket/value.length)
document.getElementById('tbtm-value').innerHTML=`${TotalBasket}`
if(!Number.isNaN(AvgBasket)){document.getElementById('da-value').innerHTML=`${AvgBasket}`}
document.getElementById('record-value').innerHTML=`${value.length} - ${day} days`
}
track()

//create new record
function CreateRecord(){
if(input.value && Number(input.value)){
monthdata[AttachedDate]=input.value
console.log(monthdata)
form.style.display='none'
localStorage.setItem('monthdata', JSON.stringify(monthdata))
track()

if(AttachedDate+1==day){
const streak = data.streak
const streakdate = new Date(streak.date)
const differenceInMs = date-streakdate
const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
console.log(differenceInDays)
if(differenceInDays>1){ streak.slength=1}
else if(differenceInDays==1){streak.slength++; 
if(streak.slength > data.max_streak){
data.max_streak=streak.slength
}}
streak.date = date.toLocaleString('en-US')
localStorage.setItem('storeddata', JSON.stringify(data))
console.log(streak, differenceInDays)
document.getElementById('streak-txt').innerHTML=`streak: ${data.streak.slength}days 🔥`
document.getElementById('streak-value').innerHTML=`${data.max_streak} days`
}
}
}
document.getElementById('save').addEventListener('click', CreateRecord) 

function reset(){
// 1. Get the current date info
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth(); // 0 to 11

// 2. Fetch the last visited month/year from localStorage (or default to current)
const lastSavedYear = data.saved_year
const lastSavedMonth = data.saved_month
// 3. CALCULATE THE DIFFERENCE IN MONTHS
const monthDifference = (currentYear - lastSavedYear) * 12 + (currentMonth - lastSavedMonth);

// 4. TRIGGER THE RESET LOGIC
if (monthDifference >= 1) {
  console.log(`A new month has reached! Month difference: ${monthDifference}. Resetting data...`);

monthdata={}
// 5. CRUCIAL: Save the current month and year so it doesn't reset on the next page refresh!
data.saved_month=currentMonth
data.saved_year=currentYear
localStorage.setItem('storeddata', JSON.stringify(data));
localStorage.setItem('monthdata', JSON.stringify(monthdata));
location.reload()}

}
reset()

document.getElementById('sync').addEventListener('click', ()=>{
if(data.last_upload){
let entry = Object.entries(monthdata)
const taskarray = []
const point = entry.indexOf(data.last_upload)
entry = entry.slice(point, )
for (let index = 0; index < entry.length; index++) {

}
}
})

