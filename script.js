// ==UserScript==
// @name         UOC Login Automatic
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automatització login
// @author       You
// @require		http://code.jquery.com/jquery-latest.js
// @require     https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js
// @match       https://*.uoc.edu/*
// // @match        https://www.uoc.edu/portal/*.html
// @run-at  document-end
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const MAX_TRIES_LOGIN = 3;
    
    alert('updated from github');

    const iconTagGoToLoginPage = '.icon--campus';
    const loginPage = {
        usernameHandler: '#username',
        passwordHandler: '#password',
        submitLoginHandler: '#fm1'
    };

    function redirectToLoginPage () {
        if ($(iconTagGoToLoginPage)) {
            $(iconTagGoToLoginPage).click();
        }
    };

    function handleLoginPage () {
        //Cookies.remove("timesRetried");
        let timesRetried = Cookies.get("timesRetried") || 0;

        //console.log(timesRetried);

        if ($(loginPage.usernameHandler) && $(loginPage.submitLoginHandler)) {

            if (timesRetried > MAX_TRIES_LOGIN){
                return;
            }
            setTimeout(()=>{
                var inThirtySec = new Date(new Date().getTime() + 30 * 1000);
                Cookies.set("timesRetried", ++timesRetried, {expires: inThirtySec});

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
