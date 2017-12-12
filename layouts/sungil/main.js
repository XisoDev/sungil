jQuery(document).ready(function ($) {
    $(document).on("scroll", onScroll);
});

function onScroll(event){
    var scrollPos = jQuery(document).scrollTop();
    console.log(scrollPos);
    if(scrollPos > 100){
        jQuery('.header').addClass('shrink');
    }else{
        jQuery('.header').removeClass('shrink');
    }
}
