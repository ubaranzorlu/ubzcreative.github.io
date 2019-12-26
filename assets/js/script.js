(($) => {
    $('.hamburger').click(() => {
        $('.hamburger').toggleClass('change');
        $('nav.ana-menu').toggleClass('ac');
    });
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $("header").addClass("bg-color");
        }else{
            $("header").removeClass("bg-color");
        }
    });
    $('body').bind('touchmove', function(e) {
        var scroll = $(this).scrollTop();
        if (scroll >= 100) {
            $("header").addClass("bg-color");
        }else{
            $("header").removeClass("bg-color");
        }
    });
    $('[data-toggle="tooltip"]').tooltip(); 

    $('#iletisim').submit(()=>{
        $('#sonuc').html('<div class="loader" style="margin:0 auto;"></div>');
          $.ajax({
              type: 'POST',
              url: 'https://server.baranzorlu.com/post.php',
              data: $('#iletisim').serialize(),
              success: function(data)
              {
                  if(data == "ok"){
                    $('#sonuc').html('<div class="alert alert-success" role="alert">Mesajınız başarıyla gönderilmiştir!</div>');
                  }else{
                    console.log(data);
                    $('#sonuc').html('<div class="alert alert-info" role="alert">Bir hata oluştu! Lütfen benimle başka bir yol ile iletişime geçin. <b>Hata Kodu: ' + data +'</b></div>');
                  }
              },
              error: function(error){
                console.log(error);
                $('#sonuc').html('<div class="alert alert-warning" role="alert">Bir hata oluştu! Lütfen benimle başka bir yol ile iletişime geçin. <b>Hata Kodu: ' + error +'</b></div>');
              }
              
          });
          return false;
      });

      $.getJSON('https://i.instagram.com/api/v1/users/7256942347/info/',(data) => {
        console.log(data.user.username);
        $('.profilepic').attr('src', data.user.profile_pic_url);
        $('.insta_username').html('@' + data.user.username);
      });
      $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=7256942347.5c4e5a5.fe801f40b5b04564a9a412ecc6ea3ca8',(data) => { 
      $.getJSON(data.data[0].link + '?__a=1', image => {
          console.log(image);
            $('#umut-big.anasayfa').css('background-image', 'url(' + image.graphql.shortcode_media.display_url + ')');
        });
      });


})(jQuery);
var feed = new Instafeed({
    get: 'user',
    userId: '7256942347',
    accessToken: '7256942347.5c4e5a5.fe801f40b5b04564a9a412ecc6ea3ca8',
    limit: 8
});
feed.run();
var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.LazyLoad=t()}(this,function(){"use strict";var e=function(e){var t={elements_selector:"img",container:document,threshold:300,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",callback_load:null,callback_error:null,callback_set:null,callback_enter:null};return _extends({},t,e)},t=function(e,t){return e.getAttribute("data-"+t)},n=function(e,t,n){return e.setAttribute("data-"+t,n)},r=function(e){return e.filter(function(e){return!t(e,"was-processed")})},s=function(e,t){var n,r=new e(t);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:r}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:r})}window.dispatchEvent(n)},o=function(e,n){var r=n.data_srcset,s=e.parentNode;if(s&&"PICTURE"===s.tagName)for(var o,a=0;o=s.children[a];a+=1)if("SOURCE"===o.tagName){var i=t(o,r);i&&o.setAttribute("srcset",i)}},a=function(e,n){var r=n.data_src,s=n.data_srcset,a=e.tagName,i=t(e,r);if("IMG"===a){o(e,n);var c=t(e,s);return c&&e.setAttribute("srcset",c),void(i&&e.setAttribute("src",i))}"IFRAME"!==a?i&&(e.style.backgroundImage='url("'+i+'")'):i&&e.setAttribute("src",i)},i="undefined"!=typeof window,c=i&&"IntersectionObserver"in window,l=i&&"classList"in document.createElement("p"),u=function(e,t){l?e.classList.add(t):e.className+=(e.className?" ":"")+t},d=function(e,t){l?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},f=function(e,t){e&&e(t)},_=function(e,t,n){e.removeEventListener("load",t),e.removeEventListener("error",n)},v=function(e,t){var n=function n(s){m(s,!0,t),_(e,n,r)},r=function r(s){m(s,!1,t),_(e,n,r)};e.addEventListener("load",n),e.addEventListener("error",r)},m=function(e,t,n){var r=e.target;d(r,n.class_loading),u(r,t?n.class_loaded:n.class_error),f(t?n.callback_load:n.callback_error,r)},b=function(e,t){f(t.callback_enter,e),["IMG","IFRAME"].indexOf(e.tagName)>-1&&(v(e,t),u(e,t.class_loading)),a(e,t),n(e,"was-processed",!0),f(t.callback_set,e)},p=function(e){return e.isIntersecting||e.intersectionRatio>0},h=function(t,n){this._settings=e(t),this._setObserver(),this.update(n)};h.prototype={_setObserver:function(){var e=this;if(c){var t=this._settings,n={root:t.container===document?null:t.container,rootMargin:t.threshold+"px"};this._observer=new IntersectionObserver(function(t){t.forEach(function(t){if(p(t)){var n=t.target;b(n,e._settings),e._observer.unobserve(n)}}),e._elements=r(e._elements)},n)}},update:function(e){var t=this,n=this._settings,s=e||n.container.querySelectorAll(n.elements_selector);this._elements=r(Array.prototype.slice.call(s)),this._observer?this._elements.forEach(function(e){t._observer.observe(e)}):(this._elements.forEach(function(e){b(e,n)}),this._elements=r(this._elements))},destroy:function(){var e=this;this._observer&&(r(this._elements).forEach(function(t){e._observer.unobserve(t)}),this._observer=null),this._elements=null,this._settings=null}};var y=window.lazyLoadOptions;return i&&y&&function(e,t){if(t.length)for(var n,r=0;n=t[r];r+=1)s(e,n);else s(e,t)}(h,y),h});
new LazyLoad();