// ==UserScript==
// @match http://*.reddit.com/*
// @match https://reddit.com/*
// @run_at document_start
// ==/UserScript==

function init() {
    var body = document.getElementsByTagName("body")[0];

    body.style.fontFamily = "Helvetica,Arial,Sans-Serif";
}

function setup() {
    var state = document.readyState;
    if(state == "complete" || state == "interactive") {
        init();
    } else {
        window.onload = init;
    }
}

setup();
