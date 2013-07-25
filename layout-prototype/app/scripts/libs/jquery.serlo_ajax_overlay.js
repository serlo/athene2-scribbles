define(['jquery'], function(jQuery) {;
    (function($, window, undefined) {
        var instance,
            defaults = {
                linkSelector: '.ajax-content',
                context: 'body',
                overlayActiveClass: 'ajax-content-active',
                ajaxContentSelector: '.page',
                ajaxContentTop: 177
            };

        var AjaxOverlay = function(options) {
            this.options = $.extend({}, defaults, options  ||  {});

            this.$overlayHTML = $('<div id="ajax-content-overlay" class="container"><header id="ajax-content-overlay-head"><a href="#" class="btn btn-default btn-mini pull-right close-overlay">x</a></header><div id="ajax-content-overlay-inner"></div><footer id="ajax-content-overlay-footer"><a class="btn btn-primary close-overlay"><i class="icon-back"></i>Zurück</a></footer></div>');

            this.$overlayHTML.hide().appendTo('body');

            $('#ajax-content-overlay-inner').html('<div class="article"><h1 id="pagetitle">Ableitung berechnen</h1><div class="content"><table border="0" cellpadding="5" rules="all" style="width:100%;"><tbody><tr><td colspan="2" style="width:40%;"><strong><strong>Konstante Funktion&nbsp;&nbsp;</strong> <br></strong></td><td valign="top"><img align="middle"></td><td valign="top"><img align="middle"></td></tr><tr><td colspan="2" style="width:40%;"><strong>Potenzfunktion&nbsp; </strong><a href="/math/wiki/article/view/potenzfunktion"class="frontbox button ajax-content">Artikel zum Thema</a></td><td valign="top"><p><img align="middle"></p></td><td valign="top"><p align="center" class="Wirisformula" style="text-align:left;" title="Double click to edit"><img align="middle"></p></td></tr><tr><td colspan="2" style="width:40%;"><strong>Hyperbelfunktion&nbsp; </strong><a href="/math/wiki/article/view/gebrochenrationale-funktionen"class="frontbox button ajax-content">Artikel zum Thema</a></td><td colspan="1" rowspan="1"><img align="middle"></td><td colspan="1" rowspan="1"><p><img align="middle"></p></td></tr><tr><td colspan="2" style="width:40%;"><strong>Wurzelfunktion&nbsp; </strong><a href="/math/wiki/article/view/wurzelfunktion"class="frontbox button ajax-content">Artikel zum Thema</a></td><td><p><img align="middle"></p><p><img align="middle"></p></td><td><p><img align="middle"></p><p><img align="middle"></p></td></tr><tr><td colspan="2" style="width:40%;"><strong>e-Funktion&nbsp; </strong><a href="/math/wiki/article/view/e-funktion"class="frontbox button ajax-content">Artikel zum Thema</a></td><td><p><img align="middle"></p><img align="middle"></td><td><p>&nbsp;<img align="middle">&nbsp;&nbsp;</p><p><img align="middle"></p></td></tr><tr><td colspan="2" style="width:40%;"><strong>Exponentialfunktion </strong>&nbsp;<a href="/math/wiki/article/view/exponentialfunktion"class="frontbox button ajax-content">Artikel zum Thema</a></td><td><img align="middle"></td><td><img align="middle"></td></tr><tr><td colspan="2" style="width:40%;"><strong>ln-funktion</strong>&nbsp; <a href="/math/wiki/article/view/ln-funktion"class="frontbox button ajax-content">Artikel zum Thema</a></td><td colspan="1" rowspan="1"><img align="middle"></td><td colspan="1" rowspan="1"><img align="middle"></td></tr><tr><td colspan="2" style="width:40%;"><strong>Allgemeine Logarithmusfunktion</strong><strong></strong></td><td><img align="middle"></td><td><img align="middle"></td></tr><tr><td colspan="2" style="width:40%;"><strong>Trignonometrische Funktionen&nbsp;&nbsp; </strong><a href="/math/wiki/article/view/sinusfunktion-und-kosinusfunktion"class="frontbox button ajax-content">Artikel zum Thema</a></td><td colspan="1" rowspan="1"><p><img align="middle"></p><p><img align="middle"></p><p><img align="middle"></p></td><td colspan="1" rowspan="1"><p><img align="middle"></p><p><img align="middle"></p><p><img align="middle"></p></td></tr></tbody></table><p>&nbsp;</p><p>&nbsp;</p><p></p><h1>Ableitungsregeln</h1><table border="0" cellpadding="5" rules="all" style="width:100%;"><tbody><tr><td colspan="1" rowspan="1"><p><a href="/math/wiki/article/view/summenregel" class="frontbox">Summenregel</a></p></td><td colspan="1" rowspan="1"><img align="middle"></td></tr><tr><td colspan="1" rowspan="1">&nbsp;<a href="/math/wiki/article/view/produktregel" class="frontbox">Produktregel</a></td><td><p><img align="middle"></p><p><img align="middle"></p><p><img align="middle"></p></td></tr><tr><td colspan="1" rowspan="1" valign="bottom"><a href="/math/wiki/article/view/quotientenregel" class="frontbox">Quotientenregel</a></td><td colspan="1" rowspan="1" valign="bottom">&nbsp;<img align="middle"></td></tr><tr><td valign="top"><a href="/math/wiki/article/view/kettenregel" class="frontbox">Kettenregel</a></td><td valign="top"><img align="middle"></td></tr><tr><td valign="top"><a href="/math/wiki/article/view/umkehrfunktion" class="frontbox">Ableitung der Umkehrfunktion</a></td><td valign="top"><p><strong><img align="middle" ></strong></p></td></tr></tbody></table><p>&nbsp;</p><p>&nbsp;</p><h1>Beispielaufgaben</h1><p></p><div class="spoiler"><div class="head"><div class="icon"><img src="http://www.serlo.org/images/spoiler_down.png"></div><div class="title"><a href="javascript:return false;">Beispiele</a></div></div><div class="content" style="display: none;"><p></p><p></p><div class="exercise" data-showcomments="0" data-id="217" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender Funktionen mit Brüchen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=ce8a7286074f46e3d43978a29fdb12c5.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="218" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender Funktionen mit Brüchen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=606b35e1e33de5c7fd0a4076ea183ca8.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="2313" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die erste Ableitung folgender Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=151c5176152bebd9f7acffc6bca88c62.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="2314" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die erste Ableitung folgender Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=92acca53ae09dc605ea2b4a4c40c918e.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="156" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender e-Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=a06e6661a69ad2ccfa515690eb1d4b63.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="151" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender e-Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=ddd64a1fc9010f8f040248ba84d695c4.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="153" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender e-Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=d2dbe7c1cd7bf71f6c022fd3b0d43803.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="112" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender ln-Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=fec3241071a43b0c396bcfaa1c159dd4.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p><div class="exercise" data-showcomments="0" data-id="109" data-license=""data-disableprivs="1"><div class="group"><p>Bilde die Ableitung folgender ln-Funktionen.</p></div><div class="privileges"><div class="button solution_trigger solution_status_4">Lösung</div><div class="button menu">▼<div class="box" style="display: none;"></div></div></div><div class="content has_group"><p><img class="Wirisformula" title="Double click to edit" src="http://www.serlo.org/scripts/libs/tiny_mce/plugins/tiny_mce_wiris/integration/showimage.php?formula=6c8351cf688d6f613dd15d83095d227b.png"></p></div><div></div><div class="clear"></div><div class="hint" style="display: none;"><div class="hint_image"></div><div class="hint_inner"></div><div class="clear"></div></div><div class="solution" style="display: none;"></div><div class="clear"></div></div><p></p><p></p></div></div><p></p><p></p></div><div class="hr"></div><div class="links"><div class="linkedfolder"><b>Anwendung:</b><div class="folders_inner"><a href="/math/exercises/topics/show/Analysis/Ableitung/Ableitung-bilden" class="ajax-content">Aufgaben zum Thema</a></div></div><div class="folders"><b>Verwandte Artikel:</b><div class="folders_inner"><span class="folder"><a class="" href="/math/wiki/article/view/differenzierbarkeit">Differenzierbarkeit</a></span><span class="folder"><a class="" href="/math/wiki/article/view/ableitung">Ableitung</a></span></div></div></div><div class="feedback_trigger"><table><tbody><tr><td><div class="img"></div></td><td><div class="a">Fehler gefunden? Verbesserungsvorschlag?</div></td></tr></tbody></table></div><div class="feedback" style="display: none;"><input type="text" name="email" value="E-Mail" class="ereaseonclick feedback_email"><input type="text" name="subject" value="Betreff" class="ereaseonclick feedback_subject"><textarea class="feedback_content" name="content"></textarea><input id="64" class="forced_button" type="submit" value="Absenden"></div></div>');

            $('.close-overlay', this.$overlayHTML);
            $(this.$overlayHTML).on('click', '.close-overlay', this.onCloseClick);

            this.init();
        };

        AjaxOverlay.prototype.init = function(context) {
            $(context ||  this.options.context).on('click', this.options.linkSelector, this.onLinkClick);
        }

        AjaxOverlay.prototype.onLinkClick = function(e) {
            e.preventDefault();

            instance.bootAjaxContent($(this).attr('href'));

            return;
        }
        AjaxOverlay.prototype.onCloseClick = function(e) {
            e.preventDefault();

            instance.shutDownAjaxContent();

            return;
        }

        AjaxOverlay.prototype.bootAjaxContent = function(href, position) {
            var top = position || this.options.ajaxContentTop;

            $(this.options.context)
                .addClass(this.options.overlayActiveClass);


            this.$overlayHTML.css('top', top).show().addClass('active');

            $('#ajax-content-overlay-inner').css({
                height: $(this.options.context).height() - 350
            });

            // this.$overlayHTML.find('#ajax-content-overlay-inner').html('<iframe src="http://www.serlo.org' + href + '" width="100%" height="100%"/>');

            $.ajax({
                url: 'http://www.serlo.org' + href
            }).success(function(html) {
                this.$overlayHTML.find('#ajax-content-overlay-inner').html(html);
            }).error(function() {
                console.log(arguments);
            })
        }

        AjaxOverlay.prototype.shutDownAjaxContent = function() {
            $(this.options.context)
                .removeClass(this.options.overlayActiveClass);
            this.$overlayHTML.removeClass('active');
        }

        $.SerloAjaxOverlay = function(options) {
            /// only allow one instance
            return instance || (instance = new AjaxOverlay(options));
        }

    }(jQuery, window));
});