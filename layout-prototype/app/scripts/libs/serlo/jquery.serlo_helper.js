/*global window: false, jQuery: false*/
(function ($, _, window, undefined) {
    /*
    * Adds a smartResize event that uses a debounced function
    *
    * @module smartResize
    */
    var smartResize = {
            setup: function () {
                $(this).on("resize", smartResize.handler);
            },
            teardown: function () {
                $(this).off("resize", smartResize.handler);
            },
            handler: _.debounce(function (e) {
                e.type = "smartresize";
                $.event.dispatch.call(this, e);
            }, 200)
        };

    $.event.special.smartresize = smartResize;
    $.fn.smartresize = function (fn) {
        $(this).bind('smartresize', fn);
    };
})(jQuery, _, window);