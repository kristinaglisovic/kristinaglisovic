/*global*/
kreiranjeGalerije();
kreiranjeMenija();

//body fade
document.body.classList.add('fade');
  document.addEventListener("DOMContentLoaded", function(e) {
    document.body.className = '';
  });


//onload anim
$(function () {
    validate();
});

//fade-scroll
$(function(){
    var documentElements=$(document),
    fadeElem=$('.fade-scroll');
    documentElements.on('scroll', function(){
        var currScrollPosition=documentElements.scrollTop();
        fadeElem.each(function() {
            var $this=$(this),
            elemOffsetTop=$this.offset().top;
            if(currScrollPosition>elemOffsetTop)
            $this.css('opacity', 1-(currScrollPosition-elemOffsetTop)/600)
        });
    });
});

//promena logoa u meniju nakon skrola
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('.navbar .navbar-brand img').attr('src', 'img/logo2.png');
        }
        if ($(this).scrollTop() < 10) {
            $('.navbar .navbar-brand img').attr('src', 'img/logo.png');
        }
    })
});

//promena boje linkova nakon skrola
$(function () {
    $(document).scroll(function () {
        var $nav = $("#navbarResponsive a");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

//MENI

function kreiranjeMenija() {
    var menuList = document.querySelector("#menuList");
    var menuItems = ["HOME", "ABOUT", "GALLERY", "CONTACT", "DOCS", "AUTHOR"];
    var menuItemsLength = menuItems.length;
    var url = window.location.href; //pera#sara => url.split("#")[1] = sara
    var pageSelected = url.split("#")[1]; //contact, home
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0); //koliko je u px zaskrolovana str
    var fullHeight = window.document.documentElement.scrollHeight; //visina stranice
    var ratioOfHome = fullHeight / 3.8; //home je na punoj visini/3.8, zavisi od ekrana..time sprecavamo bag sencenja home-a ako se nalazimo u galeriji
    for (let i = 0; i < menuItemsLength; i++) {
        let liNode = document.createElement("li");
        liNode.setAttribute("class", "nav-item");
        let aNode = document.createElement("a");
        if (pageSelected) {
            let currentPage = menuItems[i].toLowerCase() == pageSelected.toLowerCase();
            aNode.setAttribute("class", "nav-link" + (currentPage ? ' prvi ' : ' ') + "js-scroll-trigger");
        } else {
            //ako se stane na home stavlja se klasa prvi koja vazi samo za njega i ako je top<=od ratio-a, to znaci da se nalazimo u home sekciji
            if (menuItems[i].toLowerCase() == "home" && top <= ratioOfHome) {
                aNode.setAttribute("class", "nav-link prvi js-scroll-trigger");
            } else {
                //ako ne stavlja se najnormalniji
                aNode.setAttribute("class", "nav-link js-scroll-trigger");
            }
        }
        switch (menuItems[i]) {
            //ako je autor, vodi na autora itd...
            case "AUTHOR":
                aNode.setAttribute("href", "author.html");
                break;
            case "DOCS":
                aNode.setAttribute("href", "docs.pdf");
                break;
            default:
                aNode.setAttribute("href", "#" + menuItems[i].toLowerCase());
                break;
        }
        //append
        aNode.innerText = menuItems[i];
        liNode.appendChild(aNode);
        menuList.appendChild(liNode);
    }
};


//GALERIJA
//kreiranje galerije
function kreiranjeGalerije() {
    var slike = [{
        path: "img/11.jpg",
        alt: "girlhat"
    },
    {
        path: "img/22.jpg",
        alt: "girlglasses"
    },
    {
        path: "img/33.jpg",
        alt: "blonde"
    },
    {
        path: "img/44.jpg",
        alt: "ninja"
    },
    {
        path: "img/55.jpg",
        alt: "posing"
    },
    {
        path: "img/66.jpg",
        alt: "posing"
    }
    ];

    let html = "";
    for (let i = 0; i < slike.length; i++) {
        html +=
            `<img src="` + slike[i].path + `" alt="` + slike[i].alt + `"/>`
    }
    var wrapper = document.querySelector(".slike");
    wrapper.innerHTML = html;
}


//galerija zoom efekat
$(".slike img").click(function () {
    $(this).addClass("zoom");
});

$(".slike img").mouseleave(function () {
    $(this).removeClass("zoom");
});


//about sekcija sa recima
let i = 0;
//nasumicna rec
const randomTekst = () => {
    const rec = document.querySelector('.random-word');
    //dohvatanje css vrednosti
    const compStyles = window.getComputedStyle(rec);
    //animacija
    const animation = compStyles.getPropertyValue('animation');
    const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;

    //ispisane reci
    const reci = ['PHOTOGRAPHER', 'VIDEOGRAPHER', 'GUITAR PLAYER', 'WEB DEVELOPER', 'SINGER'];

    //i random broj
    i = randomNum(i, reci.length);
    const newPhrase = reci[i];
    //vreme
    setTimeout(() => {
        rec.textContent = newPhrase;
    }, 300); //vreme za modifikaciju opacity-a da hittuje 0 pre promene reci
}
//j  Math.random()---[0-1) //
const randomNum = (num, max) => {
    let j = Math.floor(Math.random() * max);

    //obezbedjen uvek random broj
    if (num === j) {
        return randomNum(i, max);
    } else {
        return j;
    }
}
//fja animationTime
const getAnimationTime = () => {
    const rec = document.querySelector('.random-word');
    //css vred
    const compStyles = window.getComputedStyle(rec);
    let animation = compStyles.getPropertyValue('animation');
    const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
    return animationTime;
}

//pozivanje
randomTekst();
setInterval(randomTekst, getAnimationTime());


//scroll top dugme
const btnTop = document.querySelector("#btnTop");
btnTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});

//prikaz top dugmeta nakon odredjenog skrola po visini
var topDugme = document.getElementById("btnTop");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        topDugme.style.display = "block";
    } else {
        topDugme.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//testimonials
const slides = document.querySelector(".slider").children;
const indicatorImages = document.querySelector(".slider-indicator").children;

for (let i = 0; i < indicatorImages.length; i++) {
    indicatorImages[i].addEventListener("click", function () {
        for (let j = 0; j < indicatorImages.length; j++) {
            indicatorImages[j].classList.remove("active");
        }
        this.classList.add("active");
        const id = this.getAttribute("data-id");
        for (let j = 0; j < slides.length; j++) {
            slides[j].classList.remove("active");
        }

        slides[id].classList.add("active");
    })
}

//forma-validacija 
function validate() {
    //panel koji iskace ako je forma dobra
    var successPanel = $("#success");
    successPanel.hide();
    //elements
    let formData = [];
    let btnSend = $('#btnSend');
    btnSend.click(function () {
        let firstName = $('#FirstName');
        let lastName = $("#LastName");
        let email = $("#Email");
        let message = $("#Msg");

        //regex
        let regIme = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,18}$/;
        let regPrezime = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,20}$/;
        let regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; //bez čćšđž
        let regPoruka = /^([1-zćčžđšA-ZČĆŠĐŽ0-1@.\s]{1,255})$/; //sprecava sumljiv kod kao npr  17454' string ili \*&gt;$&lt;&amp;

        //provera

        //niz gresaka
        let errors = [];
        //poruka greske
        let errorMsg = "";
        //firstName
        if (firstName.val() == '') {
            firstName.css({
                'border': '2px solid red',
            });
            firstName.val(''); //reset
            errorMsg = 'First name can\'t be empty';
            firstName.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regIme.test(firstName.val())) {
            firstName.css({
                'border': '2px solid red',
            });
            firstName.val("");
            errorMsg = 'eg. Marko';
            firstName.attr("placeholder", errorMsg);
            errors.push(errorMsg);
        } else {
            firstName.css({
                'border': '2px solid #64a19d',
            });
            formData.push(firstName.val());
        }

        //lastName
        if (lastName.val() == '') {
            lastName.css({
                'border': '2px solid red',
            });
            lastName.val(''); //reset
            errorMsg = "Last name can\'t be empty";
            lastName.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regPrezime.test(lastName.val())) {
            lastName.css({
                'border': '2px solid red',
            });
            lastName.val("");
            errorMsg = "eg. Marković";
            lastName.attr("placeholder", errorMsg);
            errors.push(errorMsg);
        } else {
            lastName.css({
                'border': '2px solid #64a19d',
            });
            formData.push(lastName.val());
        }
        //email
        if (email.val() == '') {
            email.css({
                'border': '2px solid red',
            });
            email.val(''); //reset
            errorMsg = "Email can't be empty";
            email.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regEmail.test(email.val())) {
            email.css({
                'border': '2px solid red',
            });
            email.val('');
            errorMsg = "eg. somebody@example.com";
            email.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else {
            email.css({
                'border': '2px solid #64a19d',
            });
            formData.push(email.val());
        }

        //message
        if (message.val() == '' || message.val() == "Message can't be empty") {
            message.css({
                'border': '2px solid red',
            });
            message.val(''); //reset
            errorMsg = "Message can't be empty";
            message.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regPoruka.test(message.val())) {
            message.css({
                'border': '2px solid red',
            });
            message.val('');
            errorMsg = "Message can't contain malicious code";
            message.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else {
            message.css({
                'border': '2px solid #64a19d',
            });
            formData.push(message.val());
        }

        //ako nema greske i ako je forma ispravna
        if (errors.length == 0) {
            successPanel.fadeIn();
            successPanel.html("<p class='text-center'>Message has been sent!</p><p class='text-center'>KG will contact you as soon as possible!</p>");
            setTimeout(() => {
                successPanel.fadeOut();
                successPanel.html(""); //praznjenje
            }, 5000);
            //poljaforme za reset
            formControls = [firstName, lastName, email, message];
            resetForm(formControls);
        }
    });
}

//RESET FORME
function resetForm(controls) {
    //prolazi kroz sve kontrole i setuje na prazan string
    controls.forEach(control => {
        control.val("");
    })
}

 
/*--------------------TEMPLATE JS KOD--------------------*/
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ?
                target :
                $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate({
                    scrollTop: target.offset().top - 70,
                },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict