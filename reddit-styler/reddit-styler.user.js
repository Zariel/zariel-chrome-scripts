// ==UserScript==
// @match http://*.reddit.com/*
// @match https://reddit.com/*
// ==/UserScript==

function init() {
    var body = document.getElementsByTagName("body")[0];

    body.style.fontFamily = "Helvetica,Arial,Sans-Serif";
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
