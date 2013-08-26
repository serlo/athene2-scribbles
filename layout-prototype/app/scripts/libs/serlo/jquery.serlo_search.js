/*global jQuery: false, window: false, setTimeout: false, console: false*/
/**
* Sidebar Search jQuery Plugin
*
* @class SerloSearch
* @constructor
* @param {Object} options Check 'defaults' in code
*/

var SERLO = SERLO || {};

(function ($, _, window, undefined) {
    "use strict";
    var instance,
        defaults  = {
            rootSelector: '#search-content',
            inputSelector: '#search-input',
            resultSelector: '#search-results',

            onFocusClass: 'is-focus',
            isSearchingClass: 'is-searching',
            hasResultsClass: 'has-results',

            ajaxThrottlingDelay: 650,

            searchUrl: 'http://www.serlo.org/search/quicksearch',
            searchMethod: 'post',
            searchParam: 'query'
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

        this.$root.addClass(this.options.isSearchingClass);

        this.call = $.ajax({
            url: this.options.searchUrl,
            method: this.options.searchMethod,
            data: data
        });

        this.call.success(function (result) {
            self.$results.html(result);
            // only remove isSearchingClass if this has been the last call
            if(arguments[2] === self.call) {
                self.$root.removeClass(self.options.isSearchingClass);
            }
        });

        this.call.error(function () {
            // only remove isSearchingClass if this has been the last call
            if(self.call === arguments[0]) {
                self.$root.removeClass(self.options.isSearchingClass);
            }
        });
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
        case SERLO.COMMON.KEYCODES.left:
        case SERLO.COMMON.KEYCODES.top:
        case SERLO.COMMON.KEYCODES.right:
        case SERLO.COMMON.KEYCODES.down:
            return true;
        case SERLO.COMMON.KEYCODES.esc:
            $(this).val('').blur();
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
    * @method SERLO.Search
    * @param {Object} options Check 'defaults'
    * @returns The SerloSearch instance
    */

    SERLO.Search = function (options) {
        return instance || (instance = new SerloSearch(options));
    }
})(jQuery, _, window);