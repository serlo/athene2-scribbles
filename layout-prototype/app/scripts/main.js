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

        if ($('#grenzwertbetrachtung, #alle-themen').length) {
            $('#content .nav-side a').click(function (e) {
                var $self = $(this),
                    $preview = $('#' + $self.attr('data-id')),
                    $child = $(this).next('ul');

                if($self.hasClass('let-through')) return true;

                $('.sidebar-content-group.preview').hide();
                $('#content .nav-side a.active').removeClass('active');

                if ($(this).hasClass('active')) {
                    $preview.hide();
                } else {
                    $(this).parents('li').children('a').addClass('active');
                    $('#sidebar').css({
                        top: $(window).scrollTop() - 120
                    });
                    $preview.show();
                }

                e.preventDefault();
                return;
            });
        }
    });

})(jQuery, window);