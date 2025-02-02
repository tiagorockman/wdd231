//grab the url
const currentUrl = window.location.href;
console.log(currentUrl);

//divide the url into two halves
const everything=currentUrl.split("?");
console.log(everything);

//grag just the elements of second half
let formdata = everything[1].split('&');
console.log(formdata);
