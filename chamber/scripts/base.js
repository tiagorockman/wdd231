import { clients } from "./clients.js";

export function setDataFooter() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').appendChild(document.createTextNode(currentYear));

    const lastModifiedDate = formatDateTime(new Date(document.lastModified));
    document.getElementById('lastModified').appendChild(document.createTextNode(lastModifiedDate));

    const informationContent = [
        "Hőgyes Endre u. 3, 1092 Hungria",
        "Mail 99, Budapest",
        "info@hamesnow.org",
        "(223) 555-2300"
    ];
    
    const informationSection = document.getElementById('information');
    const h2 = document.createElement("h2");
    h2.textContent = "Hames Snow Chamber of Commerce";
    informationSection.appendChild(h2);
    
    informationContent.forEach((text) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        informationSection.appendChild(paragraph);
    });

}

function formatDateTime(receivedDate) {
  
    const day = String(receivedDate.getDate()).padStart(2, "0");
    const month = String(receivedDate.getMonth() + 1).padStart(2, "0");
    const year = receivedDate.getFullYear();
  
    const hours = String(receivedDate.getHours()).padStart(2, "0");
    const minutes = String(receivedDate.getMinutes()).padStart(2, "0");
    const seconds = String(receivedDate.getSeconds()).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
