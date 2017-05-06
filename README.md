makeAjaxForm
============
JS-plugin to ajax exchange.

Need create any html block (container) instead of 'form', create any usual input elements and submit element (sender) inside it,
specify these container & sender to plugin, and it can exchange data with server, by ajax.

Used clean Javascript, unrequire JQuery or another plugins.

Due to absence of tag 'form' at page, makeAjaxForm excludes spam-attack, because spam-bots can't find form target
and data structure.

Supports next input types:
```
  input type="text || radio || checkbox || password || hidden || file" (and all other that can be represented
    by a pair 'name=value');
  select (& with 'multiple' attribute);
  textarea;
```

Sample with many input types can be found in 'sample/sample.php' file. To see it in browser, run 'index.php' from root of project.

Features:
---------
- If some input element has not 'name' or 'value' attribute it will not been send to a server. Without warnings!
- File upload works in IE10+ and other modern browsers (need support FormData). Otherwise, plugin sends everything except the files.
- Method of exchange always 'post', encoding always 'multipart/form-data'.
- At the moment, only one file can be choosed ('multiple' not supported).

Requirements:
-------------
any web-browser with javascript support

Support triggers:
--------------------------------
- onDataCollected(dataObject) - provides collected dataObject of data & validation errors. If returns 'false', exchange

- onValidationError(errorObject) - provides elements that fail validation, with two types of errors: 'required_wo_value'
  || 'required_wo_check'. Also returns string 'no_valid_data' if no data collected.
- onStartExchange() - before send data, after succeed validation. If returns 'false', data will not be sent.
- onExchangeError(responseStatusText) - provides server's error description on exchange fail.
- onExchangeSuccess(serverResponseText) - provides server response on succeed exchange.

