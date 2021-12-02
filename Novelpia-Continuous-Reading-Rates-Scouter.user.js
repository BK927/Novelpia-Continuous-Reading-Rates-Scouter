// ==UserScript==
// @name         노벨피아 연독률 측정
// @namespace    http://tampermonkey.net/
// @version      1.0z
// @description  작가들을 위한 연독율 측정기.
// @author       BK927
// @match        https://novelpia.com/novel/*
// @icon         https://www.google.com/s2/favicons?domain=novelpia.com
// @grant        none
// ==/UserScript==

window.addEventListener("load", (event) => {
    const displayBox = document.querySelector("body > div:nth-child(28) > div.mobile_hidden.s_inv > div > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(1)");

    const addEventToPageBtn = function () {
        const pageBtn = document.querySelectorAll("#episode_list > div > nav > ul > li");
        pageBtn.forEach((element) =>
            element.addEventListener("click", (e) => {
                setTimeout(() => {
                    clacViewGap();
                    addEventToPageBtn();
                }, 500);
            })
        );
    };

    addEventToPageBtn();
    clacViewGap();
});

function clacViewGap() {
    const allEpisodes = document.querySelectorAll("#episode_list > table > tbody > tr");
    const stats = [];

    allEpisodes.forEach((element, index) => {
        const node = document.querySelector("#episode_list > table > tbody > tr:nth-child(" + (1 + index * 2).toString() + ") > td.font12 > div > font > span:nth-child(2)");
        const statDict = extractStat(node);
        if (index > 0) {
            const formerView = stats[index - 1]["view"];
            const numSign = formerView > statDict["view"] ? "-" : "+";
            const gapPercent = Math.round((Math.abs(formerView - statDict["view"]) / formerView) * 100);
            node.innerHTML = node.innerHTML + '<span style="font-size:12px;color:#0000FF;">&nbsp; ' + numSign + gapPercent.toString() + "%</span>";
        }
        stats.push(statDict);
    });

    return stats;
}

function extractStat(element) {
    const regexp = /[0-9,]+/g;
    const parsed = element.innerText.match(regexp).map((e) => e.replace(",", ""));
    //parsed.forEach((e) => console.log(e));
    const dict = {};
    dict["length"] = parsed[0];
    dict["view"] = parsed[1];
    dict["comment"] = parsed[2];
    dict["thumup"] = parsed[3];
    return dict;
}
