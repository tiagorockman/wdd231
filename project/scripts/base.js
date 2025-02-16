import { saveAnimeData, getCachedAnimeData, setAnimeSelected, getAnimeSelected, saveNews, removeEpisodeSelected } from "./cache.js";
import { setCurrentYear, setHamburger, loadBanners } from "./loadData.js";

window.onload = loadBanners;

/*APIS*/
const jikanApi = "https://api.jikan.moe/v4";
const animeAPI = "https://animeapi.skin";

const apisPaths = {
    news: `${jikanApi}/anime/1/news`,
    full: `${jikanApi}/anime/{id}/full`,
    embed: `${animeAPI}/embed/{title}-episode-{number}`,
    byName: `${jikanApi}/anime?q={animeName}&limit={number}`
}


await onInit();

async function onInit() {
    setCurrentYear();
    setHamburger();
    loadNews();
   await loadRecentEpisodes();
   await loadRecentAnimes();

}


function loadNews() {
    const storedData = localStorage.getItem("newsData");

    if(storedData){
        const { data, timestamp } = JSON.parse(storedData);
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        
        if (now - timestamp < oneWeek) {
            console.log("✅ Using cached news data"); //if storage data is more than 1 week remove it and search on api again
            loadNewsSection(data);
            return;
        } else {
            console.log("⏳ Cache expired. Fetching new news...");
            localStorage.removeItem("newsData"); // Clear old data
        }
    }

    fetch(apisPaths.news)
        .then(response => response.json())
        .then(news => {
            if (Array.isArray(news.data) && news.data.length > 0) {
                saveNews(news.data);
                loadNewsSection(news.data);
            }
        })
        .catch(err => console.error(err))
}


function loadNewsSection(news) {
    const newsContainer = document.querySelector(".news-container");
    news.forEach(item => {
        const newsCard = document.createElement("article");
        newsCard.classList.add("news-card");


        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.loading = "lazy";
        img.src = item.images.jpg.image_url;
        img.alt = item.title;

        //when does't has image
        img.onerror = function () {
            this.error = null; //prevents fallback
            this.src = "images/noimage.webp";
        }

        figure.appendChild(img);
        newsCard.appendChild(figure);


        const span = document.createElement("span");
        span.innerText = item.excerpt.substring(0, 50) + '...'; //only shows 50 caracteres
        newsCard.append(span);

        newsCard.addEventListener('click', () => {
            window.open(item.url);
        });

        newsContainer.append(newsCard);

    });


}

async function loadRecentAnimes() {

    removeEpisodeSelected();
    const animeNames = [
        "My Hero Academia",
        "Solo Leveling",
        "Dragon Ball Daima",
        "Kinnikuman Perfect Origin Arc",
        "CARDFIGHT"
    ];

    const animeDataArray = await Promise.all(
        animeNames.map(name=>getAnimeDatabyName(name))
    );

    loadRecentAnimesContainer(animeDataArray);
}

async function loadRecentEpisodes() {
    const episodesAnimesNames = [
        "DragonBall",
        "Captain Tsubasa",
        "Shurato",
        "Saint Seya",
        "Berserk"
    ]
    
    const animeDataArray = await Promise.all(
        episodesAnimesNames.map(name=>getAnimeDatabyName(name))
    );

   await loadRecentEpisodesContainer(animeDataArray) 

 }


async function loadRecentEpisodesContainer(animedata) {
    const epContainer = document.querySelector(".episodes-container");

    animedata.forEach(async episode =>{
        const epCard = document.createElement("div");
        epCard.classList.add("episode-card");
    
        const div = document.createElement("div");
        div.classList.add("video-container");
            const img = document.createElement("img");
            img.loading = "lazy";
            img.classList.add("video-thumbnail");
            img.src = episode.trailer.images.medium_image_url || episode.images.webp.image_url;
            img.alt = episode.title;
            div.appendChild(img);

            let url = episode.trailer.embed_url;
            const iframe = document.createElement("iframe");
            iframe.classList.add("video-iframe");
            if(url == null){
                url = await getAnimeTrailer(title, null);
            }
            iframe.dataSrc = url;
            iframe.src =  url;
            iframe.frameborder = "0";
            iframe.allowFullscreen = true;
            
        div.appendChild(iframe)
        
        epCard.appendChild(div);

        const span = document.createElement("span");
        span.innerText  = episode.title;
        epCard.appendChild(span);
    
        const play = document.createElement("div");
        play.classList.add("play-btn");
        play.innerHTML = "▶";

        play.addEventListener('click', ()=>{
            iframe.src = iframe.dataSrc;
            iframe.style.display = 'block';
            img.style.display = 'none';
            play.style.display = 'none'; 
        })

        epCard.appendChild(play);
    
       // setAnimeListener(episode, epCard);
    
        epContainer.appendChild(epCard);
    }); 

}

function loadRecentAnimesContainer(animeData) {
  
    const animesContainer = document.querySelector(".animes-container");

    animeData.forEach(item=>{
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");

        const img = document.createElement("img");
        img.loading = "lazy";
        img.src = item.images.webp.image_url || item.images.jpg.image_url;
        img.alt = item.title;

        //when does't has image
        img.onerror = function () {
            this.error = null; //prevents fallback
            this.src = "images/noimage.webp";
        }

        animeCard.appendChild(img);

        const p = document.createElement("p");
        p.innerText = item.title;

        animeCard.appendChild(p);

        setAnimeListener(item, animeCard);

        animesContainer.append(animeCard);
    });

}

function setAnimeListener(item, htmlobject) {
    htmlobject.addEventListener('click', () => {
        setAnimeSelected(item);
        window.location.href = "anime.html";
    });
}

async function getAnimeDatabyName(name) {

    const cacheData = getCachedAnimeData(name);
    if (Object.keys(cacheData).length > 0) {
        console.log(`Cache hit for: ${name}`);
        return cacheData;
    }

    console.log(`Fetching from API: ${name}`);
    const endpoint = apisPaths.byName.replace('{animeName}', name).replace('{number}', 1);

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (Array.isArray(data.data) && data.data.length > 0) {
            const animeInfo = data.data[0];

            saveAnimeData(name, animeInfo);

            return animeInfo;
        }
    } catch (err) {
        console.error(`Error fetching ${name}`, err);
    }
    return {};

}


async function getAnimeTrailer(animeName, existingUrl) {
    if (existingUrl) {
        return existingUrl; 
    }

    const searchUrl = `${animeAPI}/search?q=${encodeURIComponent(animeName)}`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data && data.length > 0 && data[0].embed_url) {
            return data[0].embed_url; // Return the first result's embed URL
        } else {
            console.warn(`No embed URL found for ${animeName}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
        return null;
    }
}
