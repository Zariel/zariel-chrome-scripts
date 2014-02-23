// ==UserScript==
// @name UG Decrap
// @match http://*.ultimate-guitar.com/*
// @match https://*.ultimate-guitar.com/*
// @run_at document_end
// ==/UserScript==


var removeNode = function(node) {
    node.parentNode.removeChild(node);
}

var hideClass = function(className) {
    var elem = document.getElementsByClassName(className);

    for(var j = 0; j < elem.length; j++) {
        //elem[j].style.display = "none";
        removeNode(elem[j]);
    }
}

var hideID = function(id) {
    var elem = document.getElementById(id);

	removeNode(elem);
}

var fixStripes = function(table, className) {
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

var cleanTabs = function() {
    var nodes = document.getElementsByClassName("ugtab2");

    var table = null;

    var i = 0;
    while(nodes.length > 0) {
        if(table === null) {
            table = nodes[i].parentNode.parentNode.parentNode.parentNode;
        }

        var row = nodes[i].parentNode.parentNode;

        table.deleteRow(row.rowIndex);
    }

    if(table !== null) {
        fixStripes(table, "tr");
    }
}

var removeRow = function(table, index) {
    var row = table.rows[index];
    var artist = row.cells[0];

    // save the artist!
    if(table.rows[index + 1] != null) {
        var text = artist.innerHTML.split("<span")[0];
        table.rows[index + 1].cells[0].innerHTML = text;
    }

    table.deleteRow(index);
}

var cleanSearch = function() {
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

var removeSearchBanner = function() {
    var a = document.getElementById("advanced_search");
    if(a == undefined) {
        return;
    }

    var trs = a.getElementsByTagName("tr");
    if(trs != undefined && trs.length > 0) {
        removeNode(trs[0]);
   }
}

var cleanHomePage = function() {
    var hide = [ "boxx", "deal_and_img" ];

    for(var i = 0; i < hide.length; i++) {
        hideClass(hide[i]);
    }

	var body = document.getElementsByTagName("body")[0];
	for(var i = 0; i < body.childNodes.length; i++) {
		var child = body.childNodes[i];
		if(child.tagName === "DIV") {
			var div = null;
			if((div = child.getElementsByClassName("list_takeover")) !== undefined) {
				removeNode(child);
				break;
			}
		}
	}
}

var cleanTabDisplay = function() {
	console.log("Cleaning tab display");
    hideClass("tabinfo");
    hideClass("tab_scroll");
    hideClass("tdsug");
    hideClass("tabpro_info");
    hideClass("rd_l bottom_adv_red");
    hideClass("tabpro_links");
    hideClass("adv_bottom");
	hideClass("trial_mess");

    hideID("gpa-container");

	var hider = document.getElementById('hide_player');
	var tabProShit = hider.parentNode;
	removeNode(tabProShit);
}

var cleanBands = function() {
    var tds = document.getElementsByTagName("td");

    for(td in tds) {
        var r = tds[td];
        if(r.width == 310 && r.bgColor == "#141414" && r.vAlign == "top") {
            r.parentNode.deleteCell(r.cellIndex);
            break;
        }
    }
}

var init = function() {
    var url = document.URL;
	console.log(url)

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
    removeSearchBanner();
}

var state = document.readyState;
if(state == "complete" || state == "interactive") {
	init();
} else {
	window.onload = init;
}
