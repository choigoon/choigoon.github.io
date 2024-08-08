/* UI */ ;

var UI = {
  init: function(){
    this.gnb();
    this.familysite();
    this.dropdown();
    this.kvBannerSwiper();
    this.kvBoardSwiper();
    this.partnerSwiper();
  },

  gnb2: function(){
    // 기본 toggle형

    const btnUtilGnb = document.querySelector('.btn_util_gnb');
    // btnUtilGnb이 null일 경우를 대비해서 if
    if (btnUtilGnb) {
      btnUtilGnb.addEventListener('click', function() {
        this.classList.toggle('is-open');
      });
    }
  },

  gnb: function(){
    // keydown click 두가지 각각
    const btnUtilGnb = document.querySelector('.btn_util_gnb');

    if (btnUtilGnb) {
      btnUtilGnb.addEventListener('click',function(e){
        gnbHandle(e,this)
      });

      btnUtilGnb.addEventListener('keydown',function(e){
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          gnbHandle(e, this);
        }
      });
    }

    function gnbHandle(e,elem){
      elem.classList.toggle('is-open');

      if(elem.classList.contains('is-open')){
        const allAccor = document.querySelectorAll('.gnb .gnb_dep2_tit');

        allAccor.forEach(function(accor){
          const dep3 = accor.nextElementSibling;
          const dep3HgtPx = dep3.scrollHeight; // 스크롤터진 내부높이까지

          // ##Accor 기본세팅 : 모든 Accor 닫힌 상태 (height 0)
          accor.parentElement.classList.remove('is-active');
          accor.querySelector('.blind').textContent = '목록 열기';
          dep3.style.height = '0px';


          // ##click 이벤트
          accor.addEventListener('click', function(event) {
            handleAccorClick(accor, dep3, dep3HgtPx);
            event.stopPropagation(); // 클릭 이벤트 전파 방지
          }); 

          function handleAccorClick(el, dep3, dep3HgtPx){
            const elLi = el.parentElement;
            const isActive = elLi.classList.contains('is-active');
      
            // isActive면 = 현재열려있음 = 클릭한 항목 is-active삭제하고 비활성화
            if(isActive){
              elLi.classList.remove('is-active');
              el.querySelector('.blind').textContent = '목록 열기';
              requestAnimationFrame(() => {
                dep3.style.height = '0px';
              });
      
              // is-active하기 __ 나머지는 초기화
            } else {
      
              // 클릭하지 않은 항목들 초기화
              allAccor.forEach(function(otherEl){
                if (otherEl !== el) {
                  const otherDep3 = otherEl.nextElementSibling;
                  otherEl.parentElement.classList.remove('is-active');
                  otherEl.querySelector('.blind').textContent = '목록 열기';
                  requestAnimationFrame(() => {
                    otherDep3.style.height = '0px';
                  });
                }
              });
      
              // 클릭한 항목 is-active하기
              elLi.classList.add('is-active');
              el.querySelector('.blind').textContent = '목록 닫기';
              requestAnimationFrame(() => {
                dep3.style.height = dep3HgtPx + 'px';
              });
            }            
          };
        });
        
      }
    }
  },

  familysite: function(){
    const familysite = document.querySelector('.familysite');

    if (familysite) {
      const btnFamilysite = familysite.querySelector('.btn_familysite');
      const btnFamilysitedep2 = btnFamilysite.parentElement.querySelectorAll('.familysite_list_wrap .familysite_link')
  
      if (btnFamilysite) {
        btnFamilysite.addEventListener('click', function() {
          familysite.classList.toggle('is-active');
        });

        btnFamilysitedep2.forEach(function(item){
          item.addEventListener('click',function(e){
            e.stopPropagation();  // 부모 요소로의 이벤트 전파 방지

            const selTxt = item.querySelector('.txt').textContent;
            
            btnFamilysite.querySelector('.txt').textContent = selTxt;
            familysite.classList.remove('is-active');
          })
        });
      }
    }
  },

  dropdown: function(){
    const btnDropdown = document.querySelectorAll('.btn_dropdown');

    btnDropdown.forEach(function(el){
      el.addEventListener('click',function(){
        el.classList.toggle('is-active');
      })

      // el의 형제요소중 .dropdown_dep2내부의 .btn_dropdown_dep2 선택자
      const btnDropdownDep2 = el.parentElement.querySelectorAll('.dropdown_dep2 .btn_dropdown_dep2');

      btnDropdownDep2.forEach(function(item){
        item.addEventListener('click',function(e){
          e.stopPropagation();  // 부모 요소로의 이벤트 전파 방지

          const selTxt = item.querySelector('.txt').textContent;

          el.querySelector('.txt').textContent = selTxt;
          el.classList.remove('is-active');
        })
      })

    })
  },

  // swiper
  kvBannerSwiper : function(){
    var kvBannerSwiper = new Swiper(".swiper_kvbanner", {
      effect: "fade",
      autoplay: true,
      observer: true,
      observeParents: true,

      pagination: {
        el: ".swiper_kvbanner .swiper-pagination",
      }
    });

    this.swiperPlayBtn(kvBannerSwiper, ".swiper_kvboard");
  },

  kvBoardSwiper : function(){
    var kvBoardSwiper = new Swiper(".swiper_kvboard", {
      autoplay: true,
      observer: true,
      observeParents: true,

      pagination: {
        el: ".swiper_kvboard .swiper-pagination",
      }
    });

    this.swiperPlayBtn(kvBoardSwiper, ".swiper_kvboard");
  },

  partnerSwiper : function(){
    var partnerSwiper = new Swiper(".swiper_partner", {
      loop: false,
      observer: true,
      observeParents: true,
      slidesPerView: "auto",
      slidesPerGroup: 3,

      navigation: {
        nextEl: ".swiper_partner_wrap .swiper-button-next",
        prevEl: ".swiper_partner_wrap .swiper-button-prev",
      },

      scrollbar: {
        el: ".swiper_partner_wrap .swiper-scrollbar",
        hide: true,
      },
    });

    this.swiperPlayBtn(partnerSwiper, ".swiper_partner_wrap");
  },
};

document.addEventListener('DOMContentLoaded', function(){
  UI.init();
});