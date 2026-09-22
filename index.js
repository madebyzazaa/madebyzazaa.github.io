for (let index = 0; index < 31; index++) {
const box = document.createElement('div')
box.className = 'box'
document.getElementsByClassName('grid').item(0).append(box)
}

document.getElementById('add').addEventListener("click", (e)=>{document.getElementById('form').style.display='flex'; e.stopPropagation(); })
document.addEventListener("click", ()=>{document.getElementById('form').style.display='none'})
document.getElementById('form').addEventListener("click", (e)=>{e.stopPropagation()})
