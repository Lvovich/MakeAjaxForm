/**
 * helpers
 */
(function (_this) {
    /**
     * Объединяет два объекта в один так, что в результате есть только свойства a со значениями b
     * (если в b есть ключ из a).
     * Если передан список типов, проверяет соответствие значения из b этому типу.
     *
     * @param {!Object} a
     * @param {Object}  b
     * @param {?Object} types
     *
     * @return {Object}
     */
    _this.obMerge = function (a, b, types) {
        var c = {};

        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                if (key in types) {
                    c[key] = (key in b) && (typeof b[key] === types[key]) ? b[key] : a[key];
                }
                else {
                    c[key] = key in b ? b[key] : a[key];
                }
            }
        }

        return c;
    }; // -END- function obMerge()

    /** ----------------------------------------------------------------------------------------------------------------
     * Create a validation error
     *
     * @param {Object} el
     * @param {string} type
     *
     * @return {Object}
     */
    _this.validationErrorItem = function(el, type) {
        return {
            'element' : el,
            'type'    : type
        };
    };

    /** ----------------------------------------------------------------------------------------------------------------
     * Create a data item
     *
     * @param {Object} el
     *
     * @return {Object}
     */
    _this.dataItem = function(el) {
        return {
            'element'  : el,
            'fileData' : el.files || []
        };
    };

    /** ----------------------------------------------------------------------------------------------------------------
     * Назначает обработчик события, с учетом что в ИЕ8- не поддерживается addEventListener.
     * Позволяет использовать конструкции обработчиков вида {handleEvent:function, param1:parametr, param2:parametr...}
     *
     * @param {Element|Node|Window} elem    - элемент, на который надо повесить обработчик.
     * @param {string}              event   - тип события.
     * @param                       handler - обработчик события.
     */
    _this.setEventListener = function (elem, event, handler)
    {
        if (elem.addEventListener) {
            elem.addEventListener(event, handler);

        } else if (elem.attachEvent) {
            var handleWrapper = handler;

            if (handler.handleEvent) {
                handleWrapper = function () {
                    handler.handleEvent.call(handler);
                };
            }

            elem.attachEvent('on' + event, handleWrapper);
        }
    }; // -END- function setEventListener()
})(window['makeAjaxForm']);
