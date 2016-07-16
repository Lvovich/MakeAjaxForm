"use strict";

/**
 * Check some errors. Return data object or false
 * @param {Object} parsedData
 * @param {Object} opts
 * @returns {boolean|Object}
 */
window['MakeAjaxForm'].prototype.onBeforeExchange = function(parsedData, opts)
{
    var res = Object.create(null);

    if (opts['onBeforeExchange'](parsedData) === false) {
        return false;
    }

    if (parsedData['validationErrors'].length > 0) {
        parsedData['validationErrors'].forEach(function(err) {
            opts['onValidationError'](err);
        });
        return false;
    }

    if (parsedData.data.length === 0) {
        opts['onExchangeError']('no_valid_data');
        return false;
    }

    res.formData = (window.FormData) ? new FormData() : false;
    
    return res;
};