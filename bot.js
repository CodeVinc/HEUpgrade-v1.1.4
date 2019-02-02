// ==UserScript==
// @name         HEUpgrade v1.1.4
// @namespace    http://tampermonkey.net/
// @version      1.1.4
// @description  Upgrade CPUs
// @author       Outiz for Hacker Experience
// @include      https://*.hackerexperience.com/*
// ==/UserScript==

var TotalServes  = $("div.widget-content.padding > ul > a").length;
var index = 0;
var quest;
var interval;
var account = "NUMERO DA SUA CONTA AQUI"

$(document).ready(function() {
    if ($('body').hasClass('hardware'))
    {
        quest = prompt("Ativar BOT? S/N");

       if(quest.toLowerCase() == "s")
        {
            interval = setInterval(Upgrade,2000);
        }else{
            console.log("BOT OFF");
        }
    }
});
function Upgrade(){
    if(index == TotalServes){

        InfoMSG("Pronto!");

        return null;
    }
    else{
        InfoMSG(index + "/" + TotalServes);

        var IndexServes  = $("div.widget-content.padding > ul > a").eq(index);
        var CPU = IndexServes.find(".list-user > small").eq(0).text();

        while(CPU == "4 GHz")
        {
            index++;
            IndexServes  = $("div.widget-content.padding > ul > a").eq(index);
            CPU = IndexServes.find(".list-user > small").eq(0).text();
        }

        var IDServe = IndexServes.attr('href').replace("?opt=upgrade&id=","");

        if(CPU != "4 GHz")
            getUpdate(IDServe);

        index++;
    }
}

function getUpdate(id){

    $.ajax({
        type: 'GET',
        async: false,
        url: "/hardware?opt=upgrade&id=" + id,
        success: function() {
            Update('cpu', 5000, 8);
        }
    });
}

function Update(itemToBuy, itemCost, itemId)
 {
    var dataObject = {};
    dataObject.acc = account;
    dataObject.act = itemToBuy;
    dataObject['part-id'] = itemId;
    dataObject.price = itemCost;

    $.ajax({
        type: 'POST',
        async: false,
        data: dataObject,
        success: function() {
	      console.log("Updated")
        }
    });
}


function InfoMSG(text) {
    $(".label.label-info").html(text);
}
