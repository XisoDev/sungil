(function($) {
    // plugin name: scrollForever
    // plugin author: caibaojian
    // plugin url: http://caibaojian.com/scrollForever
    // plugin demo: http://caibaojian.com/demo/scrollForever/
    // license: MIT
    $.fn.scrollForever = function(options) {
        var defaults = {
            placeholder: 0,//�욆퓹瀯�퍣�ⓩ뿶驪뤸А�꾣퍚�②퇌獵삼펽��빳�ゅ츣阿됵펽倻귝옖亦→쐣�ゅ츣阿됧닕��
            dir: 'left',//譯싧뒯�밧릲竊똪eft & top
            container: 'ul',//鸚뽩콆野배괌
            inner: 'li',//�낂깿�껆킔
            speed: 1000,//�욆퓹瀯�퍣�③�잌벧
            delayTime: 0,//譯싧뒯�닻슂
            continuous: true,//��맔瓦욅뺌
            num: 1//�욆퓹瀯��轝→퍣�①쉪�곈뇧
        };
        var opts = $.extend({}, defaults, options);
        var placeHolder = opts.placeholder;
        var dir = opts.dir;
        var speed = opts.speed;
        var Time = opts.Time;
        var num = opts.num;
        var delayTime = opts.delayTime;
        return this.each(function() {
            var obj = $(this);
            var container = obj.find(opts.container);
            var inner = container.find(opts.inner);
            var len = inner.length;
            var distance, scrollDistance, scrollTime, resizeTimer, cloneFlag=true, innerWidth, innerHeight;
            //譯싧뒯�띸쉪�녶쨭藥δ퐳
            function setScroll() {
                innerWidth = inner.outerWidth();
                innerHeight = inner.outerHeight();
                if (opts.continuous) {
                    if (dir == 'left') {
                        distance = innerWidth * len;
                        container.css('width', 2 * distance);
                        if(cloneFlag){
                            inner.clone().appendTo(container);
                            cloneFlag = false;
                        }
                    } else if (dir == 'top') {
                        distance = innerHeight * len;
                        container.css('height', 2 * distance);
                        if(cloneFlag){
                            inner.clone().appendTo(container);
                            cloneFlag = false;
                        }
                    }
                } else {
                    if (dir == 'left') {
                        placeHolder = placeHolder != 0 ? placeHolder : innerWidth * num;
                        distance = innerWidth * (len + 1);
                        container.css('width', distance);
                    } else if (dir == 'top') {
                        placeHolder = placeHolder != 0 ? placeHolder : innerHeight * num;
                        distance = innerHeight * (len + 1);
                        container.css('height', distance);

                    }
                }
            }

            $(window).on("resize",function(){
                clearTimeout(resizeTimer);
                resizeTimer =  setTimeout(setScroll,250);
            })
            setScroll();
            function autoScroll() {

                if (opts.continuous) {
                    //�좂폓訝띺뿴閭뉑퍣��
                    if (dir == 'left') {
                        scrollDistance = obj.scrollLeft();
                        if (scrollDistance >= distance) {
                            obj.scrollLeft(0);
                        } else {
                            obj.scrollLeft(scrollDistance + 1);
                        }
                    } else if (dir == 'top') {
                        scrollDistance = obj.scrollTop();
                        if (scrollDistance >= distance) {
                            obj.scrollTop(0);
                        } else {
                            obj.scrollTop(scrollDistance + 1);
                        }
                    }
                } else {
                    //�욆퓹瀯�퍣�⑨펽�닸뼪�좂폓譯싧뒯
                    if (dir == 'left') {
                        container.animate({
                            marginLeft: '-' + placeHolder
                        }, speed, function() {
                            container.css({
                                marginLeft: 0
                            }).find(opts.inner + ":lt(" + num + ")").appendTo(container);
                        });
                    } else if (dir == 'top') {
                        container.animate({
                            marginTop: "-" + placeHolder
                        }, speed, function() {
                            container.css({
                                marginTop: 0
                            }).find(opts.inner + ":lt(" + num + ")").appendTo(container);
                        });
                    }
                }

            }

            //譯싧뒯�썸빊
            var aTime = opts.continuous == true ? 20 : 2000;
            delayTime = delayTime == 0 ? aTime : delayTime;
            scrollTime = setInterval(autoScroll, delayTime);
            obj.hover(function() {
                clearInterval(scrollTime);
            }, function() {
                scrollTime = setInterval(autoScroll, delayTime);
            });
        })
    }
})(jQuery);