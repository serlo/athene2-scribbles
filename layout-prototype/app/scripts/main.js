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
    });

})(jQuery, window);