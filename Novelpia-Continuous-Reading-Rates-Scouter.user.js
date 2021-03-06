// ==UserScript==
// @name         노벨피아 연독률 측정
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  작가들을 위한 연독율 측정기.
// @author       BK927
// @match        https://novelpia.com/novel/*
// @icon         https://www.google.com/s2/favicons?domain=novelpia.com
// @updateURL https://openuserjs.org/meta/BK927/노벨피아_연독률_측정.meta.js
// @downloadURL https://github.com/BK927/Novelpia-Continuous-Reading-Rates-Scouter/raw/main/Novelpia-Continuous-Reading-Rates-Scouter.user.js
// @grant        none
// @license MIT
// ==/UserScript==

window.addEventListener("load", (event) => {
    const displayBox = document.querySelector("body > div:nth-child(28) > div.mobile_hidden.s_inv > div > div > table > tbody > tr:nth-child(2) > td > div > div:nth-child(1)");

    const addEventToPageBtn = function () {
        const pageBtn = document.querySelectorAll("#episode_list > div > nav > ul > li");
        pageBtn.forEach((element) =>
            element.addEventListener("click", (e) => {
                setTimeout(() => {
                    clacStats();
                    addEventToPageBtn();
                }, 500);
            })
        );
    };

    addEventToPageBtn();
    clacStats();
});

function clacStats() {
    const allEpisodes = document.querySelectorAll("#episode_list > table > tbody > tr");
    const favorite = parseInt(document.querySelector("#like_text").innerText);
    const notification = parseInt(document.querySelector("#alarm_text").innerText);
    const epiStats = [];

    allEpisodes.forEach((element, index) => {
        const node = document.querySelector("#episode_list > table > tbody > tr:nth-child(" + (1 + index * 2).toString() + ") > td.font12 > div > font > span:nth-child(2)");
        const epiStatElement = extractEpisodesStats(node);
        if (index > 0) {
            const formerView = epiStats[index - 1]["view"];
            const numSign = formerView > epiStatElement["view"] ? "-" : "+";
            const gapPercent = Math.round((Math.abs(formerView - epiStatElement["view"]) / formerView) * 100);
            node.innerHTML = node.innerHTML + '<span style="font-size:12px;color:#0000FF;">&nbsp; ' + numSign + gapPercent.toString() + "%</span>";
        }
        const commentRatio = Math.round((epiStatElement["thumup"] / epiStatElement["comment"]) * 100) / 100;
        node.innerHTML = node.innerHTML + '<span style="font-size:12px;color:#008000;">&nbsp; 댓글/좋아요: ' + commentRatio.toString() + "</span>";

        const thumupRatio = Math.round((epiStatElement["view"] / epiStatElement["thumup"]) * 100) / 100;
        node.innerHTML = node.innerHTML + '<span style="font-size:12px;color:#008000;">&nbsp; 조회수/좋아요: ' + thumupRatio.toString() + "</span>";

        const favoriteRatio = Math.round((epiStatElement["view"] / favorite) * 100);
        node.innerHTML = node.innerHTML + '<span style="font-size:12px;color:#FF0000;">&nbsp; 조회수/선작: ' + favoriteRatio.toString() + "%</span>";

        const notificationRatio = Math.round((notification / epiStatElement["view"]) * 100);
        node.innerHTML = node.innerHTML + '<span style="font-size:12px;color:#FF0000;">&nbsp; 알림/조회수: ' + notificationRatio.toString() + "%</span>";

        epiStats.push(epiStatElement);
    });

    return epiStats;
}

function extractEpisodesStats(element) {
    const regexp = /[0-9,]+/g;
    const parsed = element.innerText.match(regexp).map((e) => parseInt(e.replace(",", "")));
    const dict = {};
    dict["length"] = parsed[0];
    dict["view"] = parsed[1];
    dict["comment"] = parsed[2];
    dict["thumup"] = parsed[3];
    return dict;
}
