
!(function($) {
  "use strict";

  // Toggle .header-scrolled class to #header when page is scrolled
  /*$(window).scroll(function() {
    if ($(this).scrollTop() > 10) {
      $('#header').addClass('header-scrolled');
      $('#logoo').addClass('logo2');
      $('#logoo').removeClass('logo');
      $('#nav').addClass('nav-menu2');
      $('#nav').removeClass('nav-menu');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#logoo').addClass('logo');
      $('#logoo').removeClass('logo2');
      $('#nav').addClass('nav-menu');
      $('#nav').removeClass('nav-menu2');
    }
  });*/
  function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        var scrollto = target.offset().top;
        var scrolled = 20;
        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()
          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }
        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });
    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    margin: 25,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  function chooseLanguageNavbar(lang) {
    if(lang === 'pt') {
      let br_object_navbar = {home: 'Inicio', hiw: 'Como funciona', about: 'Sobre', iv: 'Vídeos Informativos', language: 'Idiomas'}
      $('#nav_home').text(br_object_navbar.home);
      $('#nav_hiw').text(br_object_navbar.hiw);
      $('#nav_about').text(br_object_navbar.about);
      $('#nav_iv').text(br_object_navbar.iv);
      $('#nav_lang').text(br_object_navbar.language);
      $('#who').attr("src", "./assets/img/who-logo.png");
      $('#unicef').attr("src", "./assets/img/unicef-horizontal.png");
      $('#footer-who').attr("src", "./assets/img/who-europe-white.png");
      $('#footer-unicef').attr("src", "./assets/img/unicef-eu-asia.png");
    } else if(lang === 'en') {
      let en_object_navbar = {home: 'Home', hiw: 'How it works', about: 'About', iv: 'Videos', language: 'Languages'}
      $('#nav_home').text(en_object_navbar.home);
      $('#nav_hiw').text(en_object_navbar.hiw);
      $('#nav_about').text(en_object_navbar.about);
      $('#nav_iv').text(en_object_navbar.iv);
      $('#nav_lang').text(en_object_navbar.language);
      $('#who').attr("src", "./assets/img/who-logo.png");
      $('#unicef').attr("src", "./assets/img/unicef-horizontal.png");
      $('#footer-who').attr("src", "./assets/img/who-europe-white.png");
      $('#footer-unicef').attr("src", "./assets/img/unicef-eu-asia.png");
    } else if(lang === 'ru') {
      let ru_object_navbar = {home: 'Дом', hiw: 'Как это устроено', about: 'Около', iv: 'Видеоматериалы', language: 'Языки'}
      $('#nav_home').text(ru_object_navbar.home);
      $('#nav_hiw').text(ru_object_navbar.hiw);
      $('#nav_about').text(ru_object_navbar.about);
      $('#nav_iv').text(ru_object_navbar.iv);
      $('#nav_lang').text(ru_object_navbar.language);
      $('#who').attr("src", "./assets/img/who-europe-white.png");
      $('#unicef').attr("src", "./assets/img/unicef-eu-asia.png");
      $('#footer-who').attr("src", "./assets/img/who-logo.png");
      $('#footer-unicef').attr("src", "./assets/img/unicef-horizontal.png");
    }
    chooseLanguageTitles(lang);
  }

  function chooseLanguageTitles(lang) {
    if(lang === 'pt') {
      let br_object_titles = {hiw: 'Pergunte-me sobre COVID-19', about: 'O que é HealthBuddy', iv: 'Videos Informativos'}
      $('#title_hiw').text(br_object_titles.hiw);
      $('#title_about').text(br_object_titles.about);
      $('#title_iv').text(br_object_titles.iv);
    } else if(lang === 'en') {
      let en_object_titles = {hiw: 'Ask me about COVID-19', about: 'About HealthBuddy', iv: 'Videos'}
      $('#title_hiw').text(en_object_titles.hiw);
      $('#title_about').text(en_object_titles.about);
      $('#title_iv').text(en_object_titles.iv);
    } else if(lang === 'ru') {
      let ru_object_titles = {hiw: 'Как это устроено', about: 'Что такое HealthBuddy', iv: 'Видеоматериалы'}
      $('#title_hiw').text(ru_object_titles.hiw);
      $('#title_about').text(ru_object_titles.about);
      $('#title_iv').text(ru_object_titles.iv);
    }
    chooseLanguageInfo(lang);
  }

  function chooseLanguageInfo(lang) {
    if(lang === 'pt') {
      let br_object_info = {hiw: 'Olá, sou HealthBuddy. Basta entrar em contato comigo pela janela de bate-papo e eu darei informações sobre a nova doença de coronavírus (COVID-19). Pergunte qualquer coisa sobre o vírus, a doença e a pandemia, e encontrarei as informações para você, de fontes confiáveis da OMS e da UNICEF. Antes de começar, aqui estão as diferentes opções que você tem para falar comigo:',
                            about: 'O HealthBuddy é uma iniciativa conjunta do Escritório Regional da OMS para a Europa e do Escritório Regional da Europa e Ásia Central da UNICEF. Está disponível em várias mídias sociais e plataformas de mensagens instantâneas para usuários de todo o mundo para fornecer conselhos científicos e baseados em evidências. Há muitas informações erradas e mitos sobre o novo coronavírus (vírus COVID-19) circulando na Internet e nas mídias sociais. A desinformação é um dos maiores desafios no combate ao COVID-19. É por isso que é importante ter cuidado ao procurar informações e conselhos.'}
      $('#info_hiw').text(br_object_info.hiw);
      $('#info_about').text(br_object_info.about);
      $('.hiw_points_en').hide();
      $('.hiw_points_ru').hide();
      $('.hiw_points_br').show();
    } else if(lang === 'en') {
      let en_object_info = {hiw: 'Hi, I’m your HealthBuddy. Send me a text in the chat window and I will give you information about the novel coronavirus disease (COVID-19), from the trusted sources of WHO and UNICEF.',
                            about: 'There is a lot of misinformation and myths about the new coronavirus (COVID-19 virus) circulating on the Internet and in social media. Misinformation is one of the biggest challenges in fighting COVID-19. This is why it’s important to be careful where you look for information and advice.'}
      $('#info_hiw').text(en_object_info.hiw);
      $('#info_about').text(en_object_info.about);
      $('.hiw_points_en').show();
      $('.hiw_points_ru').hide();
      $('.hiw_points_br').hide();
    } else if(lang === 'ru') {
      let ru_object_info = {hiw: 'Привет, я – HealthBuddy. Отправьте мне текст в окне чата, и я предоставлю вам информацию о новом коронавирусном заболевании (COVID-19) из надежных источников ВОЗ и ЮНИСЕФ.',
                            about: 'В Интернете и в социальных сетях распространяется огромное количество ложной информации и мифов о новом коронавирусе (вирусе COVID-19). Ложная информация – одна из самых больших проблем в борьбе с COVID-19. Вот почему важно быть осторожным при поисках информации и рекомендаций.'}
      $('#info_hiw').text(ru_object_info.hiw);
      $('#info_about').text(ru_object_info.about);
      $('.hiw_points_en').hide();
      $('.hiw_points_br').hide();
      $('.hiw_points_ru').show();
    }
    chooseLanguageFeatures(lang);
  }
  
  function chooseLanguageFeatures(lang) {
    if(lang === 'pt') {
      let br_object_features_title = {one: 'Suporte multicanal', 
                                      two: 'Suporte multilíngue', 
                                      three: 'Pergunte a especialistas sobre COVID-19', 
                                      four: 'Denunciar Fake News (em breve)'};
      let br_object_features_subtitle =  {one: 'integrar com a rede social, mensagens instantâneas, SMS, chamadas de voz e muito mais', 
                                          two: 'O HealthBuddy detectará automaticamente o idioma do seu navegador e, se houver suporte, falará automaticamente nesse idioma.', 
                                          three: 'O seu consultor de saúde virtual, HealthBuddy, apoiado por especialistas da OMS e UNICEF, fornecerá informações úteis e precisas sobre o COVID-19: por exemplo, dicas sobre como se proteger e a outras pessoas, e como reduzir o risco de infecção. Encontre respostas para suas perguntas aqui e compartilhe com seus amigos, colegas e familiares.', 
                                          four:'Você pode fazer sua parte no combate ao vírus, denunciando notícias e boatos falsos. Se você ouvir rumores ou declarações falsas em sua comunidade ou região, poderá denunciá-lo aqui. O HealthBuddy irá compilá-los e combatê-los aqui com informações científicas.'};
      $('#title_feature1').text(br_object_features_title.one);
      $('#title_feature2').text(br_object_features_title.two);
      $('#title_feature3').text(br_object_features_title.three);
      $('#title_feature4').text(br_object_features_title.four);

      $('#subtitle_feature1').text(br_object_features_subtitle.one);
      $('#subtitle_feature2').text(br_object_features_subtitle.two);
      $('#subtitle_feature3').text(br_object_features_subtitle.three);
      $('#subtitle_feature4').text(br_object_features_subtitle.four);
    } else if(lang === 'en') {
      let en_object_features_title = {one: 'Multi-channel support' , 
                                      two: 'Multi-language support', 
                                      three: 'Accurate COVID-19 information', 
                                      four: 'Fighting rumours and fake news'};
      let en_object_features_subtitle =  {one: 'HealthBuddy is available on multiple social media and instant messaging platforms in Europe to provide users with scientific and evidence-based advice.', 
                                          two: 'HealthBuddy detects the language of your browser and, if supported, will automatically speak in that language. You can also change the language from the languages menu.', 
                                          three: 'HealthBuddy is supported by experts from WHO and UNICEF and will provide you with accurate information on COVID-19.',
                                          four: 'If you hear any rumours or fake statements in your community or region, you can report it to us here. HealthBuddy will compile them and counter them here with scientific information.'};
      $('#title_feature1').text(en_object_features_title.one);
      $('#title_feature2').text(en_object_features_title.two);
      $('#title_feature3').text(en_object_features_title.three);
      $('#title_feature4').text(en_object_features_title.four);

      $('#subtitle_feature1').text(en_object_features_subtitle.one);
      $('#subtitle_feature2').text(en_object_features_subtitle.two);
      $('#subtitle_feature3').text(en_object_features_subtitle.three);
      $('#subtitle_feature4').text(en_object_features_subtitle.four);
    } else if(lang === 'ru') {
      let ru_object_features_title = {one: 'Многоканальная поддержка' , 
                                      two: 'Многоязыковая поддержка', 
                                      three: 'Точная информация о COVID-19', 
                                      four: 'Борьба со слухами и недостоверными новостями'};
      let ru_object_features_subtitle =  {one: 'Приложение HealthBuddy доступно в самых различных социальных сетях и платформах обмена мгновенными сообщениями в Европе и предоставляет пользователям научные рекомендации, основанные на доказательных данных.', 
                                          two: 'HealthBuddy определяет язык вашего браузера и при наличии поддержки данного языка автоматически переходит на этот язык. Вы можете также изменить язык в языковом меню.', 
                                          three: 'Приложение HealthBuddy работает при поддержке экспертов ВОЗ и ЮНИСЕФ и предоставляет вам точную информацию о COVID-19.', 
                                          four: 'Если в вашем сообществе или регионе до вас доходят какие-либо слухи или недостоверные заявления, вы можете сообщить нам об этом здесь. HealthBuddy соберет и опровергнет их здесь при помощи научной информации.'};
      $('#title_feature1').text(ru_object_features_title.one);
      $('#title_feature2').text(ru_object_features_title.two);
      $('#title_feature3').text(ru_object_features_title.three);
      $('#title_feature4').text(ru_object_features_title.four);

      $('#subtitle_feature1').text(ru_object_features_subtitle.one);
      $('#subtitle_feature2').text(ru_object_features_subtitle.two);
      $('#subtitle_feature3').text(ru_object_features_subtitle.three);
      $('#subtitle_feature4').text(ru_object_features_subtitle.four);
    }
    chooseLanguageFooterHeader(lang)
  }

  function chooseLanguageFooterHeader(lang) {
    if(lang === 'pt') {
      let br_object_footer = {copyright: 'HealthBuddy é alimentado por Bothub © 2020 Todos os direitos reservados.', policy: 'Clique aqui para ver nossa política de privacidade'}
      let br_object_header = {slogan: 'Seu amigo para obter informações sobre COVID-19.', slogan2: 'A apenas uma mensagem de texto de distância!'}
      $('#copyright').text(br_object_footer.copyright);
      $('#policy').text(br_object_footer.policy);
      $('#header-slogan').text(br_object_header.slogan);
      $('#header-slogan2').text(br_object_header.slogan2);
    } else if(lang === 'en') {
      let en_object_footer = {copyright: 'HealthBuddy is powered by Bothub © 2020 All rights reserved.', policy: 'Click here to see our privacy policy'}
      let en_object_header = {slogan: 'Your very own buddy for info about COVID-19.', slogan2: 'Just a text message away!'}
      $('#copyright').text(en_object_footer.copyright);
      $('#policy').text(en_object_footer.policy);
      $('#header-slogan').text(en_object_header.slogan);
      $('#header-slogan2').text(en_object_header.slogan2);
    } else if(lang === 'ru') {
      let ru_object_footer = {copyright: 'HealthBuddy работает на платформе Bothub © 2020 Все права защищены.', policy: 'Нажмите здесь, чтобы увидеть нашу политику конфиденциальности'}
      let ru_object_header = {slogan: 'Ваш собственный приятель за информацию о COVID-19.', slogan2: 'Просто текстовое сообщение прочь!'}
      $('#copyright').text(ru_object_footer.copyright);
      $('#policy').text(ru_object_footer.policy);
      $('#header-slogan').text(ru_object_header.slogan);
      $('#header-slogan2').text(ru_object_header.slogan2);
    }
    chooseLanguageVideos(lang);
    //
  }

  function chooseLanguageVideos(lang) {
    if(lang === 'pt') {
      $('#videos-title').text('Uma iniciativa conjunta do Escritório Regional da OMS para a Europa e do Escritório da UNICEF para a Europa e Ásia Central');
    } else if(lang === 'en') {
      $('#videos-title').text('A joint initiative of the WHO Regional Office for Europe and UNICEF’s Europe and Central Asia Regional Office');
    } else if(lang === 'ru') {
      $('#videos-title').text('Совместная инициатива Европейского регионального бюро ВОЗ и Регионального отделения ЮНИСЕФ по странам Европы и Центральной Азии');
    }
    chooseLanguagePrivacy(lang);
  }

  function chooseLanguagePrivacy(lang) {
    if(lang === 'pt') {
      $('#privacy-title').text('Política de Privacidade');
      $('#privacy-text1').show();
      $('#privacy-text2').hide();
      $('#privacy-text3').hide();
    } else if(lang === 'en') {
      $('#privacy-title').text('Privacy Policy');
      $('#privacy-text1').hide();
      $('#privacy-text2').show();
      $('#privacy-text3').hide();
    } else if(lang === 'ru') {
      $('#privacy-title').text('политика конфиденциальности');
      $('#privacy-text1').hide();
      $('#privacy-text2').hide();
      $('#privacy-text3').show();
    }
    console.log('sending: ');
    WebChat.send("hello "+lang);
  }

  $('.dropdown-item').click(function() {
    chooseLanguageNavbar($(this).attr('value'))
  });

  $('#webchat > .conversation-container > .header > .close-button').click(function() {
    resizeText(WebChat.isOpen());
  });

  $('.embed-responsive-item').mouseenter(function() {
    var carousel = $('.testimonials-carousel').data('owl.carousel');
        if(carousel.settings.autoplay === true || carousel.options.autoplay === true) {
          carousel.settings.autoplay = false;
          carousel.options.autoplay = false;
          $('.testimonials-carousel').trigger('refresh.owl.carousel');
        }
  });

  $('.embed-responsive-item').mouseleave(function() {
    var carousel = $('.testimonials-carousel').data('owl.carousel');
        if(carousel.settings.autoplay === false || carousel.options.autoplay === false) {
          carousel.settings.autoplay = true;
          carousel.options.autoplay = true;
          $('.testimonials-carousel').trigger('refresh.owl.carousel');
        }
  });

  function resizeText(isOpen) {
    if(isOpen === false && !isMobile()) {
      $('#gallery').addClass('gallery');
      $('#gallery').removeClass('gallery2');

      $('#features').addClass('features');
      $('#features').removeClass('features2');
    } else {
      $('#gallery').addClass('gallery2');
      $('#gallery').removeClass('gallery');

      $('#features').addClass('features2');
      $('#features').removeClass('features');
    }
  }

  function detectMob() {
    return ( ( window.innerWidth <= 992 ));
  }
  // Initiate venobox lightbox
  function doPoll(){
      resizeText(WebChat.isOpen())
        setTimeout(doPoll,1200);
}

  $(document).ready(function() {
    if(!isMobile()) {
        doPoll();
    }
    $('#wave .dot').text('Typing...');
    $('.venobox').venobox();
    $('#privacy-text1').hide();
    $('#privacy-text2').show();
    $('#privacy-text3').hide();
    function openChat() {
      var detector = detectMob();

      if (!WebChat.isOpen() && !isMobile()) {
        WebChat.open();
      }
    }
    setTimeout(openChat, 1000);
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  });

  // Initi AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out"
  });

})(jQuery);
