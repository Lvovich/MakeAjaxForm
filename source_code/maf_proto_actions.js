"use strict";

/**
 * Contains the actions for form elements types
 * @type {Object}
 */
window['MakeAjaxForm'].prototype.actions = Object.create(null);

/**
 * creates a validation error
 * @param {Object} el
 * @param {string} type
 * @returns {Object}
 */
window['MakeAjaxForm'].prototype.actions.validationErrorItem = function(el, type) {
    var res = Object.create(null);
    res.element = el;
    res.type = type;
    return res;
};

/**
 * creates a data item
 * @param {string} name
 * @param {string} value
 * @param {Object} fileData
 * @returns {Object}
 */
window['MakeAjaxForm'].prototype.actions.dataItem = function(name, value, fileData) {
    fileData = fileData || [];

    var res = Object.create(null);
    res.name = name;
    res.value = value;
    res.fileData = fileData;
    return res;
};

/**
 *  
 * @param {Object} el
 * @returns {{valid: Array, data: Array}}
 */
window['MakeAjaxForm'].prototype.actions['input'] = function(el) {
    var data =[], valid = [];

    if (!el.value) {
        if (el.hasAttribute('required')) {
            valid.push(this.validationErrorItem(el, 'required_wo_value'));
        }

    } else if (el.type === 'checkbox' || el.type === 'radio') {
        if (el.checked) {
            data.push(this.dataItem(el.name, el.value));
        } else if (el.hasAttribute('required')) {
            /** TODO for type=radio: need iterate all inputs with some name and check at least one of them has checked
             * here we check, if only that input checked (for example 'I accept rules' or 'I not accept')
             */
            valid.push(this.validationErrorItem(el, 'required_wo_check'));
        }

    } else if (el.type === 'file') {
        data.push(this.dataItem(el.name, el.value, el.files));

    } else {
        data.push(this.dataItem(el.name, el.value));
    }

    return {data: data, valid: valid}
};

/**
 *
 * @param {Object} el
 * @returns {{valid: Array, data: Array}}
 */
window['MakeAjaxForm'].prototype.actions['select'] = function(el) {
    var data =[], valid = [];
    
    for (var i=0, l=el.options.length; i<l; i++) {
        var option = el.options[i];

        if (!option.disabled && option.selected && option.value) {
            data.push(this.dataItem(el.name, option.value))
        }
    }

    if (el.hasAttribute('required') && !data.length) {
        valid.push(this.validationErrorItem(el, 'required_wo_check'));
    }

    return {data: data, valid: valid}
};

/**
 *
 * @param {Object} el
 * @returns {{valid: Array, data: Array}}
 */
window['MakeAjaxForm'].prototype.actions['textarea'] = function(el) {
    var data =[], valid = [];

    if (!el.value) {
        if (el.hasAttribute('required')) {
            valid.push(this.validationErrorItem(el, 'required_wo_value'));
        }
    } else {
        data.push(this.dataItem(el.name, el.value));
    }

    return {data: data, valid: valid}
};
