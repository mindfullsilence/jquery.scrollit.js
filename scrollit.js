/**
 * Animated scroll of a page. Includes an interrupter that stops the animation
 * if the user scrolls.
 *
 * @type {{
 *  target: (*|jQuery|HTMLElement),       The element to scroll to
 *  extraOffset: number,                  Offset from target for extra padding
 *  duration: number,                     Length of animation in milliseconds
 *  delay: number,                        Wait before scrolling in milliseconds
 *  isScrolling: boolean,                 utility, do not use
 *  init: Function,                       utility, do not use
 *  scroll: Function}}                    call the scroll with scrollIt.scroll({options})
 */
var scrollIt = {
  target : $('body'),
  extraOffset : 0,
  duration : 500,
  delay : 0,
  isScrolling : false,
  init : function(options) {
    var self = this;
    $.extend(self, options);
  },
  scroll : function(options) {
    var $hb = $('html, body'),
      self = this;
    
    self.init(options);
    self.isScrolling = true;
    $hb.delay(self.delay).animate({
      scrollTop : self.target.offset().top + self.extraOffset
    },
    {
      duration : self.duration,
      queue : 'scroller'
    });
    $hb.dequeue('scroller');
    $hb.on('touchStart mousewheel DOMMouseScroll', function() {
      if(self.isScrolling) {
        $hb.stop('scroller', true, false).clearQueue('scroller');
        self.isScrolling = false;
      }
    });
  }
};