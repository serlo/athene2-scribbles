/*global window: false, jQuery: false, SERLO: false*/

var SERLO = SERLO || {};

(function ($, _, window, undefined) {
    /**
    * Adds a smartResize event that uses a debounced function
    *
    * @method smartResize
    * @param {Function} fn The callback function
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

    /**
    * Emptys an array
    *
    * Can have an infinite number of parameters
    *
    * @method emptyArray
    * @param {Array} arr1 The array to empty
    */

    SERLO.emptyArray = function () {
        var i,
            length,
            args = arguments;

        if(args.length === 1) {
            for (i = 0, length = args[0].length; i < length; i += 1) {
                args[0].shift();
            }
        } else {
            for (i = 0, length = args.length; i < length; i += 1) {
                if (args[i] instanceof Array) {
                    SERLO.emptyArray(args[i]);
                }
            }
        }
    };
})(jQuery, _, window);