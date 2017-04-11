(function (_proto) {
    /**
     * Creates request body, depending on FormData is available in window
     * @param {Object} parsedData
     * @param {Object} formData
     * @param {Object} opts
     * @returns {Object}
     */
    _proto.getExchangeData = function(parsedData, formData, opts)
    {
        var res = {},
            i, L, item, dataItem;

        if (formData) {
            for (i=0, L=parsedData.data.length; i<L; i++) {
                item = parsedData.data[i];

                dataItem = (item['fileData'].length) ? item['fileData'][0] : item['element'].value;
                formData.append(item['element'].name, dataItem);
            }

            res.boundary = '';
            res.data = formData;

        } else {
            var boundary = 'maf' + ('' + Math.random()).slice(2, 18),
                boundaryMiddle = '--' + boundary + '\r\n',
                boundaryLast = '--' + boundary + '--\r\n',
                body = ['\r\n'];

            for (i=0, L=parsedData.data.length; i<L; i++) {
                item = parsedData.data[i];

                if (item['fileData'].length) {
                    opts['onExchangeError']('file_exchange_disabled');
                } else {
                    body.push(
                        'Content-Disposition: form-data; name="' + item['element'].name +
                        '"\r\n\r\n' + item['element'].value +
                        '\r\n'
                    );
                }
            }

            res.boundary = boundary;
            res.data = body.join(boundaryMiddle) + boundaryLast;
        }

        return res;
    };
})(window['MakeAjaxForm'].prototype);
