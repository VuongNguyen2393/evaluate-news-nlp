// Replace checkForName with a function that checks the URL
import { isValidUrl } from './urlChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8080'

const form = document.getElementById('urlForm');
if(form){
    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    let urlCheckResult = isValidUrl(formText);
    if(!urlCheckResult){
        alert("Enter a valid URL");
    } else {
    // If the URL is valid, send it to the server using the serverURL constant above
        await senDataToServer(serverURL+'/url',{newsUrl: formText})
        .then(res => res.json())
        .then((res) => {
            console.log(`result:${res}`);
            updateUI(res);
        });
    }
}

// Function to send data to the server
const senDataToServer = async (url = '', data = {}) => {
    try{
        return await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
        document.getElementById('score_tag').innerHTML = `Sentiment: ${sentimentTranslator(data.score_tag)}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
        document.getElementById('text').innerHTML = `Text: ${data.sentence_list[0].text}`;

    }catch(error){
        console.log('ErrorUpdateUI:', error);
    }
}
// Sentiment translator 
const sentimentTranslator = (tag) => {
    let sentiment;
    switch(tag){
        case 'P+':
            sentiment = 'Strong positive';
            break;
        case 'P':
            sentiment = 'Positive';
            break;
        case 'NEU':
            sentiment = 'Neutral';
            break;
        case 'N':
            sentiment = 'Negative';
            break;
        case 'N+':
            sentiment = 'Strong negative';
            break;
        default:
            sentiment = 'No sentiment';
    }
    return sentiment;
}
// Export the handleSubmit function
export { handleSubmit, sentimentTranslator };

