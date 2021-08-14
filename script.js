// ==UserScript==
// @name         UOC Login Automatic
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Automatització login
// @author       You
// // @require		http://code.jquery.com/jquery-latest.js
// // @require     https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js
// @match       https://*.uoc.edu/*
// // @match        https://www.uoc.edu/portal/*.html
// @run-at  document-end
// @grant        none
// ==/UserScript==

/* global $ Cookies */
(() => {
    'use strict';

    const MAX_TRIES_LOGIN = 3;

    const loginPage = {
        usernameId: 'username',
        passwordId: 'password',
        formId: 'fm1',
        submitButtonId: 'submitButton'
    };

    function redirectToLoginPage() {
        const iconTagGoToLoginPage = '.icon--campus';
        if ($(iconTagGoToLoginPage)) {
            $(iconTagGoToLoginPage).click();
        }
    }

    function handleLoginPage() {
        document.getElementById(loginPage.usernameId).focus();

        setTimeout(() => {
            document.getElementById(loginPage.passwordId).focus();
        }, 500);

        setTimeout(() => {
            console.log('submit');
            document.getElementById(loginPage.formId).submit();
        }, 1000);

        //console.log('handleLoginPage ');
        //var submit = document.evaluate('//*[@id="submitButton"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
        //submit.singleNodeValue.click();

        /*
        // not working
        let btn = document.querySelector('#submitButton');

        let clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            //             clientX: 150,
            //             clientY: 150
        });
        btn.dispatchEvent(clickEvent);
        */
    }

    function mainRouter() {
        const thisUrl = document.location.href;

        if (thisUrl.includes('portal') && thisUrl.includes('index')) {
            redirectToLoginPage();
        }

        if (thisUrl.includes('login')) {
            handleLoginPage();
        }
        console.log(thisUrl);
    }

    mainRouter();

})();


/*
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

        }, 3000 * (1 + timesRetried));
    }
}
*/