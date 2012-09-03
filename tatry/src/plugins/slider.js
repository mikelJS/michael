(function (global){
    "use strict";
    var imageIndex = 0,
        imageWidth = 600;

    global.slider = {
        init: function () {
            console.log('slider.init');
            this.prepareImages();
            this.arrowSwitch();
            //this.autoSwitch();
            this.bulletSwitch();
        },
        prepareImages: function () {
            console.log('slider.prepareImages');
            $('.wrap img').each(function (i){
                $(this).css({'left': i*imageWidth});
            });
        },
        switchImages: function (direction) {
            console.log('slider.switchImages');
            direction = direction || '-';
            var imageLength = $('.wrap img').length;
            imageIndex = imageIndex + parseInt(direction + 1,10);
            if (imageIndex > -1*imageLength) {
                imageIndex = 0;
                slider.prepareImages();
            } else if (imageIndex > 0) {
                imageIndex = -1*imageLength + 1;
                $('.wrap img').each(function (i){
                    $(this).animate({'left':direction + '=' + imageWidth*imageIndex});
                });
            } else {
                $('.wrap img').each(function (i){
                $(this).animate({'left':direction + '=' + imageWidth});
            });
        }
    },
        autoSwitch: function () {
        console.log('autoSwitch');
        setInterval(function(){
                slider.switchImages();
                console.log('interval');
            }, 10000);
        },
        arrowSwitch: function () {
            $('.links a').on('click', function(e){
                if($(this).hasClass('left')) {
                    slider.switchImages('+');
                } else {
                    slider.switchImages('-');
                }
                e.preventDefault();
            })
        },
        bulletSwitch: function () {
           console.log('bulletSwitch');
           var imgLength = $('.wrap img').length;
           for(var i=0; i<imgLength; i++) {
               console.log('imgLength');
               var link = $("<a href=''></a>");
               link.on('click',function(e){
                   var bulletIndex = $(this).index();
                   imageIndex = bulletIndex;
                   slider.prepareImages()
                   $('.wrap img').each(function (i){
                       $(this).animate({'left': '-=' + imageWidth*imageIndex});
                   });
                   e.preventDefault();
               });
               $('.ball').append(link);
           }
        }
    };

    $(function (){
        slider.init();
    })

}(this));