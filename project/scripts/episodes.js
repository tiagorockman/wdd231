import { getAnimeSelected, setEpisodeSelected, getEpisodeSelected, removeEpisodeSelected} from "./cache.js";
import { setCurrentYear, setHamburger, loadBanners } from "./loadData.js";

window.onload = loadBanners;

const animeSelected = getAnimeSelected();
let episodeSelected = getEpisodeSelected();
let currentEpisode = 1; // Moved outside the function to persist across calls
const episodesPerPage = 15;


await onInit();


async function onInit(){
    setCurrentYear();
    setHamburger();
    loadAnimeInfo();
    loadEpisodes();
   await loadVideo();

}


function loadAnimeInfo(){
    const title = document.querySelector(".anime-title");
    const animePoster = document.querySelector(".anime-poster");
    const genre = document.querySelector(".genre");
    const year = document.querySelector(".year");
    const seasons = document.querySelector(".seasons");
    const episodes = document.querySelector(".episodes");
    const description = document.querySelector(".anime-description");
    const score = document.querySelector(".imdb-score");
    

    title.innerHTML = animeSelected.title + " " + animeSelected.title_japanese;
    animePoster.src = animeSelected.images.webp.large_image_url ||  animeSelected.images.jpg.large_image_url;
    genre.innerHTML = animeSelected.genres.length > 1 ? animeSelected.genres[0].name : animeSelected.genres.name;
    year.innerHTML = animeSelected.year;
    seasons.innerHTML = "Several";
    episodes.innerHTML = `<span class="number">${animeSelected.episodes}</span> Episodes`;
    description.innerHTML = animeSelected.synopsis;
    score.innerHTML = animeSelected.score || 8.75;

}



function loadEpisodes() {
    const episodesContainer = document.getElementById("episodesContainer");

    const totalEpisodes = animeSelected.episodes;

    for (let i = 0; i < totalEpisodes; i++) {
    
        // Create main episode card div
            const episodeCard = document.createElement("div");
            episodeCard.classList.add("episode-card");
            episodeCard.onclick = () => playVideo(`${i+1}`);

            // Create video container div
            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            // Create image element
            const img = document.createElement("img");
            img.loading = "lazy";
            img.classList.add("video-thumbnail");
            img.src = `https://img.youtube.com/vi/fg_fP7cRJXg/mqdefault.jpg`;
            img.alt = `Episode ${currentEpisode}`;

            // Append image to video container
            videoContainer.appendChild(img);

            // Create episode number span
            const episodeNumber = document.createElement("span");
            episodeNumber.classList.add("number");
            episodeNumber.textContent = `1x${currentEpisode}`;

            // Create play button div
            const playButton = document.createElement("div");
            playButton.classList.add("play-btn");
            playButton.textContent = "▶";
            // playButton.addEventListener("click", (event) => {
            //     event.stopPropagation(); // Prevent triggering the episodeCard click
            //     playVideo(currentEpisode);
            // });

            // Append elements to episode card
            episodeCard.appendChild(videoContainer);
            episodeCard.appendChild(episodeNumber);
            episodeCard.appendChild(playButton);

                episodesContainer.appendChild(episodeCard);
                currentEpisode++; // Move to the next episode
            }
}



async function loadVideo(play){

    const player = document.getElementById("player");
    const infoPlayer = document.getElementById("infoPlayer");

    
    if(episodeSelected == "" ||  episodeSelected == 0 || episodeSelected == null)
    {
        setEpisodeSelected(1);
        loadVideo(true);
    }

    if(episodeSelected > 0){
        let episodeInfo = await getAnimeEpisodes(animeSelected.title);
        episodeInfo = episodeInfo.filter(x=> x.episode == episodeSelected);

        if(episodeInfo.length > 0 )   {
            player.src = episodeInfo[0].video;
            if(play)
                player.play();

             infoPlayer.innerHTML = `Now playing Episode ${episodeSelected}`;
        }else{
            infoPlayer.innerHTML = `Missing information or some problem playing Episode`;
        }         
           
    }

}

async function getAnimeEpisodes(animeName) {
    try {
        const response = await fetch("scripts/episodes.json"); // Load JSON file
        const animeData = await response.json();
        
        return animeData[animeName] ? animeData[animeName].episodes : [];
    } catch (error) {
        console.error("Error fetching anime episodes:", error);
        return [];
    }
}


function playVideo(ep){
    episodeSelected = ep;
    setEpisodeSelected(ep);
    loadVideo(true);
}

