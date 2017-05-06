(function (_this) {
    /**
     * @param {Object} opts - параметры вызова основной функции.
     *
     * @return {{data: Array, validationErrors: Array}}
     */
    _this.getCollectedData = function(opts) {
        var arrData = [],
            validationErrors = [];

        var INPUT_TYPES = ['input', 'select', 'textarea'],
            t, i, type, inputs, dataInput,
            /** @type {{valid: Array, data: Array}} */
            elementResult;

        for (t=0; t<INPUT_TYPES.length; t++) {
            type   = INPUT_TYPES[t];
            inputs = opts.container.querySelectorAll(type);

            for (i=0; i<inputs.length; i++) {
                dataInput = inputs[i];

                if (dataInput !== opts.submit && dataInput.name) {
                    elementResult = _this.actions[type](dataInput);

                    arrData = arrData.concat(elementResult.data);
                    validationErrors = validationErrors.concat(elementResult.valid);
                }
            }
        }

        return {'data': arrData, 'validationErrors': validationErrors};
    };
})(window['makeAjaxForm']);
