/*global define */
define(['jquery'], function ($) {
    'use strict';

    var App = function () {

    };

    App.prototype.start = function () {
        $(function () {
            var $body = $('body'),
                $navigationToggler = $('#navigation-toggle'),
                $sidebarToggler = $('#sidebar-toggle');

            $.SerloSideMenu({
                root: '#main-nav',
                selector: '> li'
            });

            $.SerloAjaxOverlay();

            $.SerloSearch();

            /// TBD
            $navigationToggler.click(function () {
                $(this).parent().toggleClass('layout-toggle-active');
                $body.removeClass('slide-left').toggleClass('slide-right');
            });

            $sidebarToggler.click(function () {
                $(this).parent().toggleClass('layout-toggle-active');
                $body.removeClass('slide-right').toggleClass('slide-left');
            });
        });
    };

    return new App();
});