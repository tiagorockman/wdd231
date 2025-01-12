
window.onload = function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').appendChild(document.createTextNode(currentYear));

    const lastModifiedDate = new Date(document.lastModified);
    document.getElementById('lastModified').appendChild(document.createTextNode(lastModifiedDate));
}
