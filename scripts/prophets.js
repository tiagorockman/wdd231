const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
let cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data);
   displayProphets(data.prophets);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

let i = 0;
const  displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    i++;
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let prophetOrder = document.createElement('h3');
    let portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} ${getPosition(i)}`);
    prophetOrder.textContent = `${getPosition(i)}`;
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(prophetOrder);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
}

const getPosition = (number) => {
    const complement = "Latter-day President";
    return `${getOrdinalAbbreviation(number)} ${complement}`;
}

function getOrdinalAbbreviation(number) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${number}th`;
    }
  
    switch (lastDigit) {
      case 1:
        return `${number}st`;
      case 2:
        return `${number}nd`;
      case 3:
        return `${number}rd`;
      default:
        return `${number}th`;
    }
  }

getProphetData();
