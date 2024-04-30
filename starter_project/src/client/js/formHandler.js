// Replace checkForName with a function that checks the URL
import { isValidUrl } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    
    // Check if the URL is valid
    let urlCheckResult = isValidUrl(formText);
    if(!urlCheckResult){
        alert("Enter a valid URL");
    } else {
    // If the URL is valid, send it to the server using the serverURL constant above
        await senDataToServer('/url',formText)
        .then(function(result){
            updateUI(result);
        });
    }
}

// Function to send data to the server
const senDataToServer = async (url = '', data = '') => {
    try{
        await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers:{
                'Content-Type':'text/plain'
            },
            body: data
        });
    }catch(error){
        console.log('errorPostData', error);
    }
}

// Function to update result to UI
const updateUI = async(data)=>{
    try{
        document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
        document.getElementById('irony').innerHTML = `Irony: ${data.irony}`;
        document.getElementById('score_tag').innerHTML = `Sentiment: ${data.score_tag}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
        document.getElementById('text').innerHTML = `Text: ${data.sentence_list[0].text}`;

    }catch(error){
        console.log('ErrorUpdateUI:', error);
    }
}
// Export the handleSubmit function
export { handleSubmit };

