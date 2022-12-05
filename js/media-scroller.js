let interval;

$('.arrow').on('mousedown', ({ target }) => {
    const type = target.classList[1];
    const scrollArea = $(target).parent().find('.media-scroller');

    interval = setInterval(() => {
        let prev = scrollArea.scrollLeft();
        scrollArea.scrollLeft(type == 'left-arrow' ? prev - 100 : prev + 100);
    }, 50);
}).on('mouseup mouseleave', () => {
    clearInterval(interval);
});

$('.media-scroller').on('scroll', ({ target }) => {
    const left = $(target).parent().find('.left-arrow');
    const right = $(target).parent().find('.right-arrow');

    const scroll = $(target).scrollLeft();
    const fullWidth = $(target)[0].scrollWidth - $(target)[0].offsetWidth;

    if (scroll === 0) {
        left.addClass('hide');
    } else {
        left.removeClass('hide');
    }
    
    if (scroll >= fullWidth - 1) {
        right.addClass('hide');
    } else {
        right.removeClass('hide');
    }
});