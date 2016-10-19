(function (_proto) {
    /**
     * creates a validation error
     * @param {Object} el
     * @param {string} type
     * @returns {Object}
     */
    var validationErrorItem = function(el, type) {
        var res = Object.create(null);
        res.element = el;
        res.type = type;
        return res;
    };

    /**
     * creates a data item
     * @param {string} name
     * @param {string} value
     * @param {FileList|Array} fileData
     * @returns {Object}
     */
    var dataItem = function(name, value, fileData) {
        fileData = fileData || [];

        var res = Object.create(null);
        res.name = name;
        res.value = value;
        res.fileData = fileData;
        return res;
    };

    /**
     * Contains the actions for form elements types
     */
    _proto.actions = Object.create(null);

    /**
     *
     * @param {Object} el
     * @returns {{valid: Array, data: Array}}
     */
    _proto.actions['input'] = function(el) {
        var data = [], valid = [];

        if (!el.value || el.disabled) {
            if (el.hasAttribute('required')) {
                valid.push(validationErrorItem(el, 'required_wo_value'));
            }

        } else if (el.type === 'checkbox' || el.type === 'radio') {
            if (el.checked) {
                data.push(dataItem(el.name, el.value, []));
            } else if (el.hasAttribute('required')) {
                /**
                 * TODO for type=radio: need iterate all inputs with some name and check at least one of them has
                 * checked.
                 * Here we check, if only that input checked (for example 'I accept rules' or 'I do not accept')
                 */
                valid.push(validationErrorItem(el, 'required_wo_check'));
            }

        } else if (el.type === 'file') {
            data.push(dataItem(el.name, el.value, el.files));

        } else {
            data.push(dataItem(el.name, el.value, []));
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
                    data.push(dataItem(el.name, option.value, []))
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

        if (!el.value || el.disabled) {
            if (el.hasAttribute('required')) {
                valid.push(validationErrorItem(el, 'required_wo_value'));
            }
        } else {
            data.push(dataItem(el.name, el.value, []));
        }

        return {data: data, valid: valid}
    };
})(window['MakeAjaxForm'].prototype);
