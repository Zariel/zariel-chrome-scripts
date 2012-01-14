// ==UserScript==
// @match http://twitter.com/*
// @match https://twitter.com/*
// ==/UserScript==

// Bceause new twitter only uses 50% of my screen, which is useless
var container = document.getElementById("page-container");

var dash = container.getElementsByClassName("dashboard")[0];
var content = container.getElementsByClassName("content-main")[0];

dash.style.float = "right";
content.style.float = "left";

container.style.width = "60%";
content.style.width = "70%";
dash.style.width = "29%";
