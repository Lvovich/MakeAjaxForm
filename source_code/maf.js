window['MakeAjaxForm'] = function(opts)
{
    if (typeof this !== 'object' || this === window) {
        console.error('makeAjaxForm: incorrect call without "new". Plugin Off!');
        return {};
    }

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

    /**
     * to exclude dangerous use of the this object wrap it
     */
    return (function (_func, _this) {
        _this.container     = document.querySelector(opts['container']);
        _this.submitElement = document.querySelector(opts['submit']);

        if (!_this.container || !_this.submitElement) {
            console.error('makeAjaxForm: parameters "container" or "submit" is invalid. Plugin Off!');
            return {};
        }

        /**
         * main cotrol function
         */
        _this.submitElement.addEventListener('click', function() {

            var xhr = new XMLHttpRequest(),
                parsedData = _func.getCollectedData(_this),
                checkResult = _func.onBeforeExchange(parsedData, opts);

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

            var exchangeData = _func.getExchangeData(parsedData, checkResult.formData, opts);

            if (exchangeData.boundary.length) {
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + exchangeData.boundary);
            }

            xhr.send(exchangeData.data);

        });
    })(window['MakeAjaxForm'], this);
};
