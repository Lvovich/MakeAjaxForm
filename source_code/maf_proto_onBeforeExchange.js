(function (_proto) {
    /**
     * Check some errors. Return data object or false
     * @param {Object} parsedData
     * @param {Object} opts
     *
     * @return {boolean|Object}
     */
    _proto.onBeforeExchange = function(parsedData, opts)
    {
        if (opts['onDataCollected'](parsedData) === false) {
            return false;
        }

        if (parsedData['validationErrors'].length > 0) {
            opts['onValidationError'](parsedData['validationErrors']);
            return false;
        }

        if (opts['onStartExchange']() === false) {
            return false;
        }

        if (parsedData.data.length === 0) {
            opts['onExchangeError']('no_valid_data');
            return false;
        }

        return true;
    };
})(window['MakeAjaxForm'].prototype);
