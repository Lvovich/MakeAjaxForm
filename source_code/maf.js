"use strict";

window['MakeAjaxForm'] = function(opts)
{
    (function prepareParams() {
        opts['container'] = ('' + opts['container']) || '.eff422e211a0627cfeb1dcc88e75b314146';
        opts['submit'] =    ('' + opts['submit'])    || '.eff422e211a0627cfeb1dcc88e75b314146';
        opts['target'] =    ('' + opts['target'])    || '/';

        if (typeof opts['onBeforeExchange'] !== 'function') {
            opts['onBeforeExchange'] = function() {};
        }
        if (typeof opts['onExchangeSuccess'] !== 'function') {
            opts['onExchangeSuccess'] = function() { console.warn('makeAjaxForm: parameter "onExchangeSuccess" is not a function') };
        }
        if (typeof opts['onExchangeError'] !== 'function') {
            opts['onExchangeError'] = function() { console.warn('makeAjaxForm: parameter "onExchangeError" is not a function') };
        }
        if (typeof opts['onValidationError'] !== 'function') {
            opts['onValidationError'] = function() { console.warn('makeAjaxForm: parameter "onValidationError" is not a function') };
        }
    })();

    this.container     = document.querySelector(opts['container']);
    this.submitElement = document.querySelector(opts['submit']);

    if (!this.container || !this.submitElement) {
        console.error('makeAjaxForm: parameters "container" or "submit" is invalid. Plugin Off!');
        return false;
    }

    var CONTEXT = this; // сохраняем контекст объекта в замыкании. Только так он будет доступен в следующей функции
    
    /** ----------------------------------------------------------------------------------------------------------------
     * main control function
     */
    this.submitElement.addEventListener('click', function() {

        var xhr = new XMLHttpRequest(),
            parsedData = CONTEXT.getCollectedData(CONTEXT),
            checkResult = CONTEXT.onBeforeExchange(parsedData, opts);
        
        if (checkResult === false) return false;

        var ajaxTimeout = setTimeout(function() {
            xhr.abort();
            opts['onExchangeError']('No server response for a long times. Exchange aborted. Try to reload the page.');
        }, 30000);

        xhr.open('post', opts['target'], true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                clearTimeout(ajaxTimeout);

                if (xhr.status == 200)
                    opts['onExchangeSuccess'](xhr.responseText);
                else
                    opts['onExchangeError'](xhr.status + ': ' + xhr.statusText);
            }
        };

        var exchangeData = CONTEXT.getExchangeData(parsedData, checkResult.formData, opts);

        if (exchangeData.boundary.length) {
            xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + exchangeData.boundary);
        }

        xhr.send(exchangeData.data);
        
    });
};
