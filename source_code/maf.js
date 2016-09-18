window['MakeAjaxForm'] = function(opts)
{
    if (typeof this !== 'object' || this === window) {
        console.error('makeAjaxForm: incorrect call without "new". Plugin Off!');
        return {};
    }

    // Prepare params
    opts['target'] = ('' + opts['target']) || '/';

    if (!opts['container'] || !opts['submit']) {
        console.error('MakeAjaxForm: parameters "container" or "submit" is invalid. Plugin Off!');
        return {};
    }
    if (typeof opts['onBeforeExchange'] !== 'function') {
        opts['onBeforeExchange'] = function() {};
    }
    if (typeof opts['onExchangeSuccess'] !== 'function') {
        opts['onExchangeSuccess'] = function() { console.warn('MakeAjaxForm: parameter "onExchangeSuccess" is not a function') };
    }
    if (typeof opts['onExchangeError'] !== 'function') {
        opts['onExchangeError'] = function() { console.warn('MakeAjaxForm: parameter "onExchangeError" is not a function') };
    }
    if (typeof opts['onValidationError'] !== 'function') {
        opts['onValidationError'] = function() { console.warn('MakeAjaxForm: parameter "onValidationError" is not a function') };
    }

    // all right, go
    return (function (_this) {
        _this.container     = opts['container'];
        _this.submitElement = opts['submit'];

        /**
         * main cotrol function
         */
        _this.submitElement.addEventListener('click', function() {
            var xhr = new XMLHttpRequest(),
                parsedData = _this.getCollectedData(),
                checkResult = _this.onBeforeExchange(parsedData, opts);

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

            var exchangeData = _this.getExchangeData(parsedData, checkResult.formData, opts);

            if (exchangeData.boundary.length) {
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + exchangeData.boundary);
            }

            xhr.send(exchangeData.data);
        });
    })(this);
};
