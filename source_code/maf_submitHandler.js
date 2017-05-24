(function (_this) {
    /**
     * Обработчик клика на отправляющий элемент псевдоформы.
     * Контекст вызова this - объект, содержащий параметры вызова основной функции.
     */
    _this.submitHandler = function() {
        var xhr = new XMLHttpRequest(),
            opts = this.opts,
            collectedData = _this.getCollectedData(opts);

        if (!_this.onBeforeExchange(collectedData, opts)) {
            return;
        }

        var ajaxTimeout = setTimeout(function() {
            xhr.abort();
            opts['onExchangeError']('No server response for a long times. Exchange aborted.');
        }, opts.waitingtime * 1000);

        xhr.open('post', opts.target, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                clearTimeout(ajaxTimeout);

                if (xhr.status === 200)
                    opts['onExchangeSuccess'](xhr.responseText);
                else
                    opts['onExchangeError'](xhr.status + ': ' + xhr.statusText);
            }
        };

        var exchangeData = _this.getExchangeData(collectedData);

        if (exchangeData.boundary.length) {
            xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + exchangeData.boundary);
        }

        xhr.send(exchangeData.data);
    };
})(window['makeAjaxForm']);
