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
    opts = _this.obMerge(
        { // a
            container : opts['container'],
            submit    : opts['submit'],
            target        : ('' + opts['target']) || '/',
            waitingtime   : !!(+opts['waitingtime']) ? +opts['waitingtime'] : 3600,
            stopOnInvalid : opts['stopOnInvalid'] !== undefined ? !!opts['stopOnInvalid'] : true,
            'onDataCollected'   : function() {},
            'onValidationError' : function() {},
            'onStartExchange'   : function() {},
            'onExchangeError'   : function() {},
            'onExchangeSuccess' : function() {}
        },
        { // b
            'onDataCollected'   : opts['onDataCollected'],
            'onValidationError' : opts['onValidationError'],
            'onStartExchange'   : opts['onStartExchange'],
            'onExchangeError'   : opts['onExchangeError'],
            'onExchangeSuccess' : opts['onExchangeSuccess']
        },
        { // types
            'onDataCollected'   : 'function',
            'onValidationError' : 'function',
            'onStartExchange'   : 'function',
            'onExchangeError'   : 'function',
            'onExchangeSuccess' : 'function'
        }
    );

    _this.setEventListener(opts.submit, 'click', {handleEvent:_this.submitHandler, opts:opts});
};
