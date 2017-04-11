(function (_proto) {
    /**
     * Check some errors. Return data object or false
     * @param {Object} parsedData
     * @param {Object} opts
     * @returns {boolean|Object}
     */
    _proto.onBeforeExchange = function(parsedData, opts)
    {
        var res = {};

        if (opts['onDataCollected'](parsedData) === false) {
            return false;
        }

        if (parsedData['validationErrors'].length > 0) {
            parsedData['validationErrors'].forEach(function(err) {
                opts['onValidationError'](err);
            });
            return false;
        }

        if (opts['onStartExchange']() === false) {
            return false;
        }

        if (parsedData.data.length === 0) {
            opts['onExchangeError']('no_valid_data');
            return false;
        }

        res.formData = (window.FormData) ? new FormData() : false;

        return res;
    };
})(window['MakeAjaxForm'].prototype);
