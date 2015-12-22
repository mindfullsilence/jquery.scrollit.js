/**
 * Animated scroll of a page. Includes an interrupter that stops the animation
 * if the user scrolls.
 *a
 * options = {
 *  extraOffset : 0               amount of padding between top of element and window
 *  duration    : 500             Animation duration
 *  delay       : 0               Wait before scrolling
 *  window      : $('html,body')  Box to be scrolled (can set on div with overflow:scroll)
 * }
 */
(function($) {
  jQuery.fn.scrollIt = function( options ) {
    var t = this,
      isScrolling = false,
      queue = 'scroller',
      settings = $.extend({
        extraOffset : 0,
        duration : 500,
        delay : 0,
        window : $('html, body')
      }, options);

    function init() {
      isScrolling = true;
      beginScrolling();
      setInterrupt();
      return t;
    }

    function beginScrolling() {
      settings.window.delay(settings.delay).animate({
        scrollTop : t.offset().top + settings.extraOffset
      },{
        duration : settings.duration,
        queue : queue
      });
      settings.window.dequeue(queue);
    }

    function setInterrupt() {
      settings.window.on('touchstart mousewheel DOMMouseScroll', function() {
        if(isScrolling) {
          settings.window.stop('scroller', true, false).clearQueue(queue);
          isScrolling = false;
        }
      });
    }

    return init();
  };
}(jQuery));