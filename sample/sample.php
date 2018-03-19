<div class="my-form">
    <label>input type="checkbox" name="aaa" value="a1" title="" <span style="color:red;">required</span><br/>
        <input type="checkbox" name="aaa" value="a1" title="" required />
    </label>
    <br/><br/>
    <label>input type="radio" name="bbb" value="b1" title=""<br/>
        <input type="radio" name="bbb" value="b1" title="" />
    </label><br/>
    <label>input type="radio" name="bbb" value="b2" title=""<br/>
        <input type="radio" name="bbb" value="b2" title="" />
    </label>
    <br/><br/>
    <label>input type="text" name="t[]" value="" title=""<br/>
        <input type="text" name="t[]" value="" title="" />
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
        <select name="age[]" multiple>
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

<script src="/release/maf.min.js"></script>
<script>
    makeAjaxForm({
        container : document.querySelector('.my-form'),
        submit    : document.querySelector('.sender'),
        target        : 'sample/ajax_handler.php',
        waitingtime   : 50,
        sendAjaxHeader: true,

        onDataCollected: function(collectedData) {
            console.dir(collectedData);

            var block = document.querySelector('.result-view') || document.createElement('div');
            block.innerHTML = 'Response result here...';
        },

        onStartExchange: function () {},

        onExchangeSuccess: function(response) {
            var block = document.querySelector('.result-view') || document.createElement('div');

            block.innerHTML = response;
        },

        onExchangeError: function(statusText) {
            console.dir(statusText);
        }
    });
</script>
