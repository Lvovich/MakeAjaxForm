(function (_this) {
    /**
     * Contains an actions for the form elements types.
     *
     * @type {Object}
     */
    _this.actions = {};

    /** ----------------------------------------------------------------------------------------------------------------
     * @param {Element} el
     *
     * @return {Array}
     */
    _this.actions['input'] = function (el) {
        if (!el.disabled) {
            if (el.type === 'checkbox' || el.type === 'radio') {
                if (el.checked) {
                    return [_this.dataItem(el, el.value, el.hasAttribute('required'))];
                }
            }
            else {
                return [_this.dataItem(el, el.value, el.hasAttribute('required'))];
            }
        }

        return [];
    }; // -END- _this.actions['input']

    /** ----------------------------------------------------------------------------------------------------------------
     * @param {Element} el
     *
     * @return {Array}
     */
    _this.actions['select'] = function (el) {
        var res = [];

        if (!el.disabled) {
            for (var i=0; i<el.options.length; i++) {
                var option = el.options[i];

                if (!option.disabled && option.selected) {
                    res.push(_this.dataItem(el, option.value, el.hasAttribute('required')));
                }
            }
        }

        return res;
    }; // -END- _this.actions['select']

    /** ----------------------------------------------------------------------------------------------------------------
     * @param {Element} el
     *
     * @return {Array}
     */
    _this.actions['textarea'] = function (el) {
        return !el.disabled ? [_this.dataItem(el, el.value, el.hasAttribute('required'))] : [];
    }; // -END- _this.actions['textarea']
})(window['makeAjaxForm']);
