(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.plugins, {
        'bootstrap-grid': function (context) {
            var ui = $.summernote.ui;

            // add bootstrap-grid button
            context.memo('button.bootstrap-grid', function () {
                // create button
                var button = ui.buttonGroup([
                    ui.button({
                        className: 'dropdown-toggle',
                        contents: '<i class="glyphicon glyphicon-th"/> <span class="note-icon-caret"></span>',
                        tooltip: "Kolommen",
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    ui.dropdown({
                        className: 'dropdown-menu dropdown-style text-grey-800 bg-white',
                        contents:
                            "<li><a href=\"#\" data-colclass=\"6\" data-colcount=\"2\" class=\"text-grey-800\">2 kolommen</a></li>" +
                            "<li><a href=\"#\" data-colclass=\"4\" data-colcount=\"3\" class=\"text-grey-800\">3 kolommen</a></li>" +
                            "<li><a href=\"#\" data-colclass=\"3\" data-colcount=\"4\" class=\"text-grey-800\">4 kolommen</a></li>",
                        callback: function ($dropdown) {
                            $dropdown.find('li a').each(function () {
                                $(this).click(function() {
                                    var colCount = $(this).data().colcount,
                                        colClass = $(this).data().colclass,
                                        row = document.createElement('div');

                                    row.className = 'row';

                                    for(var i = 0; i < colCount; i++){
                                        var col = document.createElement('div'),
                                            p = document.createElement('p');
                                        col.className = 'col-md-'+colClass;
                                        p.innerHTML = "Kolom";

                                        col.appendChild(p);
                                        row.appendChild(col);
                                    }

                                    context.invoke("editor.insertNode", row);

                                    return false;
                                });
                            });
                        }
                    })
                ]).render();

                return button;
            });
        }
    });
}));
