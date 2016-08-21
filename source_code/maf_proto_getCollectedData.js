(function (_func) {
    /**
     *
     * @returns {{data: Array, validationErrors: Array}}
     */
    _func.getCollectedData = function(_this)
    {
        var arrData = [],
            validationErrors = [];

        var INPUT_TYPES = ['input', 'select', 'textarea'];

        INPUT_TYPES.forEach(function(type) {
            if (!(type in _func.actions)) return;

            var dataSet = _this.container.querySelectorAll(type);

            for (var i=0, l=dataSet.length; i<l; i++) {
                var element = dataSet[i];

                if (element !== _this.submitElement && element.name) {
                    var elementResult = _func.actions[type](element);

                    arrData = arrData.concat(elementResult.data);
                    validationErrors = validationErrors.concat(elementResult.valid);
                }
            }
        });

        return {'data': arrData, 'validationErrors': validationErrors};
    };
})(window['MakeAjaxForm']);
