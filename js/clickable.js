// Add link to all the clickable divs that have class .clickable
// and have a data-href attribute
$(document).ready(function() {
    $('.clickable').each(function() {
        // If .clickable div has a data-href attribute
        if ($(this).data("href")) {
            // Add onclick to .clickable div (current location + data-href)
            $(this).click(function() {
                window.location = $(this).data("href");
            });
        }
    });
});