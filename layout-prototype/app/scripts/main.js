require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    deps: [
        'libs/polyfill/hashchange.polyfill',
        'libs/thirdparty/jquery.hoverintent.min',
        'libs/serlo/jquery.serlo_menu',
        'libs/serlo/jquery.serlo_ajax_overlay',
        'libs/serlo/jquery.serlo_search'
    ],
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['jquery', 'app', 'bootstrap'], function ($, SERLO) {
    'use strict';
    // use app here
    SERLO.start();
});
