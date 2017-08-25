window['makeAjaxForm'] = function(opts)
{
    if (!opts['container'] || typeof opts['container'] !== 'object' ||
        !opts['submit'] || typeof opts['submit'] !== 'object'
    ) {
        console.error('makeAjaxForm: parameters "container" or "submit" is invalid. Plugin Off!');
        return;
    }

    var _this = window['makeAjaxForm'];

    // Prepare params
    opts = _this.objConcat({
        'container'      : null,
        'submit'         : null,
        'target'         : '/',
        'waitingtime'    : 3600,
        'sendAjaxHeader' : true,

        'onDataCollected'   : function() {},
        'onStartExchange'   : function() {},
        'onExchangeError'   : function() {},
        'onExchangeSuccess' : function() {}
    }, opts);

    _this.setEventListener(opts['submit'], 'click', {handleEvent:_this.submitHandler, opts:opts});
};
