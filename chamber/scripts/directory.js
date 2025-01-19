
function getdate() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').appendChild(document.createTextNode(currentYear));

    const lastModifiedDate = formatDateTime(new Date(document.lastModified));
    document.getElementById('lastModified').appendChild(document.createTextNode(lastModifiedDate));
}

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


window.onload = loadClients, getdate(), setView('grid');



function formatDateTime(receivedDate) {
  
    const day = String(receivedDate.getDate()).padStart(2, "0");
    const month = String(receivedDate.getMonth() + 1).padStart(2, "0");
    const year = receivedDate.getFullYear();
  
    const hours = String(receivedDate.getHours()).padStart(2, "0");
    const minutes = String(receivedDate.getMinutes()).padStart(2, "0");
    const seconds = String(receivedDate.getSeconds()).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }



const clients = [
    {
        "BusinessName": "Google",
        "BusinessTagline": "Organize the world's information.",
        "ImageUrl": "https://logo.clearbit.com/google.com",
        "Email": "info@google.com",
        "Phone": "1-800-466-4411",
        "Url": "https://www.google.com"
    },
    {
        "BusinessName": "McDonald's",
        "BusinessTagline": "I'm lovin' it.",
        "ImageUrl": "https://logo.clearbit.com/mcdonalds.com",
        "Email": "info@mcdonalds.com",
        "Phone": "1-800-244-6227",
        "Url": "https://www.mcdonalds.com"
    },
    {
        "BusinessName": "Burger King",
        "BusinessTagline": "Have it your way.",
        "ImageUrl": "https://logo.clearbit.com/bk.com",
        "Email": "info@bk.com",
        "Phone": "1-866-394-2493",
        "Url": "https://www.bk.com"
    },
    {
        "BusinessName": "Microsoft",
        "BusinessTagline": "Empowering every person on the planet.",
        "ImageUrl": "https://logo.clearbit.com/microsoft.com",
        "Email": "contact@microsoft.com",
        "Phone": "1-800-642-7676",
        "Url": "https://www.microsoft.com"
    },
    {
        "BusinessName": "Amazon",
        "BusinessTagline": "Work hard. Have fun. Make history.",
        "ImageUrl": "https://logo.clearbit.com/amazon.com",
        "Email": "info@amazon.com",
        "Phone": "1-888-280-4331",
        "Url": "https://www.amazon.com"
    },
    {
        "BusinessName": "Tesla",
        "BusinessTagline": "Accelerating the world's transition to sustainable energy.",
        "ImageUrl": "https://logo.clearbit.com/tesla.com",
        "Email": "support@tesla.com",
        "Phone": "1-888-518-3752",
        "Url": "https://www.tesla.com"
    },
    {
        "BusinessName": "Starbucks",
        "BusinessTagline": "To inspire and nurture the human spirit.",
        "ImageUrl": "https://logo.clearbit.com/starbucks.com",
        "Email": "info@starbucks.com",
        "Phone": "1-800-782-7282",
        "Url": "https://www.starbucks.com"
    },
    {
        "BusinessName": "Apple",
        "BusinessTagline": "Think different.",
        "ImageUrl": "https://logo.clearbit.com/apple.com",
        "Email": "contact@apple.com",
        "Phone": "1-800-692-7753",
        "Url": "https://www.apple.com"
    },
    {
        "BusinessName": "Coca-Cola",
        "BusinessTagline": "Open happiness.",
        "ImageUrl": "https://logo.clearbit.com/coca-cola.com",
        "Email": "contactus@coca-cola.com",
        "Phone": "1-800-438-2653",
        "Url": "https://www.coca-cola.com"
    },
    {
        "BusinessName": "Nike",
        "BusinessTagline": "Just do it.",
        "ImageUrl": "https://logo.clearbit.com/nike.com",
        "Email": "support@nike.com",
        "Phone": "1-800-806-6453",
        "Url": "https://www.nike.com"
    }
];