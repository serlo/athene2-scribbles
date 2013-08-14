/*global jQuery: false, window: false*/
/**
* Handles the Main Layout
*
* Acts as a Singleton
*
* @class SerloLayout
* @constructor
* @param {Object} options Check 'defaults' in code
*/

var SERLO = SERLO || {};

(function ($, window, undefined){
    "use strict";
    var instance,
        defaults =  {
            rootSelector: 'body',
            togglerSelector: '.layout-toggle',
            leftToggleSelector: '#navigation-toggle',
            rightToggleSelector: '#sidebar-toggle',
            rightActiveClass: 'slide-left',
            leftActiveClass: 'slide-right',
            toggleActiveClass: 'layout-toggle-active'
        },
        SerloLayout = function (options) {
            this.options = $.extend({}, defaults, options);

            this.$root = $(this.options.rootSelector);
            this.$togglers = $(this.options.togglerSelector);

            this.$togglers.click(this.onTogglerClick);

            $(window).smartresize(this.onResize);
        };

    /**
    * Checks, which direction the $root should slide
    * and toggles the specific class.
    *
    * @method onTogglerClick
    * @param {Object} e The click event object
    */
    SerloLayout.prototype.onTogglerClick = function (e) {
        var slideClass,
            $self = $(this);

        e.preventDefault();

        $self.parent().toggleClass(instance.options.toggleActiveClass);

        if ($self.is(instance.options.leftToggleSelector)) {
            slideClass = instance.options.leftActiveClass;
            instance.$root.removeClass(instance.options.rightActiveClass);
        }
        if ($self.is(instance.options.rightToggleSelector)) {
            slideClass = instance.options.rightActiveClass;
            instance.$root.removeClass(instance.options.leftActiveClass);
        }
        if (slideClass) {
            instance.$root.toggleClass(slideClass);
        }
        return;
    };

    /**
    * Removes all togglerActive Classes and left-/rightActiveClasses
    *
    * @method onResize
    * @param {Object} e The smartresize event object
    */

    SerloLayout.prototype.onResize = function (e) {
        var self = instance;

        self.$root
            .removeClass(self.options.leftActiveClass)
            .removeClass(self.options.rightActiveClass);

        $('.' + self.options.toggleActiveClass).removeClass(self.options.toggleActiveClass);
    };

    /**
    * Publishes a single instance of SerloLayout
    * and makes it available in the global jQuery object
    *
    * @method SERLO.Layout
    * @param {Object} options See SerloLayout's defaults
    */

    SERLO.Layout = function (options) {
        return instance || (instance = new SerloLayout(options));
    };
})(jQuery, window);