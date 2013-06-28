define(['jquery'], function ($) {
    'use strict';

    var SerloSideMenu = function (options) {
        var plugin = {
            options: $.extend({
                root: '#sidebar-nav',
                selector: ' > .nav > li',
                activeClass: 'active-hover',
                hoverIntentDuration: 350
            }, options),

            init: function () {
                this.$root = $(this.options.root);

                this.$el =  $(this.options.selector, this.$root).click(this.onClick);

                this.$root.hoverIntent({
                    over: this.onMouseEnter,
                    out: this.onMouseLeave,
                    selector: this.options.selector,
                    timeout: this.options.hoverIntentDuration
                });

                return this;
            },

            onClick: function() {
                $(this).trigger('hoverIntent');
            },

            onMouseEnter: function () {
                plugin.$el.removeClass(plugin.options.activeClass);
                $(this).addClass(plugin.options.activeClass);
            },

            onMouseLeave: function () {
                $(this).removeClass(plugin.options.activeClass);
            }
        };

        return plugin.init();
    }

    $.SerloSideMenu = SerloSideMenu();
});