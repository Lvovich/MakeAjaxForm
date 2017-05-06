(function (_this) {
    /**
     * Check some errors.
     *
     * @param {{data: Array, validationErrors: Array}} collectedData - собранные данные из инпутов контейнера.
     * @param {Object}                                 opts          - параметры вызова основной функции.
     *
     * @return {boolean}
     */
    _this.onBeforeExchange = function(collectedData, opts)
    {
        if (opts['onDataCollected'](collectedData) === false) {
            return false;
        }

        if (collectedData['validationErrors'].length > 0 && opts.stopOnInvalid) {
            opts['onValidationError'](collectedData['validationErrors']);
            return false;
        }

        if (opts['onStartExchange']() === false) {
            return false;
        }

        if (collectedData.data.length === 0) {
            opts['onValidationError'](['no_valid_data']);
            return false;
        }

        return true;
    };
})(window['makeAjaxForm']);
