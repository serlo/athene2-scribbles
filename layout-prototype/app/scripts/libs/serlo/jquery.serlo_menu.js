/*jslint nomen: true*/
/*global window: false, setTimeout: false, jQuery: false, _: false*/
/**
* Sidebar Navigation jQuery Plugin
*
* @class SerloSlideMenu
* @constructor
* @param {Object} options Check 'defaults' in code
*/

(function ($, window, undefined) {
    'use strict';
    var instance,
        defaults = {
            rootSelector: '#main-nav',
            navLinkSelector: 'li > a',
            activeClass: 'active-hover',
            titleSelector: '.title',
            moverSelector: '.mover',
            backLinkClass: 'nav-back'
        },
        SerloSlideMenu = function (options) {
            this.options = $.extend({}, defaults, options);
            /* cache main dom elements */
            this.$root = $(this.options.rootSelector);
            this.$links = $(this.options.navLinkSelector, this.$root);
            this.$linkParents = this.$links.parent();

            this.$mover = $(this.options.moverSelector, this.$root);

            this.$title = $(this.options.titleSelector, this.$root);

            this.history = [];

            this.attachHandler();
        };

    /**
    * Adds all neccessary event handler
    *
    * @method attachHandler
    */
    SerloSlideMenu.prototype.attachHandler = function () {
        this.$links.click(this.onLinkClick);
        this.$root.on('click', '.' + this.options.backLinkClass, this.onBackLinkClick);
    };

    /**
    * Removes all added event handler
    *
    * @method removeHandler
    */
    SerloSlideMenu.prototype.removeHandler = function () {
        this.$links.unbind('click', this.onLinkClick);
        this.$root.off('click', '.' + this.options.backLinkClass, this.onBackLinkClick);
    };

    /**
    * Closes the menu
    *
    * @method Close
    */
    SerloSlideMenu.prototype.close = function () {
        this.history = [];
        this.$linkParents.removeClass(this.options.activeClass);
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
            $list = $self.next('ul');

        /// if there is no more submenu, let the event pass, close the menu.
        if (!$list.length) {
            instance.close();
            return true;
        }

        e.preventDefault();

        instance.updateHistory($self);
        instance.setTitle($self);

        instance.move();

        return;
    };

    /**
    * Event handler for clicks on the backLink
    *
    * @method onBackLinkClick
    * @param {Object} e The click event object
    */

    SerloSlideMenu.prototype.onBackLinkClick = function (e) {
        e.preventDefault();

        // [].shift.call(instance.$activeLinks);
        instance.history.pop();

        if (!instance.history.length) {
            instance.close();
        } else {
            $(_.last(instance.history)).trigger('click');
        }
        return;
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
    * Animates the Link list horizontally to the given elements position
    * 
    * @method move
    * @param {Object} $list The currents list jQuery object
    */
    SerloSlideMenu.prototype.move = function () {
        var self = this,
            depth = this.history.length - 1;

        self.$mover.animate({
            left: -1 * depth * $(_.last(this.history)).next('ul').position().left
        }, {
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
        var title = $link.html();
        this.$title.html('<a href="#" class="' + this.options.backLinkClass + '"><i class="icon-left-circle"></i>' + title + '</a>');
        return title;
    };

    $.SerloSlideMenu = function () {
        return instance || (function () {
            instance = new SerloSlideMenu();
            return instance;
        }());
    };
}(jQuery, window));