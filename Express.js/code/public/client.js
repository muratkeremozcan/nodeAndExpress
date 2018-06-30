$(function() {
    $.get('/blocks', appendToList); // use JQuery's get function , we  issue a request to /blocks endpoint. Returns blocks  in JSON format
    function appendToList(blocks) {
        // 2 MIDDLEWARE - Part 1
        var list = []; // appendToList creates an empty array called list
        var content, block; // SECTION 4.1
        for (var i in blocks) { //  iterates through the blocks
            // SECTION 4.1
            block = blocks[i];
            content = '<a href="/blocks/' + block + '">' + block + '</a>' + '<a href="#" data-block="' + block + '"><img src="del.jpg"></a>'; // link to each BLock's description
            // 4.2: we added a href element , setting the block name to the data-block attribute, which we use to compose the ajax request,
            //  then we'll add an image tag for delete image, and that's enough to display the links

            // SECTION 2
            // list.push($('<li>', { text: blocks[i] })); // creates an li for each one, with text set to block name

            // SECTION 4
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list); // the append results to block-list.
    }

    // SECTION 4.2
    $('.block-list').on('click', 'a[data-block]', function(event) { // we will attach an event listener on all links with a data-block attribute,
        // then listen for click events triggered on that element from any links that have a data block attribute.
        if (!confirm('Are you sure ?')) { //  add a confirmation. Always good to add confirmation for delete action.
            return false; //  If we click cancel , it will return false and stop the event-handler execution
        }

        // get the link that triggers the click-event by reading the currentTarget property on the event object, 
        var target = $(event.currentTarget); // then we wrap it in a jQuery object to make it easier to work with and assign it to the target variable
        $.ajax({ // ajax delete request
            type: 'DELETE',
            url: '/blocks/' + target.data('block') // the url path for the request will be /blocks/blockname which we fetch by reading the block name from the link's data-block attribute
        }).done(function() { // once the ajax call is done...
            target.parents('li').remove(); // we find the parent li element for the click link and remove it from the page
        });
    });

    // SECTION 4 listener for the submit event
    // data is sent in a post request to the /blocks endpoint
    $('form').on('submit', function(event) { // add a listener to the submit event on the form element
        event.preventDefault(); // prevent the form from being immediately submitted by calling preventDefault function on event object
        var form = $(this); // wrap the object 'this' in a jQuery object  to make it easier to work with, assign it to the form variable
        var blockData = form.serialize(); // call the serialize function in the form object, assign  it to the blockData variable . The serialize function transforms form data to URL encoded notation, so our express app can parse it back to JS

        $.ajax({ // we send this data in the data in the data property of the ajax call which is a post request to the /blocks path
            type: 'POST',
            url: '/blocks',
            data: blockData
        }).done(function(blockName) { // when the request is done and we receive the response, we get the recently created blockName back as the argument for the anonymous function 
            appendToList([blockName]); // we use the appendToList function from earlier to add new blocks to the list, this function expects an array of blocks and not a single block. We get around this by wrapping our argument in an array. 
            // This way we avoid we changing original function to expect different types of arguments, which is something bad you shouldn't do
            form.trigger('reset'); // trigger the reset event on the form element, this cleans up form text input fields
        });
    });
});