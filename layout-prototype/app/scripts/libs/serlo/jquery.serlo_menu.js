/*jslint nomen: true*/
/*global window: false, setTimeout: false, jQuery: false, _: false*/
/**
* Sidebar Navigation jQuery Plugin
*
* @class SerloSlideMenu
* @constructor
* @param {Object} options Check 'defaults' in code
*/

var SERLO = SERLO || {};

(function ($, window, undefined) {
    'use strict';
    var instance,
        defaults = {
            rootSelector: '#main-nav',
            subnavContainerSelector: '.subnav',
            navLinkSelector: 'li > a',
            activeClass: 'active-hover',
            titleSelector: '.title',
            activeSubNav: '.nav-second a',
            onHoverClass: '.hover',
            moverSelector: '.mover',
            backLinkClass: 'nav-back',
            slideDuration: 200
        },
        SerloSlideMenu = function (options) {
            this.options = $.extend({}, defaults, options);
            /* cache main dom elements */
            this.$root = $(this.options.rootSelector);
            this.$links = $(this.options.navLinkSelector, this.$root);
            this.$linkParents = this.$links.parent();

            this.$activeSubLinks = $(this.options.activeSubNav, this.$root);

            this.$mover = $(this.options.moverSelector, this.$root);

            this.$title = $(this.options.titleSelector, this.$root);

            this.history = [];
            this.opened = false;

            this.$links
                .click(this.onLinkClick);


            this.$activeSubLinks
                .unbind('click')
                .click(this.onActiveSubLinkClick);

            this.$root.on('click', '.' + this.options.backLinkClass, this.onBackLinkClick);

            // click on body closes the menu
            $('body').click('click', function () {
                if (instance.opened) {
                    instance.close();
                }
            });
            // click on $root stops event propagation,
            // to avoid closing 
            this.$root.click(function (e) {
                e.stopPropagation();
            });
        };

    /**
    * Closes the menu
    *
    * @method Close
    */
    SerloSlideMenu.prototype.close = function () {
        this.clearHistory();
        this.opened = false;
        this.$linkParents.removeClass(this.options.activeClass);
    };

    /**
    * Sets the internal opened bool to true
    * and resets the mover.
    *
    * @method open
    */
    SerloSlideMenu.prototype.open = function () {
        this.clearHistory();
        this.opened = true;
        this.resetMove();
    };

    /**
    * Event handler for clicks on navigation links
    *
    * @method onLinkClick
    * @param {Object} e The click event object
    * @return {Boolean} false
    */

    SerloSlideMenu.prototype.onLinkClick = function (e) {
        var self = this,
            $self = $(self),
            $list = $self.siblings().filter('ul, ' + instance.options.subnavContainerSelector);

        /// if there is no more submenu, let the event pass, close the menu.
        if (!$list.length) {
            instance.close();
            return true;
        }

        if (!instance.opened) {
            instance.open();
        }

        e.preventDefault();

        instance.updateHistory($self);
        instance.setTitle($self);

        instance.move();

        return;
    };

    /**
    * Event handler for clicks on active navigation links
    *
    * NOT SAVE, because it triggers Link with same .text()
    *
    * @method onActiveSubLinkClick
    * @param {Object} e The click event object
    * @return {Boolean} false
    */
    SerloSlideMenu.prototype.onActiveSubLinkClick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        var self = this,
            $target,
            identifier = new RegExp($(self).text().trim());

        instance.open();

        $(self).parents('li').last().addClass(instance.options.activeClass);

        $target = instance.$links.filter(function () {
            return identifier.test($(this).text().trim()) && self !== this;
        }).first();

        if ($target.length) {

            $target.parents('li').each(function (i) {
                if (i > 0){
                    instance.updateHistory($(this).children('a').first());
                }
            });

            $target.trigger('click');
        }


        return false;
    };

    /**
    * Event handler for clicks on the backLink
    *
    * @method onBackLinkClick
    * @param {Object} e The click event object
    */

    SerloSlideMenu.prototype.onBackLinkClick = function (e) {
        e.preventDefault();

        instance.history.pop();

        if (!instance.history.length) {
            instance.close();
        } else {
            $(_.last(instance.history)).trigger('click');
        }
        return;
    };

    /**
    * Fills the link info DOM element with the given $element
    * and shows it.
    *
    * @method showInfo
    */
    SerloSlideMenu.prototype.showInfo = function ($elem) {
        this.$info.html($elem.html()).show();
    };

    /**
    * Empties the info DOM element and hides it
    *
    * @method showInfo
    */
    SerloSlideMenu.prototype.hideInfo = function () {
        this.$info.empty().hide();
    };

    /**
    * Updates the click history:
    *
    * Adds a new element if it isnt already in the history
    * or deletes all appended elements before its position in history
    *
    * @method updateHistory
    * @param {Object} $elem The jQuery <li> element
    */
    SerloSlideMenu.prototype.updateHistory = function ($elem) {
        var self = this,
            index = _.indexOf(this.history, $elem[0]);

        $elem.parent().addClass(self.options.activeClass);

        if (index > -1) {
            this.history.splice(index);
        }
        self.history.push($elem[0]);
    };

    /**
    * Clears the click history
    * 
    * @method clearHistory
    */
    SerloSlideMenu.prototype.clearHistory = function () {
        SERLO.emptyArray(this.history);
    };

    /**
    * Animates the Link list horizontally to the given elements position
    * 
    * @method move
    * @param {Object} $list The currents list jQuery object
    */
    SerloSlideMenu.prototype.move = function () {
        var self = this,
            depth = this.history.length - 1,
            lastElement = $(_.last(this.history)).next('ul').position(),
            left = !!lastElement ? lastElement.left : 0;

        self.$mover.animate({
            left: -1 * depth * left
        }, {
            duration: this.options.slideDuration,
            complete: function () {
                self.onMoveComplete();
            }
        });
    };

    /**
    * Cleans up the old active links
    *
    * @method onMoveComplete
    */
    SerloSlideMenu.prototype.onMoveComplete = function () {
        var self = this;

        self.$linkParents.removeClass(self.options.activeClass);

        $.each(this.history, function (i, elem) {
            $(elem).parent().addClass(self.options.activeClass);
        });
    };

    /**
    * Resets the link lists left offset to zero
    * 
    * @method resetMove
    */
    SerloSlideMenu.prototype.resetMove = function () {
        this.$mover.css('left', '0px');
    };

    /**
    * Sets the menus title
    *
    * @method setTitle
    * @param {Object} $link The jQuery object, containing the title
    * @return {String} The title
    */
    SerloSlideMenu.prototype.setTitle = function ($link) {
        var title = $link.text();
        this.$title.html('<a href="#" class="' + this.options.backLinkClass + '"><i class="icon-left-circle"></i>' + title + '</a>');
        return title;
    };

    SERLO.SlideMenu = function () {
        return instance || (function () {
            instance = new SerloSlideMenu();
            return instance;
        }());
    };
}(jQuery, window));