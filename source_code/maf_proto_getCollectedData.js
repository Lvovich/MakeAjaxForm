(function (_proto) {
    /**
     * @returns {{data: Array, validationErrors: Array}}
     */
    _proto.getCollectedData = function()
    {
        var arrData = [],
            validationErrors = [];

        var INPUT_TYPES = ['input', 'select', 'textarea'];

        (function ($CONT) {
            INPUT_TYPES.forEach(function(type) {
                if (!(type in $CONT.actions)) return;

                var dataSet = $CONT.container.querySelectorAll(type);

                for (var i=0, l=dataSet.length; i<l; i++) {
                    var element = dataSet[i];

                    if (element !== $CONT.submitElement && element.name) {
                        var elementResult = $CONT.actions[type](element);

                        arrData = arrData.concat(elementResult.data);
                        validationErrors = validationErrors.concat(elementResult.valid);
                    }
                }
            });
        })(this);

        return {'data': arrData, 'validationErrors': validationErrors};
    };
})(window['MakeAjaxForm'].prototype);
