(function($) {

    var $window = $(window),
        $body = $('body'),
        $main = $('#main'),
        $thumbs = $main.children('.thumb');

    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // images
    $thumbs.each(function() {
        var $this = $(this),
            $image = $this.find('.image'), $image_img = $image.children('img'),
            position = $image_img.data('position');

        $image.css('background-image', 'url(' + $image_img.attr('src') + ')');

        if (position)
            $image.css('background-position', position);

        $image_img.hide();
    });

})(jQuery);
