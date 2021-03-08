// ==UserScript==
// @name         UOC Login Automatic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatització login
// @author       You
// @require		http://code.jquery.com/jquery-2.1.0.min.js
// @match       https://www.uoc.edu/*
// // @match        https://www.uoc.edu/portal/*.html
// @run-at  document-end
// @grant        none
// ==/UserScript==

(() =>{
    'use strict';

    const iconTagGoToLoginPage = '.icon--campus';
    const loginPage = {
        usernameHandler: '#username',
        submitLoginHandler: '#submitButton'
    };

    var curPages, iPage;

    function doCourse(){
        curPages = $('#LoadFrame > div > div.pagination > div').children().length;
        iPage = 1;
        var autoclickInterval = setInterval( ()=>{
            $('#LoadFrame > div > div.pagination > span.button-page.right > a > img.web-arrow').click();
            console.log(iPage, curPages);
            if (++iPage >= curPages){
                clearInterval(autoclickInterval);
            }
        } , 3000);
    };

    redirectToLoginPage: ()=>{

    };

    handleLoginPage: ()=>{
        if ($(loginPage.usernameHandler) && $(loginPage.submitLoginHandler)){
            console.log('found username and submit input');
            $(loginPage.submitLoginHandler).click();
        }
    };


})();