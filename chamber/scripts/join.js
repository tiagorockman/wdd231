import {memberships} from './mebership-levels.js';
import { setDataFooter,  setHambugerButton } from './base.js';

//Initial calls
setHambugerButton();
setDataFooter();


const divDetails = document.getElementById("details-memberships");
const dialogMembership = document.getElementById("dialog-membership");

function displayMemberships() {
    //Function to create and display the elements into the HTML

    memberships.forEach(element => {

        //Creation of the elements
        let card = document.createElement('div');
        let imageLogo = document.createElement('img');

        //Logo and Image
        imageLogo.setAttribute("src", element.image);
        imageLogo.setAttribute("alt", "Badge Membership");
        imageLogo.setAttribute("loading", "lazy");
        imageLogo.setAttribute("width", "100");
        imageLogo.setAttribute("height", "100");
        imageLogo.setAttribute('class', 'badges');

        card.setAttribute('id', "container-img");

        card.appendChild(imageLogo);

        divDetails.appendChild(card);

        imageLogo.addEventListener('click', () => {  
            displayDetailsMemberships(element);
        })
    });
}

function displayDetailsMemberships(membership) {
    //Function to display the details of the memberships
    dialogMembership.innerHTML = `
    <button id="closeModal">❌</button>
    <h3>${membership.name}</h3>
    <p>
    <strong>Description</strong>:<br>
    ${membership.description}
    </p>
    `;
    dialogMembership.showModal();
    dialogMembership.classList.add('open');

    const closeMOdal = document.getElementById('closeModal');
    closeMOdal.addEventListener('click', (event) => {
        dialogMembership.classList.remove('open');
        event.preventDefault();
        dialogMembership.close();
    })
}

const form = document.querySelector('form');
const timestampInput = document.querySelector('#timestamp');

form.addEventListener('submit', function(event) {
    const today = new Date().toString();
    timestampInput.value = today;
});

displayMemberships();