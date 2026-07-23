document.addEventListener("DOMContentLoaded", () => {
  const typingBubble = document.getElementById("bubble");
  const finalPopup = document.getElementById("popup");
  
  if (!typingBubble || !finalPopup) return;

  // Find the grey and green ticks inside the final popup box
  const greenTicks = finalPopup.querySelector(".wa-status-check");
  const greyTicks = finalPopup.querySelector(".wa-status-check-grey");

  // Setup the scroll tracker (Intersection Observer)
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        // Step 1: User scrolls into view -> Show ONLY the typing bubble, keep final message hidden
        typingBubble.style.display = "block";
        finalPopup.style.display = "none";

        // Step 2: After 2 seconds -> Hide the typing bubble, show the actual text message with grey ticks
        setTimeout(() => {
          typingBubble.style.display = "none"; 
          finalPopup.style.display = "block";    
          
          if (greyTicks) greyTicks.style.display = "inline";
          if (greenTicks) greenTicks.style.display = "none";

          // Step 3: Wait 1.5 seconds after message lands, then snap the grey ticks to green read ticks
          setTimeout(() => {
            if (greyTicks) greyTicks.style.display = "none";
            if (greenTicks) greenTicks.style.display = "inline";
          }, 1500);

        }, 3000); // 2 seconds typing duration

        // Disconnect observer so this whole sequence only triggers once
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Fires when 25% of the viewport section is visible
  });

  // Target the main wrapper container to watch for the scroll event
  const chatSection = document.querySelector(".chat-section-viewport");
  if (chatSection) {
    observer.observe(chatSection);
  }
});

//database
const savebtn = document.getElementById('save')
const email = document.getElementById('email')
document.getElementById('save-email').addEventListener('submit', async(e)=>{
e.preventDefault()

savebtn.disable = true
savebtn.innerHTML='please wait'
try {
const result = await fetch('/admin/deploy/email', {
    method: 'POST',
    headers: {
        'content-Type': 'application/json'
    },
body: JSON.stringify({ email: email.value })
})

if(result.ok){
const data = await result.json()    
console.log('success')
if(data.status===true){
savebtn.disable = true
savebtn.innerHTML='JOIN THE UNIVERSE'
email.value=''
email.placeholder='welcome to the universe'
email.readOnly = true
console.log('email sent', data)
}
else if(data.status==='exist'){
savebtn.disable = false
savebtn.innerHTML='JOIN THE UNIVERSE'
email.value=''
email.placeholder='email is already registered'
return
}
else{savebtn.disable = false
savebtn.innerHTML='JOIN THE UNIVERSE'
window.alert("server error: couldn't save email"); return}
}
else{savebtn.disable = false
savebtn.innerHTML='JOIN THE UNIVERSE'
window.alert("server error: couldn't save email"); return}    
} catch (error) {savebtn.disable = false
savebtn.innerHTML='JOIN THE UNIVERSE'
console.log('server err: ',error); return
}

})


