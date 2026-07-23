function formatCountdown(targetDateString) {
  const targetDate = new Date(targetDateString);
  const now = new Date();
  
  // Calculate the difference in milliseconds
  let difference = targetDate - now;

  if (difference <= 0) {
    return "0days: 0hrs: 0min";
  }

  // Time calculations for days, hours, and minutes
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let second = Math.floor((difference % (1000 * 60)) / 1000);
  if(days<10){days='0'+days}
  if(hours<10){hours='0'+hours}
  if(minutes<10){minutes='0'+minutes}
  if(second<10){second='0'+second}
  // Output format: 2days: 2hrs: 30min
  return `${days}:${hours}:${minutes}:${second}`;
}

async function load() {
const response = await fetch('/admin/drop/data/landing')
const data = await response.json()
if(!data){return}
const res = data.data[0]
console.log(res)
document.getElementById('item').innerHTML=res.details.item
document.getElementById('graphic').innerHTML=res.details.graphic
document.getElementById('scarcity').innerHTML=res.details.scarcity
document.getElementById('build').innerHTML=res.details.build
document.getElementById('fit').innerHTML=res.details.fit

const timer = formatCountdown(res.timer)
document.getElementById('timer').innerHTML=timer
setInterval(() => {
const timer = formatCountdown(res.timer)
document.getElementById('timer').innerHTML=timer
}, 1000);

document.getElementById('drop-img').src=res.url

}

load()

