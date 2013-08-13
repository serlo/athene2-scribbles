/*global jQuery: false, window: false, setTimeout: false, console: false*/
/**
* Sidebar Search jQuery Plugin
*
* @class SerloSearch
* @constructor
* @param {Object} options Check 'defaults' in code
*/
(function ($, _, window, undefined) {
    "use strict";
    var instance,
        KEYCODES = {
            left: 37,
            top : 38,
            right: 39,
            down: 40,
            enter: 13,
            backspace: 8,
            entf: 46,
            esc: 27
        },
        defaults  = {
            rootSelector: '#search-content',
            inputSelector: '#search-input',
            resultSelector: '#search-results',

            onFocusClass: 'is-focus',
            hasResultsClass: 'has-results',

            ajaxThrottlingDelay: 650,

            searchUrl: '/search/json',
            searchParam: 'q'
        },
        SerloSearch = function (options) {
            this.options = $.extend({}, defaults, options);

            this.$root = $(this.options.rootSelector);
            this.$input = $(this.options.inputSelector);
            this.$results = $(this.options.resultSelector);

            this.$input.focus(this.onFocus);
            this.$input.focusout(this.onFocusOut);

            this.$input.keyup(this.onKeyUp);

            /// Override the original search function
            /// with a throttled one
            /// to minimize the amount of ajax calls to the server
            this.search_orig = this.search;
            this.search = _.throttle(this.search_orig, this.options.ajaxThrottlingDelay, {leading: false});
        };

    /**
    * Performs an GET request to options.searchUrl
    * with param options.searchParam
    * set to searchString.
    *
    * Gets overridden in the constructor
    *
    * @method search
    * @param {String} searchString The string to search for
    */

    SerloSearch.prototype.search = function (searchString) {
        var self = this,
            data = {},
            call;

        data[this.options.searchParam] = searchString;

        call = $.ajax({
            url: this.options.searchUrl,
            method: 'GET',
            data: data
        });

        call.success = function (result) {
            self.$results.html(result);
        };

        call.error = function () {
            console.log(arguments);
        };
    };

    /**
    * Handles the focus event on search input
    * adds the onFocusClass to the rootSelector
    * 
    * @method onFocus
    * @param {Object} e The focus event
    * @returns false
    */

    SerloSearch.prototype.onFocus = function (e) {
        var self = instance;
        e.preventDefault();
        self.$root.addClass(self.options.onFocusClass);
        return;
    };

    /**
    * Handles the focusout event on search input,
    * removes the onFocusClass to the rootSelector
    * 
    * @method onFocusOut
    * @param {Object} e The focusout event
    * @returns false
    */

    SerloSearch.prototype.onFocusOut = function (e) {
        var self = instance;
        e.preventDefault();
        self.$root.removeClass(self.options.onFocusClass);
        self.$root.removeClass(self.options.hasResultsClass);
        return;
    };

    /**
    * Handles the keyUp event on search input,
    * triggers an ajax call
    *
    * @method onKeyUp
    * @param {Object} e The keyup event
    * @returns false
    */

    SerloSearch.prototype.onKeyUp = function (e) {
        var searchString = $.trim($(this).val());

        switch (e.keyCode) {
        case KEYCODES.left:
        case KEYCODES.top:
        case KEYCODES.right:
        case KEYCODES.down:
            return true;
        case KEYCODES.esc:
            $(this).val('');
            instance.$root.removeClass(instance.options.hasResultsClass);
            break;
        default:
            e.preventDefault();
            if (searchString !== '' || e.shift) {
                instance.search(searchString);
            }
            return false;
        }
    }

    /**
    * Allows only one instance 
    * 
    * @method $.SerloSearch
    * @param {Object} options Check 'defaults'
    * @returns The SerloSearch instance
    */

    $.SerloSearch = function (options) {
        return instance || (instance = new SerloSearch(options));
    }
})(jQuery, _, window);