/*global jQuery: false, window: false */
(function ($, window, undefined) {
    'use strict';
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

})(jQuery, window);