(function (_proto) {
    /**
     * Check some errors. Return data object or false
     * @param {Object} parsedData
     * @param {Object} opts
     * @returns {boolean|Object}
     */
    _proto.onBeforeExchange = function(parsedData, opts)
    {
        var res = {},
            i, L;

        if (opts['onDataCollected'](parsedData) === false) {
            return false;
        }

        if (parsedData['validationErrors'].length > 0) {
            for (i=0, L=parsedData['validationErrors'].length; i<L; i++) {
                opts['onValidationError'](parsedData['validationErrors'][i]);
            }
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
