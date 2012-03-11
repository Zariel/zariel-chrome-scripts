// ==UserScript==
// @match http://twitter.com/*
// @match https://twitter.com/*
// ==/UserScript==

// Bceause new twitter only uses 50% of my screen, which is useless

function init() {
    window.onhashchange = setup;

    clean();
}

function clean() {
    console.log("Clean = " + window.location);
    var container = document.getElementById("page-container");

    var dash = container.getElementsByClassName("dashboard")[0];
    var content = container.getElementsByClassName("content-main")[0];

    if(dash == undefined) {
        return;
    }

    dash.style.float = "right";
    content.style.float = "left";

    container.style.width = "60%";
    content.style.width = "70%";
    dash.style.width = "29%";
}

function setup() {
    console.log("Setup state = " + document.readyState);
    if(document.readyState == "complete") {
        init();
    } else {
        window.onload = init;
    }
}

setup();
