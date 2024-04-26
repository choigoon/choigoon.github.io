/* UI */ ;

var UI = {
  init : function(){
    this.lnb();
    this.dropdown();
    this.detailFilter();
    this.headerOpen();
    this.allmenuOpen();
    this.sortingBtn();
    this.searchHastag();
    this.detailAllSelect();
    this.detailReset();
    this.btnLiked();
    this.headerScroll();
    this.arteFriend();
    this.allmenuAccor();
    this.kvswiper();
    this.adswiper();
    this.allmenuswiper();
  },

  // windowsize CHK
  winChk : function(){
    return window.innerWidth > 768 ? 'pc' : 'mo';
  },

  // header lnb active
  lnb : function(){
    $(".header_lnb .btn_dropdown_dep2").each(function(i,el){
      $(el).on("click",function(){
        var $elLi = $(this).parent(".dropdown_dep2_item");
        var isActive = $elLi.hasClass("item-on");

        if(!isActive){
          $elLi.addClass("item-on").siblings().removeClass("item-on");
        }
      })
    });
  },

  // dropdown data속성 추가해야함 (글자도 바뀌어야함)
  dropdown : function(){
    var self = this;

    $(".btn_dropdown").each(function(i,el){

      // dep2 is-active
      $(el).on("click",function(e){
        var winW = self.winChk();

        $(this).toggleClass("is-active");

        // header lnbdropdpwn Mobile
        if (winW === "mo") {
          if ($(this).closest('.header').length > 0) {
            if ($(this).hasClass("is-active")) {
              $(this).closest('.header').addClass("header-open");
            } else {
              $(this).closest('.header').removeClass("header-open");
            }
          }
        }
      });

      // dropdown dep2 item SELECT CHANGING
      $(el).siblings(".dropdown_dep2").find(".btn_dropdown_dep2").each(function(i,item){
        $(item).on("click",function(e){
          e.stopPropagation(); // 이벤트 전파 중지

          var selTxt = $(this).find(".txt").text();

          $(el).find(".txt").text(selTxt);

          if($(this).is("[data-drop-sel]") && $(el).is("[data-current]")){
            $(el).attr("data-current",$(this).data("drop-sel"));
          }

          $(el).removeClass("is-active");
        });
      });
    });
  },

  // headerutil dep2 menu
  headerOpen : function(){
    var self = this;

    $(".header .header_util [class ^='btn_util']").each(function(i,el){
      var $hdDep2 = $(".header_dep2");
      var $hdDep2Item = $hdDep2.find("[class ^='hd_dep2_item_']");
      var subTarget = $(el).data("dep2");

      $(el).on({
        mouseenter: function(){
          var winW = self.winChk();

          if (winW === "pc") {
            $hdDep2.show();
            $hdDep2Item.removeClass("is-open");
            $(".header_allmenu").removeClass("is-open");
            $hdDep2.find(".hd_dep2_item_" + subTarget).addClass("is-open");
          }
        }
        , mouseleave: function(){
          $hdDep2.hide();
          $hdDep2Item.removeClass("is-open");
        }
      })
    })
  },

  allmenuOpen : function(){
    var self = this;

    $(".btn_allmenu").on("mouseenter click", function(e) {
      var winW = self.winChk();

      if (winW === "pc") {
        $(".header_allmenu").addClass("is-open");
    
        $(".header").on("mouseleave", function() {
          $(".header_allmenu").removeClass("is-open");
        });
      } else {
        if (e.type === 'click') {
          $(".header_allmenu").addClass("is-open");
        }
      }

      $(".btn_allmenu_closed").on("click",function(){
        $(".header_allmenu").removeClass("is-open");
      });
    });
  },

  // sort detail filter option
  detailFilter : function(){
    
    $(".btn_detail_filter").each(function(i,el){
      $(el).on("click",function(){
        $(this).toggleClass("is-open"); 
        $(this).parents(".sort_area_wrap").find(".sort_detail_filter_wrap").toggleClass("is-open");

        var isActive = $(this).is(".is-open");

        if(isActive){
          $(this).find(".state_txt").text("닫기");
        }else{
          $(this).find(".state_txt").text("열기");
        }
      });
    });
    
    $(".detail_filter_closed_btn .btn_closed").on("click",function(){
      $(this).parents(".sort_detail_filter_wrap").removeClass("is-open");
      $(this).parents(".sort_area_wrap").find(".btn_detail_filter").find(".state_txt").text("열기");
    });
  },

  // sorting btn
  sortingBtn : function(){
    $(".sort_search_wrap .btn_dropdown_dep2").each(function(i,el){
      $(el).on("click",function(){
        var $elLi = $(this).parent(".dropdown_dep2_item");
        var isActive = $elLi.hasClass("item-on");


        if(!isActive){
          $elLi.addClass("item-on").siblings().removeClass("item-on");
        }else {
          return false;
        }
      });
    });

  },

  // search Hashtag remove
  searchHastag : function(){
    $(".search_tag_list .label_tag_hashtag").each(function(i,el){
      $(el).find(".btn_del").on("click",function(){
        $(this).parents(".label_tag_hashtag").remove();
      });
    });
  },

  // detailFilter all Select
  detailAllSelect : function(){
    $("[data-chk='check-all']").each(function(i,el){
      var $chkGrp = $(el).parents(".filter_option_item_list");
      var $inpItems = $chkGrp.find("input").not("[data-chk='check-all']");

      // allchk변경감지
      $(el).on("change",function(){
        if($(el).prop("checked")){
          $chkGrp.find("input").prop("checked",true);
        }else {
          $chkGrp.find("input").prop("checked",false);
        }
      });

      // 개별체크감지
      $inpItems.on("change",function(){
        if($inpItems.filter(":checked").length == $inpItems.length ){
          $(el).prop("checked",true);
        }else{
          $(el).prop("checked",false);
        };
      });
    });
  },

  // detailFilterresetBtn
  detailReset : function(){
    $(".btn_detail_filter_reset").on("click",function(){
      $(this).parents(".sort_detail_filter_wrap").find(".filter_option_list input").prop("checked",false);
    });
  },

  // btnLIKED
  btnLiked : function(){
    $(".btn_liked").on("click",function(){
      $(this).toggleClass("is-active");
    });
  },

  headerScroll : function(){
    $(window).on('scroll', function () {
        var scrTop = $(window).scrollTop();
        
        if (scrTop == 0) {
          $(".header").removeClass("header-scroll");
        } else {
          $(".header").addClass("header-scroll");
        }
    });
  },

  arteFriend : function(){
    $(".btn_friends_site").on("click",function(){
      var $target = $(this).parents(".allmenu_friends_site").find(".list_friends_site");

      $target.toggleClass("is-open");

      var isActive = $target.hasClass("is-open");

      if(isActive){
        $(this).find(".blind").text("닫기");
      }else{
        $(this).find(".blind").text("열기");
      }

    });
  },

  allmenuAccor : function(){
    $(".allmenu_nav_item .btn_txt_title").each(function(i,el){
      $(el).on("click",function(){
        $(this).closest(".allmenu_nav_item").toggleClass("is-active");
      });
    });
  },

  swiperPlayBtn: function (swiperIns, swiperClass) {
    var cnt = 1;
    $(swiperClass + " .btn_swiperpause").on("click", function () {
      if (cnt % 2 == 1) {
        swiperIns.autoplay.stop();
        $(this).addClass("play");
        $(this).find(".blind").text("swiper play");
      } else {
        swiperIns.autoplay.start();
        $(this).removeClass("play");
        $(this).find(".blind").text("swiper stop");
      }
      cnt++;
    });
  },

  kvswiper : function(){
    var self = this;

    var kvSwiperImg = new Swiper(".kv_swiper_img", {
      slidesPerView: 4,
      spaceBetween: 60,
      loop: true,
      autoplay: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".kv_swiper_controller .swiper-button-next",
        prevEl: ".kv_swiper_controller .swiper-button-prev",
      },

      pagination: {
        el: ".kv_swiper_controller .swiper-pagination",
        type: "fraction",
        clickable: true,
        formatFractionCurrent: function (number) {
          return ('0' + number).slice(-2);
        },
        formatFractionTotal: function (number) {
            return ('0' + number).slice(-2);
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
        }
      },

      // inform txt visible      
      on: {
        // init: kvdataInp,
        init: function() {
          kvTxtDataInp(this, 0);
        },
        
        slideChange : function(){
          var winW = self.winChk();

          if (winW === "pc") {

            var swiper = this;
            var $target = $(this.$el).siblings(".kv_swiper_inform").find(".kv_swiper_inform_data");

            $target.addClass("is-changing");

            setTimeout(function() {
              $target.removeClass("is-changing");
              kvTxtDataInp(swiper, swiper.realIndex);
            },200);

            // var nowData = $(this.slides[this.realIndex]).find(".kv_swiper_inform").html();
            // $(this.$el).siblings(".kv_swiper_inform").find(".kv_swiper_inform_data").html(nowData);  
          }
        }
      },

      breakpoints: {
        // when width is >= 1024
        1024: {
          slidesPerView: 1,
          spaceBetween: 0,
        }
      },

      // 768px 이하 autoplay 중지
      // disableOnInteraction: window.innerWidth <= 768
    });

    window.addEventListener('resize', function() {
      kvSwiperImg.update();
    });

    function kvTxtDataInp(swiper, i) {
      // var $this = swiper;
      // var $test = $this.slides;
      // var test1 = $test.eq(i);
      // var target = test1.find('.kv_swiper_inform');
      // var targettxt = target.html();
      // var position = $(swiper.$el).siblings(".kv_swiper_inform").find(".kv_swiper_inform_data");
      // 위에 건드리지말것
      
      var $thisSwiper = swiper;
      var dataTxt = $thisSwiper.slides.eq(i).find('.kv_swiper_inform').html();
      var $target = $(swiper.$el).siblings(".kv_swiper_inform").find(".kv_swiper_inform_data");

      $target.html(dataTxt);
    }

    this.swiperPlayBtn(kvSwiperImg, ".kv_swiper_inform");
  },

  adswiper : function(){
    var adSwiper = new Swiper(".ad_swiper_review", {
      loop: true,
      autoplay: true,
      observer: true,
      observeParents: true,

      pagination: {
        el: ".ad_swiper_controller .swiper-pagination",
      }
    });

    this.swiperPlayBtn(adSwiper, ".ad_swiper_controller");
  },

  allmenuswiper : function(){
    var adSwiper = new Swiper(".allmenu_swiper", {
      loop: true,
      autoplay: true,
      observer: true,
      observeParents: true,

      pagination: {
        el: ".allmenu_swiper .swiper-pagination",
      }
    });
  },
};

$(document).ready(function(){
  UI.init();
});