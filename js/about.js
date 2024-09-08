import { docReady, closeAllMenues,animateStats,slideDown,slideUp,scrollPage } from "./imports/utils.js";
import { initGlobalFunctions, detectContentHeight } from "./main.js";


const dropToggle = (evt) => {
	evt.preventDefault();
	let target = evt.currentTarget;
	let parent = target.parentNode;
	let dropBlock = parent.querySelector('.faq_list .drop_block');

	if (!parent.classList.contains('opened')) {
		closeAllMenues(evt);
		evt.stopPropagation();
		parent.classList.add('opened');
		if (dropBlock) {
			slideDown(dropBlock);
		}
	}
};


const scrollEvents = (scrollSize) => {
	if (document.querySelectorAll('.number_block').length > 0) {
		animateStats(document.querySelectorAll('.number_block'));
	}

};

docReady(() => {

	scrollPage(scrollEvents);

	document.querySelectorAll('.faq_list .drop_btn').forEach(btn => {
		btn.addEventListener('click', dropToggle);
	});

	initGlobalFunctions();

	// if (document.querySelectorAll('.year_slider').length > 0) {
	// 	const slider1 = new Swiper(".year_slider", {
	// 		spaceBetween: 10,
	// 		slidesPerView: 7,
	// 		freeMode: true,
	// 		watchSlidesProgress: true,
	// 		// centeredSlides: true,
	// 		centerInsufficientSlides:true,
	// 		breakpoints: {
	// 			1200: {
	// 				slidesPerView: 7,
	// 			},
	// 			960: {
	// 				slidesPerView: 5,
	// 			},
	// 			576: {
	// 				slidesPerView: 4,
	// 			},
	// 			481: {
	// 				slidesPerView: 3,
	// 			},
	// 			320: {
	// 				slidesPerView: 3,
	// 			}
	// 		},
	// 		navigation: {
	// 			nextEl: '.swiper-button-next',
	// 			prevEl: '.swiper-button-prev',
	// 		},
	// 		on: {
	// 			init: function () {
	// 				// Center the first slide initially
	// 				this.slideTo(Math.floor(this.slides.length / 2));
	// 				if(this.slides.length < 6) {
						 
	// 				}
	// 			},
	// 		}
	// 	});
	// 	if (document.querySelectorAll('.story_slider').length > 0) {
	// 		const slider2 = new Swiper(".story_slider", {
	// 			spaceBetween: 10,
	// 			autoHeight: true,
	// 			thumbs: {
	// 				swiper: slider1,
	// 			},
	// 		});
	// 	}
	// }

	if (document.querySelectorAll('.year_slider').length > 0) {
		const slider1 = new Swiper(".year_slider", {
			// spaceBetween: 10,
			slidesPerView: 3,
			freeMode: true,
			watchSlidesProgress: true,
			// centeredSlides: true,
			centerInsufficientSlides: true,
			breakpoints: {
				1200: {
					slidesPerView: 7,
				},
				1024: {
					slidesPerView: 5,
				},
				576: {
					slidesPerView: 4,
				},

			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			on: {
				init: function () {
	
					// if (this.slides.length < 6) {
					// 	const yearSlider = document.querySelector('.year_slider');
					// 	yearSlider.style.paddingLeft = '70px';
					// 	yearSlider.style.paddingRight = '70px';
					// }
				},
				resize: function () {
					if (this.slides.length <= 6 && window.innerWidth > 1024) {
						const yearSlider = document.querySelector('.year_slider');
		
						yearSlider.style.paddingLeft = '70px';
						yearSlider.style.paddingRight = '70px';
					} else {
						const yearSlider = document.querySelector('.year_slider');
						yearSlider.style.paddingLeft = '15px';
						yearSlider.style.paddingRight = '15px';
					}
				}
			}
		});
	
		if (document.querySelectorAll('.story_slider').length > 0) {
			const slider2 = new Swiper(".story_slider", {
				spaceBetween: 10,
				autoHeight: true,
				thumbs: {
					swiper: slider1,
				},
			});
		}
	}
	

});

window.addEventListener('load', () => {
	detectContentHeight();
});
