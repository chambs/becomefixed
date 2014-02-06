//how to use:
// http://jsfiddle.net/chambs/s62UV/

(function($) {

    //run all of this for every element on the selector
    function runPlugin(elm, options) {
        
        var top = elm.position().top,
            w = elm.outerWidth(),
            wcss = elm[0].style.width,
            left = elm.position().left;
        
        //reset everything if the screen get resized
        $(window).on('resize', function() {
            elm.css({
                position: 'static',
                top: top,
                width: wcss
            });
            
            top = elm.position().top,
            w = elm.outerWidth(),
            wcss = elm[0].style.width,
            left = elm.position().left;
        });

        //when the element reahces the top of the window, fix it
        $(document).on('scroll', function() {
            if($(this).scrollTop() >= (top - options.stopPoint)) {
                elm.css({
                    position: 'fixed',
                    top: options.stopPoint || 0,
                    width: w,
                    left: left
                });
            } else {
                elm.css({
                    position: 'static',
                    top: top,
                    width: wcss
                });
            }
        });
    }
    
    //the actual plugin
    $.fn.becomeFixed = function(options) {
        if(!options) {
            options = {};
        }
        
        if(!options.stopPoint) {
            options.stopPoint = 0;
        }
        
        this.each(function(idx, data) {
            runPlugin($(data), options);
        });
    };
})(jQuery);