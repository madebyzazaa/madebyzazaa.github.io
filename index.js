for (let index = 0; index < 31; index++) {
const box = document.createElement('div')
box.className = 'box'
document.getElementsByClassName('grid').item(0).append(box)
}

document.getElementById('add').addEventListener("click", (e)=>{document.getElementById('form').style.display='flex'; e.stopPropagation(); })
document.addEventListener("click", ()=>{document.getElementById('form').style.display='none'})
document.getElementById('form').addEventListener("click", (e)=>{e.stopPropagation()})

//streak
//name storage
//stats(3)
//calendar(31/30, save&display: object)

document.getElementsByClassName('backdrop').item(0).addEventListener('click', ()=>{
// Vibrates the phone for 200 milliseconds
  if (navigator.vibrate) {
    navigator.vibrate(200);
  } else {
    console.log("Vibration API is not supported on this device/browser.");
  }

})
