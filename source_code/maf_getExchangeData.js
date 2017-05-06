(function (_this) {
    /**
     * Creates request body, depending on FormData is available in window.
     *
     * @param {{data: Array, validationErrors: Array}} collectedData - собранные данные из инпутов контейнера.
     * @param {Object}                                 opts          - параметры вызова основной функции.
     *
     * @return {{boundary:string, data:(window.FormData|boolean|string)}}
     */
    _this.getExchangeData = function(collectedData, opts)
    {
        var res = {},
            fd = (window.FormData ? new window.FormData : false),
            i, item, dataItem;

        if (fd) {
            for (i=0; i<collectedData.data.length; i++) {
                item = collectedData.data[i];

                dataItem = (item['fileData'].length) ? item['fileData'][0] : item['element'].value;
                fd.append(item['element'].name, dataItem);
            }

            res.boundary = '';
            res.data = fd;

        }
        else {
            var boundary = 'maf' + ('' + Math.random()).slice(2, 18),
                boundaryMiddle = '--' + boundary + '\r\n',
                /** @type {string} */
                boundaryLast = '--' + boundary + '--\r\n',
                /** @type {Array} */
                body = ['\r\n'];

            for (i=0; i<collectedData.data.length; i++) {
                item = collectedData.data[i];

                if (item['fileData'].length) {
                    opts['onExchangeError']('file_exchange_impossible');
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
})(window['makeAjaxForm']);
