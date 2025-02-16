import { getAnimeSelected, setEpisodeSelected, removeEpisodeSelected} from "./cache.js";
import { setCurrentYear, setHamburger, loadBanners} from './loadData.js'

window.onload = loadBanners;

const animeSelected = getAnimeSelected();


onInit();


function onInit(){
    setCurrentYear();
    setHamburger();
    loadAnimeInfo();
    loadWheretoWatch();
    loadNews();

    //clear episodeSelected
    removeEpisodeSelected()
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

function loadWheretoWatch(){
    document.getElementById("crunchyroll-link").href = `https://www.crunchyroll.com/search?q=${encodeURIComponent(animeSelected.title)}`;
    document.getElementById("netflix-link").href = `https://www.netflix.com/search?q=${encodeURIComponent(animeSelected.title)}`;
    document.getElementById("youtube-link").href = `https://www.youtube.com/results?search_query=${encodeURIComponent(animeSelected.title)}+trailer`;
}

function loadNews(){
    document.getElementById("crunchyroll-img").src = animeSelected.images.webp.image_url;
    document.getElementById("animesNet-img").src = animeSelected.images.webp.image_url;
    document.getElementById("animeNew-img").src = animeSelected.images.webp.image_url;
    document.getElementById("pbs-img").src = animeSelected.images.webp.image_url;
    document.getElementById("crunchyroll").href = `https://www.crunchyroll.com/pt-br/news/search?s=${encodeURIComponent(animeSelected.title)}`;
    document.getElementById("animesNet").href = ` https://www.animenewsnetwork.com/search?q=${encodeURIComponent(animeSelected.title)}#gsc.tab=0&gsc.q=${encodeURIComponent(animeSelected.title)}&gsc.ref=more%3Anew_s`;
    document.getElementById("animeNew").href = `https://animenew.com.br/?s=${encodeURIComponent(animeSelected.title)}`;
    document.getElementById("pbs").href = `https://www.pbs.org/newshour/search-results?q=${encodeURIComponent(animeSelected.title)}`;

}

document.addEventListener("DOMContentLoaded", function () {
    const episodesContainer = document.getElementById("episodesContainer");
    const loadMoreBtn = document.getElementById("loadMoreBtn");


    const totalEpisodes = animeSelected.episodes;
    let currentEpisode = 1;
    const episodesPerPage = 15;

    function loadEpisodes() {
        debugger;
        for (let i = 0; i < episodesPerPage; i++) {
            if (currentEpisode > totalEpisodes) {
                loadMoreBtn.style.display = "none";
                break;
            }

            if(totalEpisodes > 10){
                loadMoreBtn.style.display = "block";
            }

            const episodeCard = document.createElement("a");
            episodeCard.innerHTML = `
                <div class="episode-card">
                    <div class="video-container">
                        <img class="video-thumbnail"
                            loading="lazy"
                            src="https://img.youtube.com/vi/fg_fP7cRJXg/mqdefault.jpg" 
                            alt="Episode ${currentEpisode}">
                    </div>
                    <span class="number">1x${currentEpisode}</span>
                    <div class="play-btn">▶</div>
                </div>`;
            
            episodeCard.onclick = () => { setEpisodeSelectedAndRedirect(`${i+1}`)};            

            episodesContainer.appendChild(episodeCard);
            currentEpisode++;
        }
    }

    // Load initial episodes
    loadEpisodes();

    // Load more episodes when button is clicked
    loadMoreBtn.addEventListener("click", loadEpisodes);
});

function setEpisodeSelectedAndRedirect(episode){
    debugger;
    setEpisodeSelected(episode);
    window.location.href = "episodes.html";
}
