/**
 * helpers
 */
(function (_this) {
    /**
     * Concatenates two objects. In result are all properties of first, with values of second (if it has such keys).
     *
     * @param {!Object} a
     * @param {Object}  b
     *
     * @return {Object}
     */
    _this.objConcat = function (a, b) {
        var c = Object.create(null);

        for (var key in a) {
            if (a.hasOwnProperty(key))
                c[key] = key in b ? b[key] : a[key];
        }

        return c;
    }; // -END- function objConcat()

    /** ----------------------------------------------------------------------------------------------------------------
     * Create a data item
     *
     * @param {Element} el
     * @param {string}  value
     * @param {boolean} required
     *
     * @return {{element:Element, value:string, required:boolean, fileData:Array}}
     */
    _this.dataItem = function(el, value, required) {
        return {
            'element'  : el,
            'value'    : value,
            'required' : required,
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
