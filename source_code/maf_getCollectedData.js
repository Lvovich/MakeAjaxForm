(function (_this) {
    /**
     * @param {Object} opts - параметры вызова основной функции.
     *
     * @return {Array}
     */
    _this.getCollectedData = function(opts) {
        var INPUT_TYPES = ['input', 'select', 'textarea'];

        var arrData = [],
            t, i, type, inputs;

        for (t=0; t<INPUT_TYPES.length; t++) {
            type   = INPUT_TYPES[t];
            inputs = opts.container.getElementsByTagName(type);

            for (i=0; i<inputs.length; i++) {
                if (inputs[i] !== opts.submit && inputs[i].name) {
                    arrData = arrData.concat(_this.actions[type](inputs[i]));
                }
            }
        }

        return arrData;
    };
})(window['makeAjaxForm']);
