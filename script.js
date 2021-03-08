// ==UserScript==
// @name         UOC Login Automatic
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatització login
// @author       You
// @require		http://code.jquery.com/jquery-2.1.0.min.js
// @match       https://*.uoc.edu/*
// // @match        https://www.uoc.edu/portal/*.html
// @run-at  document-end
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const iconTagGoToLoginPage = '.icon--campus';
    const loginPage = {
        usernameHandler: '#username',
        passwordHandler: '#password',
        submitLoginHandler: '#fm1'
    };

    function redirectToLoginPage() {
        if ($(iconTagGoToLoginPage)) {
            $(iconTagGoToLoginPage).click();
        }
    };

    function handleLoginPage() {
        if ($(loginPage.usernameHandler) && $(loginPage.submitLoginHandler)) {

            setTimeout(() => {
                $(loginPage.submitLoginHandler).submit();
            }, 3000);
        }
    }

    const thisUrl = document.location.href;

    if (thisUrl.includes('portal') && thisUrl.includes('index')) {
        redirectToLoginPage();
    }

    if (thisUrl.includes('login')) {
        handleLoginPage();
    }

})();