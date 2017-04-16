window['MakeAjaxForm'] = function(opts)
{
    if (typeof this !== 'object' || this === window) {
        console.error('makeAjaxForm: incorrect call without "new". Plugin Off!');
        return {};
    }

    // Prepare params
    opts['target'] = ('' + opts['target']) || '/';
    opts['waitingtime'] = !!(+opts['waitingtime']) ? +opts['waitingtime'] : 3600;

    if (!opts['container'] || !opts['submit']) {
        console.error('MakeAjaxForm: parameters "container" or "submit" is invalid. Plugin Off!');
        return {};
    }
    if (typeof opts['onDataCollected'] !== 'function') {
        opts['onDataCollected'] = function() {};
    }
    if (typeof opts['onValidationError'] !== 'function') {
        opts['onValidationError'] = function() {};
    }
    if (typeof opts['onStartExchange'] !== 'function') {
        opts['onStartExchange'] = function() {};
    }
    if (typeof opts['onExchangeError'] !== 'function') {
        opts['onExchangeError'] = function() {};
    }
    if (typeof opts['onExchangeSuccess'] !== 'function') {
        opts['onExchangeSuccess'] = function() {};
    }

    // all right, go
    return (function (_this) {
        _this.container     = opts['container'];
        _this.submitElement = opts['submit'];

        var submitHandler = function () {
            var xhr = new XMLHttpRequest(),
                parsedData = _this.getCollectedData();

            if (!_this.onBeforeExchange(parsedData, opts)) {
                return false;
            }

            var ajaxTimeout = setTimeout(function() {
                xhr.abort();
                opts['onExchangeError']('No server response for a long times. Exchange aborted. Try to reload the page.');
            }, opts['waitingtime'] * 1000);

            xhr.open('post', opts['target'], true);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    clearTimeout(ajaxTimeout);

                    if (xhr.status === 200)
                        opts['onExchangeSuccess'](xhr.responseText);
                    else
                        opts['onExchangeError'](xhr.status + ': ' + xhr.statusText);
                }
            };

            var exchangeData = _this.getExchangeData(parsedData, opts);

            if (exchangeData.boundary.length) {
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + exchangeData.boundary);
            }

            xhr.send(exchangeData.data);
        };

        // IE8 compatibility
        if (_this.submitElement.addEventListener) {
            _this.submitElement.addEventListener('click', submitHandler);
        }
        else if (_this.submitElement.attachEvent) {
            _this.submitElement.attachEvent('onclick', submitHandler);
        }
    })(this);
};
