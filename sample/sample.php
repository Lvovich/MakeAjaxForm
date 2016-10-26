<div class="my-form">
    <label>input type="checkbox" name="aaa" value="a1" title="" <span style="color:red;">required</span><br/>
        <input type="checkbox" name="aaa" value="a1" title="" required />
    </label>
    <br/><br/>
    <label>input type="radio" name="bbb[]" value="b1" title=""<br/>
        <input type="radio" name="bbb[]" value="b1" title="" />
    </label><br/>
    <label>input type="radio" name="bbb[]" value="b2" title=""<br/>
        <input type="radio" name="bbb[]" value="b2" title="" />
    </label>
    <br/><br/>
    <label>input type="text" name="t[]" value="" onclick="alert('weffs');" style="box-shadow: 0 0 100px 0 green;" title="" <span style="color:red;">required</span><br/>
        <input type="text" name="t[]" value="" onclick="alert('weffs');" style="box-shadow: 0 0 100px 0 green;" title="" required />
    </label><br/>
    <label>input type="text" name="t[]" value="" title=""<br/>
        <input type="text" name="t[]" value="" title="" />
    </label><br/><br/>
    <br/>
    <label>input type="text" name="username"<br/>
        <input type="text" name="username" />
    </label>
    <br/><br/>
    <label>select name="age[]" multiple<br/>
        <select name="age[]" multiple disabled="disabled">
            <option value="0" selected></option>
            <option value="10">10 let</option>
            <option value="20">20 let</option>
        </select>
    </label>
    <br/><br/>
    <label>textarea name="ta" class="txtarea" rows="4" placeholder="Your comment..."<br/>
        <textarea name="ta" class="txtarea" rows="4" placeholder="Your comment..."></textarea>
    </label>
    <br /><br />
    <label>input type="file" accept="*" name="file"<br/>
        <input type="file" accept="*" name="file" />
    </label>
    <br /><br />
    <input class="sender" type="submit" value="SEND ALL OF IT" />
</div>
<br /><br />
<div class="result-view" style="border: 1px solid green; padding: 10px;">
    Response result here...
</div>

<script src="release/maf.min.js"></script>
<script>
    var container = document.querySelector('.my-form');
    var submit    = document.querySelector('.sender');

    window.addEventListener('load', function() {
        new MakeAjaxForm({
            container: container,
            submit: submit,
            target: 'sample/ajax_handler.php',

            onDataCollected: function(collectedData) {
                var block = document.querySelector('.result-view') || document.createElement('div');

                block.innerHTML = 'Response result here...';
            },

            onValidationError: function(error) {
                var block = document.querySelector('.result-view') || document.createElement('div');

                block.innerHTML = 'Some input\'s fail validation...';

                if (error.element.origStyle === undefined) {
                    error.element.origStyle = error.element.style.boxShadow;
                }

                var clickHandler = function() {
                    error.element.style.boxShadow = '' + error.element.origStyle;
                    error.element.removeEventListener('click', clickHandler);
                };

                error.element.style.boxShadow = '0 0 10px 0 red';
                error.element.addEventListener('click', clickHandler);
            },

            onStartExchange: function () {
                if (true) {
                    alert('Now we start data send!');
                    return true;
                } else {
                    return false;
                }
            },

            onExchangeSuccess: function(response) {
                var block = document.querySelector('.result-view') || document.createElement('div');

                block.innerHTML = response;
            },

            onExchangeError: function(statusText) {console.dir(statusText);}
        });
    });
</script>
