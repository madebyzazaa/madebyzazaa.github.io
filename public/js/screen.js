
if(window.innerWidth<450){
document.getElementsByClassName('navigation-href').item(2).innerHTML='DROP'
document.getElementsByClassName('navigation-href').item(3).innerHTML='PERKS'
} 
window.addEventListener('resize', ()=>{
if(window.innerWidth<450){
document.getElementsByClassName('navigation-href').item(2).innerHTML='DROP'
document.getElementsByClassName('navigation-href').item(3).innerHTML='PERKS'
} 
if(window.innerWidth>450){
document.getElementsByClassName('navigation-href').item(2).innerHTML='NEW DROP'
document.getElementsByClassName('navigation-href').item(3).innerHTML='FRESH PERKS'
}  
})