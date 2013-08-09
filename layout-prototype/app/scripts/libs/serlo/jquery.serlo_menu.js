/**
* Sidebar Navigation jQuery Plugin
* !!outdated
*
* @class SerloSideMenu
* @constructor
* @param {Object} options Check 'defaults' in code
*/

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
                leftOffset: 300
            }, options),

            init: function () {
                this.$root = $(this.options.root);

                this.$el =  $(this.options.selector, this.$root);
                this.$el.find('> a').click(this.onClick);

                this.$subNav = $(this.options.subNavSelector, this.$root)
                                    .click(this.onSubNavClick)
                                    .mouseenter(this.onSubNavMouseEnter);

                this.$title = $('.title', this.$root);

                this.$root.on('click', '.nav-back', this.onBackClick);

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

                plugin.setTitle($(this).html());

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

                plugin.setTitle($(this).html());

                var $mover = $(this).parents('.mover').first();

                $mover.animate({
                    left: '-=' + plugin.options.leftOffset + 'px'
                }, {
                    duration: 250
                });

                return;
            },

            onBackClick: function (e) {
                e.preventDefault();

                var $mover = $('.mover', plugin.$root).first();

                $mover.animate({
                    left: '+=' + plugin.options.leftOffset + 'px'
                }, {
                    duration: 250,
                    complete: function () {
                        $('.' + plugin.options.activeClass, plugin.$root).last().removeClass(plugin.options.activeClass);
                        plugin.setTitle($('.' + plugin.options.activeClass, plugin.$root).last().find('> a').html());
                    }
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
            },

            setTitle: function(text) {
                plugin.$title.html('<a href="#" class="nav-back"><i class="icon-left-circle"></i> ' + text + '</a>');
            }
        };

        return plugin.init();
    }

    $.SerloSideMenu = SerloSideMenu;
});