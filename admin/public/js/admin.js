
// Grab our elements from the DOM
const codeArea = document.getElementById('emailcontent');
const previewFrame = document.getElementById('frame');

// Function to inject and run the code
function runUserCode() {
    // Get the value from the textarea
    const userHTML = codeArea.value;

    // Access the document inside the iframe
    const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

    // Open the iframe document, write the user's code, and close it to render
    iframeDoc.open();
    iframeDoc.write(userHTML);
    iframeDoc.close();
}

// Run the code when the user clicks the button
codeArea.addEventListener('focusout', runUserCode);

document.getElementsByClassName('href').item(0).addEventListener('click', ()=>{
const targetElement = document.querySelector('.products');
targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
})
document.getElementsByClassName('href').item(1).addEventListener('click', ()=>{
const targetElement = document.querySelector('.add');
targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
})
document.getElementsByClassName('href').item(2).addEventListener('click', ()=>{
const targetElement = document.querySelector('.log');
targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
})
document.getElementsByClassName('href').item(3).addEventListener('click', ()=>{
const targetElement = document.querySelector('.drop-section');
targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
})