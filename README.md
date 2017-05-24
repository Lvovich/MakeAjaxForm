makeAjaxForm
============
JS-plugin to ajax exchange.

Need create any html block (container) instead of 'form', create any usual input elements and submit element (sender)
inside it, specify these container & sender to plugin.

Used clean Javascript.

Due to absence of tag 'form' in page, excludes spam-attack, because bots can't find form target and data structure.

Supports next input types:
```
  input type="text || radio || checkbox || password || hidden || file" (and all other that can be represented
    by a pair 'name=value');
  select (& with 'multiple' attribute);
  textarea;
```

Sample with many input types can be found in 'sample/sample.php' file. To see it in browser, run 'index.php' from root
of project.

Features:
---------
- If some input element has not 'name' attribute (or it is empty), or has 'disabled', it will not be sent to a server.
- File upload works in IE10+ and other modern browsers (need support FormData). Otherwise, plugin sends everything
  except the files.
- At the moment, only one file can be choosed ('multiple' not supported).
- Method of exchange always 'post', encoding always 'multipart/form-data'.

Support triggers:
--------------------------------
- onDataCollected(dataObject) - provides array of collected data. If returns 'false', exchange process aborts.
- onStartExchange() - executing directly before data send. If returns 'false', data will not be sent.
- onExchangeError(responseStatusText) - provides error description on exchange fail.
- onExchangeSuccess(serverResponseText) - provides server response on succeed exchange.

