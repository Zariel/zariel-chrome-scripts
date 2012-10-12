// ==UserScript==
// @match http://www.ultimate-guitar.com/*
// @match http://tabs.ultimate-guitar.com/*
// @run_at document_start
// ==/UserScript==

function hideClass(className) {
    var elem = document.getElementsByClassName(className);

    for(var j = 0; j < elem.length; j++) {
        elem[j].style.display = "none";
    }
}

function hideID(id) {
    var elem = document.getElementById(id);

    elem.style.display = "none";
}

function cleanTabs() {
    var nodes = document.getElementsByClassName("ugtab2");

    var table = null;

    var i = 0;
    while(nodes.length > 0) {
        if(table == null) {
            table = nodes[i].parentNode.parentNode.parentNode.parentNode;
        }

        var row = nodes[i].parentNode.parentNode;

        table.deleteRow(row.rowIndex);
    }

    if(table != null) {
        fixStripes(table, "tr");
    }
}

function removeRow(table, index) {
    var row = table.rows[index];
    var artist = row.cells[0];

    // save the artist!
    if(table.rows[index + 1] != null) {
        var text = artist.innerHTML.split("<span")[0];
        table.rows[index + 1].cells[0].innerHTML = text;
    }

    table.deleteRow(index);
}

function cleanSearch() {
    var nodes = document.getElementsByClassName("tresults");

    if(nodes.length ==  0) {
        return;
    }

    var table = nodes[0];

    // Iterate through the table and find the premium rows and delete them
    var rows = table.rows;
    for(var row = 0; row < rows.length; row++) {
        var tr = rows[row];
        var type = tr.cells[3].firstChild;

        if(type != null && type.innerHTML == "tab pro") {
            removeRow(table, tr.rowIndex);
        }
    };

    fixStripes(table, "stripe");
}

function fixStripes(table, className) {
    var rows = table.rows;
    var stripe = true;

    for(var i = 0; i < rows.length; i++) {
        var row = rows[i];

        if(!stripe) {
            row.className = null;
        } else {
            row.className = className;
        }

        stripe = !stripe;
    }
}

function cleanHomePage() {
    var hide = [ "boxx" ];

    for(var i = 0; i < hide.length; i++) {
        hideClass(hide[i]);
    }
}

function cleanTabDisplay() {
    hideClass("tabinfo");
    hideClass("tab_scroll");
    hideClass("tdsug");

    hideID("gpa-container");

    var gpa = document.getElementById("gpa-container");
}

function cleanBands() {
    var tds = document.getElementsByTagName("td");

    for(td in tds) {
        var r = tds[td];
        if(r.width == 310 && r.bgColor == "#141414" && r.vAlign == "top") {
            r.parentNode.deleteCell(r.cellIndex);
            break;
        }
    }
}

function init() {
	var url = document.URL;

	if(url.match(/^(http:\/\/)?(www.)?ultimate\-guitar\.com\/search\.php\?/)) {
	    cleanSearch();
	} else if(url.match(/^(http:\/\/)?(www.)?ultimate\-guitar\.com\/tabs\//)) {
	    cleanTabs();
	} else if(url.match(/^(http:\/\/)?(www.)?ultimate\-guitar\.com\/bands\//)) {
	    cleanBands();
	} else if(url.match(/^(http:\/\/)?tabs\.ultimate\-guitar\.com\//)) {
	    cleanTabDisplay();
	} else if(url.match(/^(http:\/\/)?(www.)?ultimate\-guitar\.com\/?$/)) {
	    cleanHomePage();
	}

	hideClass("b headtbl");
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
