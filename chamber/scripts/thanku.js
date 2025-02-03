import { setDataFooter,  setHambugerButton } from './base.js';

//Initial calls
setHambugerButton();
setDataFooter();

const url = window.location.href;
const container = document.getElementById('result');

const infoFromForm = url.split('?');

const formData = infoFromForm[1].split('&');

function show(word) {
    let result = '';

    formData.forEach((element) => {
        console.log(element);
        if (element.startsWith(word)) {
            result = element.split('=')[1];
            result = decodeURIComponent(result).replace(/\+/g, ' '); // Decode and replace the + sign
        }
    });
    return result;
}
function date(word) {
    let result = '';
    let end = '';

    formData.forEach((element) => {
        console.log(element);
        if (element.startsWith(word)) {
            result = element.split('=')[1];
            result = decodeURIComponent(result);
            end = result.replace(/\+/g, ' ');
        } // end of the if
    });
    return end;
}

function email(word){
    let result = '';
    
    formData.forEach((element) => {
        console.log(element);
        if (element.startsWith(word)){
            result = element.split('=');
            result = result[1].replace('%40', '@'); //replace the + sign
        } //end of the if
    })
    return(result);
}

container.innerHTML = `
    <h2>Thanks for your submition ${show('first')}</h2>
    <p><br>We have this information:</p><br>
    <ul id="list-info">
        <li>First Name: ${show('first')}</li>
        <li>Last Name: ${show('last')}</li>
        <li>Number: ${show('phone')}</li>
        <li>Email: ${email('email')}</li>
        <li>Business: ${show('business')} </li>
        <li>Business Name: ${show('organizational')} </li>
    </ul>
    <br>
    <br>
    <p><strong>Description:</strong> ${show('description')}</p>
    <br>
    <p><strong>Membership Category:</strong> ${show('membership')}</p>
    <br>
    <p><strong>Date:</strong> ${date('timestamp')}</p>
`;