
//add function

const fileInput = document.getElementById('uploadimg');
const saveBtn = document.getElementById('uploadsave');
const upload_name = document.getElementById('uploadname');
const upload_description = document.getElementById('uploaddes');

console.log('Client script running');

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // 1. Grab the file directly from the input at the moment of clicking
    const file = fileInput.files[0];
    if(upload_name.value==''){return alert('add product name')}
    if (!file) {
        return alert("Please select a file first!");
    }
saveBtn.disable = true
saveBtn.innerHTML='saving...'
    // 2. Read the file inside the click handler using a Promise (so we can 'await' it!)
    const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });

    try {
        console.log("Sending file details...", file.name);

        // 3. Send the clean JSON data payload
        const response = await fetch('/admin/upload-base64', { // ⚠️ Make sure this URL matches your backend route exactly (e.g., '/admin/upload' or '/upload-base64')
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: upload_name.value,
                imageName: file.name,
                imageType: file.type,
                description: upload_description.value,
                imageData: base64String 
            })
        });
        
        const result = await response.json();
        console.log("Server response:", result);
        if(result){saveBtn.innerHTML='success';
            upload_name.value=''
            
            fileInput.value=null
            setTimeout(() => {
        saveBtn.disable = false
saveBtn.innerHTML='save'
            }, 1000);
        }
        
    } catch (err) {
        console.error("Fetch error:", err);
                saveBtn.disable = false
saveBtn.innerHTML='save'
    }
});

function render() {
let name = document.getElementById('render-name')
let description = document.getElementById('render-des')
let uname = document.getElementById('uploadname').value
let udescription = document.getElementById('uploaddes').value
name.innerHTML = uname
description.innerHTML=udescription
}

fileInput.addEventListener('input', (e)=>{
let img = document.getElementById('render-img')
let uimg = e.target.files[0]
uimg = URL.createObjectURL(uimg);
img.src=uimg

})
upload_name.addEventListener('input', render)
upload_description.addEventListener('input', render)
