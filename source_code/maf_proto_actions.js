(function (_proto) {
    /**
     * creates a validation error
     * @param {Object} el
     * @param {string} type
     * @returns {Object}
     */
    var validationErrorItem = function(el, type) {
        return {
            'element' : el,
            'type'    : type
        };
    };

    /**
     * creates a data item
     * @param {Object} el
     * @returns {Object}
     */
    var dataItem = function(el) {
        return {
            'element'  : el,
            'fileData' : el.files || []
        };
    };

    /**
     * Contains the actions for form elements types
     */
    _proto.actions = {};

    /**
     *
     * @param {Object} el
     * @returns {{valid: Array, data: Array}}
     */
    _proto.actions['input'] = function(el) {
        var data = [], valid = [];

        if (el.hasAttribute('required') && (!el.value || el.disabled)) {
            valid.push(validationErrorItem(el, 'required_wo_value'));

        } else if (el.type === 'checkbox' || el.type === 'radio') {
            if (el.checked) {
                data.push(dataItem(el));
            } else if (el.hasAttribute('required')) {
                valid.push(validationErrorItem(el, 'required_wo_check'));
            }

        } else if (el.type === 'file') {
            data.push(dataItem(el));

        } else {
            data.push(dataItem(el));
        }

        return {data: data, valid: valid}
    };

    /**
     *
     * @param {Object} el
     * @returns {{valid: Array, data: Array}}
     */
    _proto.actions['select'] = function(el) {
        var data =[], valid = [];

        if (!el.disabled) {
            for (var i=0, l=el.options.length; i<l; i++) {
                var option = el.options[i];

                if (!option.disabled && option.selected && option.value) {
                    data.push(dataItem(el))
                }
            }

            if (el.hasAttribute('required') && !data.length) {
                valid.push(validationErrorItem(el, 'required_wo_check'));
            }
        }

        return {data: data, valid: valid}
    };

    /**
     *
     * @param {Object} el
     * @returns {{valid: Array, data: Array}}
     */
    _proto.actions['textarea'] = function(el) {
        var data =[], valid = [];

        if (el.hasAttribute('required') && (!el.value || el.disabled)) {
            valid.push(validationErrorItem(el, 'required_wo_value'));
        } else {
            data.push(dataItem(el));
        }

        return {data: data, valid: valid}
    };
})(window['MakeAjaxForm'].prototype);
