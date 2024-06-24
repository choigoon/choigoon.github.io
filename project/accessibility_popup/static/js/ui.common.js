/* view__class__info__toggle */

/* toggle */
function toggleView() {
	$(document).on('click', '.btn__view__info', function () {
		$(this).toggleClass("on");

		if($(this).hasClass("on")){
			$(this).find('.toggle__txt').text("접기");
			$(this).closest('.view__class__side').find('.view__class__info__chapter').show()
		} else {
			$(this).find('.toggle__txt').text("펼치기");
			$(this).closest('.view__class__side').find('.view__class__info__chapter').hide()
		}
	});
}

// s: popup set

// 모든브라우저의 transition 감지
var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

/*
	기능명칭 : popupManager
	기능상세 : now active popup count
*/
var popupManager = {
	openPopups: [],

	addPopup: function(id) {
        if (!this.openPopups.includes(id)) {
            this.openPopups.push(id);
        }
    },
    
    removePopup: function(id) {
        var index = this.openPopups.indexOf(id);
        if (index !== -1) {
            this.openPopups.splice(index, 1);
        }
    },

    openPopupLengs: function() {
        return this.openPopups.length;
    }
};

/*
	기능명칭: Dimmer
*/
var dimmer = {
	eleModule : '.dimmer',

	open: function($module, callback){
		var _this = this;

		if ($(_this.eleModule).length == 0){ $('body').append('<div class="dimmer" aria-hidden="true"></div>') };
        setTimeout(function(){ $(_this.eleModule).addClass('is-active'); });

        if (callback){ callback }		
	},

	close: function(callback){
		var _this = this;

		if (popupManager.openPopupLengs() <= 0){
			$(_this.eleModule).removeClass('is-active');
			$(_this.eleModule).one(transitionend, function(){
				if (!$(this).hasClass('.is-active')) {
					$(this).remove();
					
					if (callback){ callback }
				}
			});
		}
	}
}

/*
	기능명칭 : SET SCROLL
	기능상세 : 모달 노출시 배경스크롤링 잠금
*/
var setScroll = {
	clsFixed : 'is-scroll-lock',
	scrTop : null,

	disable : function(){
		// 현재의 sctrollTop값 *-1로 음수값을 만들어서 그걸 top: -00px로 스타일을 주어 그 자리에 고정.
		// scroll 막고 height100% 로 고정해두면서 현재 위치를 유지하기 위한 것
        // open popup이 1일때 scroll고정 = 최초 open일때만 동작        
        if (popupManager.openPopupLengs() <=1) {
			this.scrTop = $(window).scrollTop();
			$('html, body').addClass(this.clsFixed);
		    $('.wrapper, #g-wrapper').css({position: 'relative', top: this.scrTop * (-1)});
        }
	},

	enable : function(){
        // Last popup이 닫히고 active popup이 0일때 동작
        if (popupManager.openPopupLengs()  <= 0) {
            $('html, body').removeClass(this.clsFixed);
            $('.wrapper, #g-wrapper').removeAttr('style');
            $(window).scrollTop(this.scrTop);
        }
	},
}

/*
	기능명칭 : SET FOCUS
	기능상세 : 모달 노출시 배경포커스 잠금
*/
var setFocus = {
	focusable : 'a, [href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[contenteditable], [tabindex]:not([tabindex="-1"])',

    // 초기값복원
    restore: function($target){

		$target.each(function(){
			var $target = $(this);
			var initialAriaHidden = $target.data('initial-ariahidden');
			var initialTabindex = $target.data('initial-tabindex');

			if(initialAriaHidden === 'true') { // 주의 data값을 받는거라 string으로 들어와서 true가 아니라 문자열 'true'로 chk
				$target.attr('aria-hidden', 'true');
			}else{
				$target.removeAttr('aria-hidden');
			}

			if(typeof initialTabindex !== 'undefined') {
				$target.attr('tabindex', initialTabindex);
			} else {
				$target.removeAttr('tabindex');
			}

			$target.removeAttr('data-initial-ariahidden').removeAttr('data-initial-tabindex');
			//removeData는 캐시만 삭제. removeAttr로 제거
		})        
    },

    disable: function(id, opnerBtn){
		// 여기서의 target은 focus를 뺏어야하는 대상
        // 기본동작은
        // target에 tabindex, aria-hidden 값이 있다면 초기값으로 저장한 후에 일괄 모두 tabindex -1, ariahidden true로 지정
        // $module만 초기값으로 reset / 또는 target을 $module을 제외한 focusable로 세팅

        // default : 단일팝업오픈 / target = body의 모든 focusable

        // if_01 : 2중팝업이라 두번째 팝업이 open되었을 경우 / target = motherPopup의 모든 focusable
        // popupManager.openPopupLengs() > 1 이면서 동시에 && $opnerBtn parents가 .popup-wrap일때
        // target은 $opnerBtn의 parents .popup-wrap.

		var _this = this;
		var $module = $('#'+id);
		var $target = $('body').find(_this.focusable);
		var $parentPopup = $(opnerBtn).parents(".popup-wrap");

		if( $parentPopup.length && popupManager.openPopupLengs() > 1 ) {
			$target = $parentPopup.find(_this.focusable);
		} 

		$target.each(function(){
			var $target = $(this);

			// 초기값저장
			$target.attr({
				'data-initial-ariahidden' : $target.attr('aria-hidden'),
				'data-initial-tabindex' : $target.attr('tabindex')
			})

			// fucus out
			$target.attr({
				'aria-hidden': 'true',
                'tabindex': '-1',
			})
		});

		// 팝업 내부 요소 처리
        $module.find(_this.focusable).each(function() {
            var $module = $(this);

            _this.restore($module);
        });
    },

    enable: function($opnerBtn){
		// 여기서의 target은 focus를 reset = 원복할 대상
        // 기본동작은
        // target의 저장된 tabindex, aria초기값을 감지해 tabindex와 ariahidden을 초기값으로 reset.
        // 저장한 초기값을 삭제

        // default : 단일팝업오픈 / target = body의 모든 focusable

        // if_01 : 현재 thispopup이 닫혀도 popupManager.openPopupLengs() === 0 이 아닐떄 = 2중 팝업이고 아직 active된 popup이 남아있을때
        // target은 $opnerBtn의 parents .popup-wrap

		var _this = this;
		var $target = $('body').find(_this.focusable);
		var $parentPopup = $opnerBtn.parents(".popup-wrap");

		// LAST popup이 아닐때
		if(!popupManager.openPopupLengs() <= 0){
			$target = $parentPopup.find(_this.focusable);
		}

		_this.restore($target);
    },
};

/* popup */
var popup = {
	open: function(id, obj){
		var $id = $('#'+id);

		$(obj).attr({'data-popup': id}); // popup OPEN btn : popupclosed될때 OPEN시킨 버튼으로 다시 focus주기 위해 popup id를 남겨 표기
		$id.removeAttr('hidden');
		setTimeout(function(){ $id.addClass('is-active') }, 0);

        popupManager.addPopup(id);
        dimmer.open();
        setScroll.disable();
        setFocus.disable(id, obj);
        return 'Popup Opened';
	},

	close: function(id, callback){
		var $id = $('#'+id);
		var $opnerBtn = $('[data-popup='+id+']');

		$id.removeClass('is-active');
		$id.one(transitionend, function(){
			if (!$(this).hasClass('is-active')){
				$id.attr('hidden', 'hidden');
				$opnerBtn.focus().removeAttr('data-popup');

				if (callback){ callback }
			}
		});

        popupManager.removePopup(id);
        dimmer.close();
        setScroll.enable();
		setFocus.enable($opnerBtn);
        return 'Popup Closed';
	},
}

/*--------------------------------------------------------------
	## Init - 초기실행
--------------------------------------------------------------*/
/* UI */
function ui_init() {
	toggleView();
}

/* Ready */
$(document).ready(function () {
	ui_init();
});
