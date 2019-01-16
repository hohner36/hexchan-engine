var Highlighter = function(props) {
    var localCollection = new LocalCollection({
        key: props.storageKey
    });

    function init() {
        // Write new items into collection
        localCollection.concat(props.cookieData);

        // Add attributes for styling marked elements
        var elements = document.querySelectorAll(props.selector);
        var element, elementId;

        for (var i = 0; i < elements.length; i++) {
            element = elements[i];
            elementId = element.getAttribute('data-id');
            if (localCollection.check(elementId)) {
                element.setAttribute('data-user', true);
            }
        }
    }

    function destroy() {
        localCollection.destroy();
    }

    init();
    return {
        destroy: destroy
    };
};


function getCookieArray(key) {
    var cookieStr = Cookies.get(key);
    return cookieStr ? cookieStr.split('#') : [];
}


var userThreadsHighlighter = new Highlighter({
    cookieData: getCookieArray('user_threads'),
    storageKey: 'userThreads',
    selector: '.js-thread-hid'
});

var userPostsHighlighter = new Highlighter({
    cookieData: getCookieArray('user_posts'),
    storageKey: 'userPosts',
    selector: '.js-post-hid'
});
