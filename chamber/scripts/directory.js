
import { clients } from "./clients.js";
import { setDataFooter } from "./base.js";

function loadClients() {
    const directory = document.getElementById('directory');
    clients.forEach(client => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="client-info-head">
              <h3>${client.BusinessName}</h3>
              <p>${client.BusinessTagline}</p>
              <hr/>
            </div>
              <div class="client-info-body">
                <img src="${client.ImageUrl}" alt="${client.BusinessName} Logo"> 
                <div>       
                <p>Email: <a href="mailto:${client.Email}">${client.Email}</a></p>
                <p>Phone: ${client.Phone}</p>
                </div>
            </div>
             <p class="url"><a href="${client.Url}" target="_blank">Visit Website</a></p>
        `;
        directory.appendChild(card);
    });
}




function setView(view) {
    const directory = document.getElementById('directory');
    const buttonGrid = document.querySelector('#grid');
    const buttonList = document.querySelector('#list');
    if (view === 'grid') {
        directory.classList.add('grid-view');
        directory.classList.remove('list-view');
        buttonGrid.classList.add('activebt');
        buttonList.classList.remove('activebt');
    } else if (view === 'list') {
        directory.classList.add('list-view');
        directory.classList.remove('grid-view');
        buttonGrid.classList.remove('activebt');
        buttonList.classList.add('activebt');
    }
}


window.onload = loadClients, setDataFooter(), setView('grid');