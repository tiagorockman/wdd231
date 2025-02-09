import { setDataFooter,  setHambugerButton } from './base.js';
import { places } from './places.js';

//Initial calls
setHambugerButton();
setDataFooter();

displayItems(places);

document.addEventListener("DOMContentLoaded", function () {
    const visitMessage = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");

    const currentDate = new Date();
    localStorage.setItem("lastVisit", currentDate);

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! This is your first time here.";
        return;
    }

    const previousDate = new Date(lastVisit);
    const timeDiff = currentDate - previousDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (daysDiff < 1) {
        visitMessage.textContent = "Welcome back! You last visited today.";
    } else if (daysDiff < 7) {
        visitMessage.textContent = "Welcome back! You visited within the last week.";
    } else {
        visitMessage.textContent = "Welcome back! It's been more than a week since your last visit.";
    }
});

function displayItems(places){
    const sectionContainer = document.querySelector(".grid-container");
    places.forEach(place=>{
        const div = document.createElement("div");
        div.classList.add("card");
        
        const img = document.createElement("img");
        img.src = place.image;
        img.alt = place.title;
        img.loading = "lazy";
        div.appendChild(img)

        const title = document.createElement("h2");
        title.innerHTML = place.title;
        div.appendChild(title);

        const address = document.createElement("address");
        address.innerHTML = place.address;
        div.appendChild(address);

        const description = document.createElement("p");
        description.innerHTML = place.description;
        div.appendChild(description);   
        
        sectionContainer.appendChild(div);
    });

    
}
