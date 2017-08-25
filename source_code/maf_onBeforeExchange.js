(function (_this) {
    /**
     * Check some errors.
     *
     * @param {Array}  collectedData - собранные данные из инпутов контейнера.
     * @param {Object} opts          - параметры вызова основной функции.
     *
     * @return {boolean}
     */
    _this.onBeforeExchange = function(collectedData, opts)
    {
        if (collectedData.length === 0) {
            opts['onExchangeError'](['Collected no valid data.']);
            return false;
        }

        return (opts['onDataCollected'](collectedData) !== false) && (opts['onStartExchange']() !== false);
    };
})(window['makeAjaxForm']);
