/*global define */
define(['jquery'], function ($) {
    'use strict';

    var App = function() {

    }

    App.prototype.start = function() {
      $(function () {
        var $body = $('body'),
            $main = $('#main'),
            $navigationToggler = $('#navigation-toggle'),
            $sidebarToggler = $('#sidebar-toggle'),
            $search = $('#search-content'),
            $searchInput = $('input', $search);

        $searchInput
          .focus(function(){
            $(this).val('');
            $search.removeClass('has-results').addClass('is-focus');
          })
          .focusout(function(){
            $search.removeClass('has-results').removeClass('is-focus');
          })
          .keydown(function(){
            $search.addClass('has-results');
          })

        $navigationToggler.click(function(){
          $(this).parent().toggleClass('layout-toggle-active');
          $body.removeClass('slide-left').toggleClass('slide-right');
        });

        $sidebarToggler.click(function(){
          $(this).parent().toggleClass('layout-toggle-active');
          $body.removeClass('slide-right').toggleClass('slide-left');
        });

        $.SerloSideMenu({
          root: '#main-nav',
          selector: '> li'
        });

        $.SerloAjaxOverlay();
      });
    }

    return new App();
});