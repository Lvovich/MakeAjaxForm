"use strict";

/**
 * Creates request body, depending on FormData is available in window
 * @param {Object} parsedData
 * @param {Object} formData
 * @param {Object} opts
 * @returns {Object}
 */
window['MakeAjaxForm'].prototype.getExchangeData = function(parsedData, formData, opts)
{
    var res = Object.create(null);
    
    if (formData) {
        parsedData.data.forEach(function(item) {
            var dataItem = (item.fileData.length) ? item.fileData[0] : item.value;
            formData.append(item.name, dataItem);
        });

        res.boundary = '';
        res.data = formData;

    } else {
        var boundary = 'maf' + ('' + Math.random()).slice(2, 18),
            boundaryMiddle = '--' + boundary + '\r\n',
            boundaryLast = '--' + boundary + '--\r\n',
            body = ['\r\n'];

        parsedData.data.forEach(function(item) {
            if (item.fileData.length) {
                opts['onExchangeError']('file_exchange_disabled');
            } else {
                body.push('Content-Disposition: form-data; name="' + item.name + '"\r\n\r\n' + item.value + '\r\n');
            }
        });

        res.boundary = boundary;
        res.data = body.join(boundaryMiddle) + boundaryLast;
    }
    
    return res;
};
