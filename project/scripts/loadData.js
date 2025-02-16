
export function setCurrentYear() {

    const currentYear = document.getElementById('currentyear');
    currentYear.textContent = new Date().getFullYear();

}

export function setHamburger() {
    /*HAMBURGER*/
    const hamButton = document.querySelector('#menu');
    const navLinks = document.querySelector('.nav-links');  // FIXED SELECTOR

    hamButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');  // Toggle .open on .nav-links
        hamButton.classList.toggle('open');
    });

}



export function loadBanners() {
    const banners = ['banner1', 'banner2', 'banner3'];

    const randomIndex = Math.floor(Math.random() * banners.length);

    banners.forEach(function(banner) {
        document.getElementById(banner).style.display = 'none';
    });

    document.getElementById(banners[randomIndex]).style.display = 'block';
};
