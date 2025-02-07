import { setDataFooter,  setHambugerButton } from './base.js';

//Initial calls
setHambugerButton();
setDataFooter();

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
