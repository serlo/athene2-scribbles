/*global jQuery: false, window: false */
(function ($, window, undefined) {
    'use strict';
    $(function () {

        SERLO.SlideMenu();

        SERLO.AjaxOverlay({
            on: {
                contentOpened: function(AjaxOverlay) {
                    // set page title (for tab)
                    this.title = this.$el.find('#pagetitle').text();

                }
            }
        });

        SERLO.Search();

        SERLO.Layout();


        /**** VISION SUMMIT SPAGHETTI CODE *****/

        $('#alle-themen .nav-side > li > a').click(function (e) {
            var $child = $(this).next('ul');

            if($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else if ($child.length) {
                $(this).addClass('active');
            }
            e.preventDefault();
            return;
        })
    });

})(jQuery, window);