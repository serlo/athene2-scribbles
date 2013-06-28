/*global define */
define(['jquery'], function ($) {
    'use strict';

    var App = function() {

    }

    App.prototype.start = function() {
      $(function () {
        $('.input-search').each(function(){
          var subnav = $(this).parent().find('.subnav'),
              original = subnav.html();

          $(this).keyup(function(){
            var val = $(this).val();
            if(val == '') {
              subnav.html(original);
            } else {
              var html = '<p>Deine Suche nach \"'+ val +'\" hat folgende Suchergebnisse erbracht:</p>';
              html += '<div class="row-fluid"><div class="span6"><ul><li><strong>Kategorie 1</strong><li><a href="#">Ergebniss 1</a></li><li><a href="#">Ergebniss 2</a></li><li><a href="#">Ergebniss 3</a></li></ul></div><div class="span6"><ul><li><strong>Kategorie 2</strong><li><a href="#">Ergebniss 1</a></li><li><a href="#">Ergebniss 2</a></li><li><a href="#">Ergebniss 3</a></li><li><a href="#">Ergebniss 4</a></li><li><a href="#">Ergebniss 5</a></li></ul></div></div>';
              subnav.html(html);
            }

          });
        });

        var $exercises = $('.exercise').each(function(){
          var $self = $(this);

          $('.btn-solution', $self).click(function(e){
            e.preventDefault();
            $exercises.not($self).removeClass('show-solution');
            $self.toggleClass('show-solution');
            return;
          });
        });

      });
    }

    return new App();
});