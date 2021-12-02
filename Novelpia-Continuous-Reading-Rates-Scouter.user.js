// ==UserScript==
// @name         노벨피아 연독률 측정
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://novelpia.com/novel/*
// @icon         https://www.google.com/s2/favicons?domain=novelpia.com
// @grant        none
// ==/UserScript==

window.addEventListener('load', (event) => {
//body > div:nth-child(29) > div.am-mainpanel:nth-child(16) > div.s_inv:nth-child(2) > table#episode_list_box:nth-child(2) > tbody > tr:nth-child(3) > td > div#episode_list:nth-child(2) > table:nth-child(1)
//body > div:nth-child(29) > div.am-mainpanel:nth-child(16) > div.s_inv:nth-child(2) > table#episode_list_box:nth-child(2) > tbody > tr:nth-child(3) > td > div#episode_list:nth-child(2) > table:nth-child(1) > tbody > tr.ep_style5:nth-child(1+2n) > td.font12:nth-child(2) > div.ep_style2:nth-child(3) > font.font11 > span:nth-child(2)
    
alert('load');
});