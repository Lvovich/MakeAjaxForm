(function (_this) {
    /**
     * Creates request body, depending on FormData is available in window.
     *
     * @param {Array}  collectedData - собранные данные из инпутов контейнера.
     *
     * @return {{boundary:string, data:(window.FormData|boolean|string)}}
     */
    _this.getExchangeData = function(collectedData)
    {
        var res = {},
            fd = (window.FormData ? new window.FormData : false),
            i, item, itemValue;

        if (fd) {
            for (i=0; i<collectedData.length; i++) {
                item = collectedData[i];

                itemValue = (item['fileData'].length) ? item['fileData'][0] : item['value'];
                fd.append(item['element'].name, itemValue);
            }

            res.boundary = '';
            res.data = fd;

        }
        else {
            var boundary = 'maf' + ('' + Math.random()).slice(2, 18),
                boundaryMiddle = '--' + boundary + '\r\n',
                boundaryLast = '--' + boundary + '--\r\n',
                body = ['\r\n'];

            for (i=0; i<collectedData.length; i++) {
                item = collectedData[i];

                body.push(
                    'Content-Disposition: form-data; name="' + item['element'].name +
                    '"\r\n\r\n' + item['value'] + '\r\n'
                );
            }

            res.boundary = boundary;
            res.data = body.join(boundaryMiddle) + boundaryLast;
        }

        return res;
    };
})(window['makeAjaxForm']);
