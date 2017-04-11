(function (_proto) {
    /**
     * @returns {{data: Array, validationErrors: Array}}
     */
    _proto.getCollectedData = function()
    {
        var arrData = [],
            validationErrors = [];

        var INPUT_TYPES = ['input', 'select', 'textarea'],
            t, L, i, l, type, element, elementResult;

        (function ($CONT) {
            for (t=0, L=INPUT_TYPES.length; t<L; t++) {
                type = INPUT_TYPES[t];

                var dataSet = $CONT.container.querySelectorAll(type);

                for (i=0, l=dataSet.length; i<l; i++) {
                    element = dataSet[i];

                    if (element !== $CONT.submitElement && element.name) {
                        elementResult = $CONT.actions[type](element);

                        arrData = arrData.concat(elementResult.data);
                        validationErrors = validationErrors.concat(elementResult.valid);
                    }
                }
            }
        })(this);

        return {'data': arrData, 'validationErrors': validationErrors};
    };
})(window['MakeAjaxForm'].prototype);
