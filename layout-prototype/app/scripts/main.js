require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    deps: [
        'libs/jquery.hoverintent.min',
        'libs/jquery.serlo_menu',
        'libs/jquery.serlo_ajax_overlay'
    ],
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['jquery', 'app', 'bootstrap'], function ($, app) {
    'use strict';
    // use app here
    app.start();
});
