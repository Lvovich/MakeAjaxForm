"use strict";

/**
 * 
 * @returns {{data: Array, validationErrors: Array}}
 */
window['MakeAjaxForm'].prototype.getCollectedData = function(CONTEXT)
{
    var arrData = [],
        validationErrors = [];

    var INPUT_TYPES = ['input', 'select', 'textarea'];

    INPUT_TYPES.forEach(function(type) {
        if (!(type in CONTEXT.actions)) return;

        var dataSet = CONTEXT.container.querySelectorAll(type);

        for (var i=0, l=dataSet.length; i<l; i++) {
            var element = dataSet[i];

            if (element !== CONTEXT.submitElement && element.name) {
                var elementResult = CONTEXT.actions[type](element);

                arrData = arrData.concat(elementResult.data);
                validationErrors = validationErrors.concat(elementResult.valid);
            }
        }
    });

    return {data: arrData, validationErrors: validationErrors};
};