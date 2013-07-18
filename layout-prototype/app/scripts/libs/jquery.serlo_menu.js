define(['jquery'], function ($) {
    'use strict';
    var SerloSideMenu = function (options) {
        var plugin = {
            options: $.extend({
                root: '#sidebar-nav',
                selector: ' > .nav > li',
                subNavSelector: '.subnav li > a',
                activeClass: 'active-hover',
                hoverDuration: 550,
                leftOffset: 330
            }, options),

            init: function () {
                this.$root = $(this.options.root);

                this.$el =  $(this.options.selector, this.$root);
                this.$el.find('> a').click(this.onClick);

                this.$subNav = $(this.options.subNavSelector, this.$root)
                                    .click(this.onSubNavClick)
                                    .mouseenter(this.onSubNavMouseEnter);

                this.$title = $('.title', this.$root);
                return this;
            },

            onClick: function (e) {
                e.preventDefault();

                if (plugin.mouseLeaveTimeout) {
                    clearTimeout(plugin.mouseLeaveTimeout);
                }

                plugin.resetSubNav();

                var $parent = $(this).parent();

                plugin.$title = $('.title', $parent);
                plugin.$title.text($(this).text());

                var isActive = $parent.hasClass(plugin.options.activeClass);

                plugin.$el.removeClass(plugin.options.activeClass);

                if (isActive) {
                    $parent.trigger('mouseleave');
                } else {
                    $parent
                        .addClass(plugin.options.activeClass)
                        .unbind('mouseenter')
                        .mouseenter(plugin.onMouseEnter)
                        .unbind('mouseleave')
                        .mouseleave(plugin.onMouseLeave);
                }
                return;
            },

            onSubNavClick: function (e) {
                e.preventDefault();
                var $parent = $(this).parent();

                $parent.addClass(plugin.options.activeClass);
                plugin.$title.text($(this).text());

                var $mover = $(this).parents('.mover').first();

                $mover.animate({
                    left: '-=' + plugin.options.leftOffset + 'px'
                }, {
                    duration: 250
                });

                return;
            },

            onMouseEnter: function () {
                if (plugin.mouseLeaveTimeout) {
                    clearTimeout(plugin.mouseLeaveTimeout);
                }
            },

            onMouseLeave: function () {
                if (plugin.mouseLeaveTimeout) {
                    clearTimeout(plugin.mouseLeaveTimeout);
                }

                plugin.mouseLeaveTimeout = setTimeout((function ($self){
                    return function() {
                        $self
                            .unbind('mouseleave')
                            .unbind('mouseenter')
                            .removeClass(plugin.options.activeClass);
                    }
                })($(this)), plugin.options.hoverDuration);
                
            },

            onSubNavMouseEnter: function() {
                var $info = $(this).siblings().filter('.info');
                if($info.length) {
                    $('#subnav-info').show().html($info.html())
                } else {
                    $('#subnav-info').hide();
                }
            },

            resetSubNav: function() {
                $('.mover', this.$root)
                    .css('left', 0)
                    .find('.' + plugin.options.activeClass)
                    .removeClass(plugin.options.activeClass);
            }
        };

        return plugin.init();
    }

    $.SerloSideMenu = SerloSideMenu;
});