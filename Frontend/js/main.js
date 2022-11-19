(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);


// console.log('ATTACHED')

function getuser() {
    fetch('http://localhost:3000/api/auth/access', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'auth_token':`${localStorage.getItem('user_token')}`
        }
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status === 0) {
                document.getElementById('userData').innerHTML=`<p style="margin: 0; padding: 0; font-size: 20px;">Welcome ${res.data.name} ( ${res.data.email}) </p>`;
                document.getElementById('userData').style.display= 'block'
                document.getElementById('logoutUI').style.display= 'block'
                document.getElementById('loginUI').style.display= 'none'
            }else{
                localStorage.removeItem('user_token')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

if(localStorage.getItem('user_token')){
    getuser();
}

function logout(){
    localStorage.removeItem('user_token');
    location.reload();
}