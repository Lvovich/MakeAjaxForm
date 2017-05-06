(function (_this) {
    /**
     * Contains an actions for the form elements types.
     *
     * @type {Object}
     */
    _this.actions = {};

    /** ----------------------------------------------------------------------------------------------------------------
     * @param {Element} el
     *
     * @return {{valid: Array, data: Array}}
     */
    _this.actions['input'] = function (el) {
        var data = [], valid = [];

        if (el.hasAttribute('required') && (!el.value || el.disabled)) {
            valid.push(_this.validationErrorItem(el, 'required_wo_value'));

        }
        else if (el.type === 'checkbox' || el.type === 'radio') {
            if (el.checked) {
                data.push(_this.dataItem(el));
            } else if (el.hasAttribute('required')) {
                valid.push(_this.validationErrorItem(el, 'required_wo_check'));
            }

        }
        else {
            data.push(_this.dataItem(el));
        }

        return {data: data, valid: valid}
    };

    /** ----------------------------------------------------------------------------------------------------------------
     * @param {Element} el
     *
     * @return {{valid: Array, data: Array}}
     */
    _this.actions['select'] = function (el) {
        var data =[], valid = [],
            i;

        if (!el.disabled) {
            for (i=0; i<el.options.length; i++) {
                var option = el.options[i];

                if (!option.disabled && option.selected && option.value) {
                    data.push(_this.dataItem(el))
                }
            }

            if (el.hasAttribute('required') && !data.length) {
                valid.push(_this.validationErrorItem(el, 'required_wo_check'));
            }
        }

        return {data: data, valid: valid}
    };

    /** ----------------------------------------------------------------------------------------------------------------
     * @param {Element} el
     *
     * @return {{valid: Array, data: Array}}
     */
    _this.actions['textarea'] = function (el) {
        var data =[], valid = [];

        if (el.hasAttribute('required') && (!el.value || el.disabled)) {
            valid.push(_this.validationErrorItem(el, 'required_wo_value'));
        }
        else {
            data.push(_this.dataItem(el));
        }

        return {data: data, valid: valid}
    };
})(window['makeAjaxForm']);
