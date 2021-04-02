// ==UserScript==
// @name         UOC Login Automatic
// @namespace    http://tampermonkey.net/
// @version      0.3
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

    const iconTagGoToLoginPage = '.icon--campus';
    const loginPage = {
        usernameHandler: '#username',
        passwordHandler: '#password',
        submitLoginHandler: '#fm1',
        submitButton: '#submitButton'
    };

    function redirectToLoginPage() {
        if ($(iconTagGoToLoginPage)) {
            $(iconTagGoToLoginPage).click();
        }
    };

    function handleLoginPage() {
        let btn = document.querySelector('#submitButton');

        let clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            clientX: 150,
            clientY: 150
        });
        btn.dispatchEvent(clickEvent);
    }

    function handleLoginPageObsolete() {
        //Cookies.remove("timesRetried");
        let timesRetried = Cookies.get("timesRetried") || 0;

        if ($(loginPage.usernameHandler) && $(loginPage.submitLoginHandler)) {

            if (timesRetried > MAX_TRIES_LOGIN) {
                return;
            }

            //             $(loginPage.submitLoginHandler).focus();
            //             $(loginPage.submitLoginHandler).click();
            //$(loginPage.usernameHandler).focus();
            return;

            setTimeout(() => {

                var inThirtySec = new Date(new Date().getTime() + 30 * 1000);
                Cookies.set("timesRetried", ++timesRetried, { expires: inThirtySec });


                document.addEventListener('keydown', function (event) {
                    console.log("capturing keydown enter: " + event.which);
                });

                //sending enter keycode = 13
                var evt = new KeyboardEvent('keydown', { 'keyCode': 13, 'which': 13 });
                document.dispatchEvent(evt);

                const id = loginPage.submitLoginHandler.substring(1, 1000);
                document.getElementById(id).submit();

                /*
                console.log(Cookies.get("timesRetried"));
                //$x('//button[contains(.,"Entra")]')[0].click();

                if (timesRetried % 2 == 0){
                    console.log('submitting submitLoginHandler');
                    $(loginPage.submitLoginHandler).submit();
                }else{
                    console.log('clicking submitButton');
                    $(loginPage.submitButton).click();
                }
                */
            }, 3000 * (1 + timesRetried));
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