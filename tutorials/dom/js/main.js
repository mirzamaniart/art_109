console.log("Hello hello!");

let pageTitle = document.querySelector("#page-title");

setTimeout(function() {
    pageTitle.style.color = "pink";
    console.log("Timeout worked!");
}, 3000);

document.querySelector("header").onclick = function() {
    console.log("Clicked header!");
    document.querySelector("body").style.backgroundColor = "black";
};

document.querySelector("#page-title").addEventListener("click", function() {
    document.querySelector("#page-title").innerHTML = "GOTCHA";
    document.querySelector("#page-title").style.color = "blue";
});
