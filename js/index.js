import { getElement, docReady, comboHover, scrollPage, animateStats, tabSwitch, callPopup, openPopupByBtn, $, $$ } from "./imports/utils.js";
import { initGlobalFunctions, detectContentHeight } from "./main.js";

let player;
let playerReady = false;
let detailsBtn = document.querySelector('.testimonials_section .item_link');

const activateYTVideo = (videoBlock) => {
	let videoSrc = videoBlock.dataset.video;
	let videoId = videoBlock.id;
	let videoContainer = videoBlock.closest('.video_block');
	let videoBtn = videoContainer.querySelector('.video_btn');
	var player;

	function onYouTubeIframeAPIReady() {
		player = new YT.Player(videoId, {
			height: '100%',
			width: '100%',
			videoId: videoSrc,
			playerVars: {
				'playsinline': 1
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	function onPlayerReady(event) {
		videoContainer.classList.add('ready');
	}

	function onPlayerStateChange(event) {
		if (event.data === YT.PlayerState.PLAYING) {
			videoContainer.classList.add('playing');
			videoContainer.classList.remove('loading');
		}
	}

	function stopVideo() {
		player.stopVideo();
	}

	onYouTubeIframeAPIReady();

	const playVideo = () => {
		setTimeout(() => {
			if (videoContainer.classList.contains('ready')) {
				player.playVideo();
			} else {
				videoContainer.classList.add('loading');
				playVideo();
			}
		}, 100);
	}

	videoBtn.addEventListener('click', playVideo);
}

if (document.querySelector('.video_block')) {
	window.addEventListener('scroll', () => {
		const videoBlock = document.querySelector('.video_block');
		const videoBlockTop = videoBlock.getBoundingClientRect().top + window.scrollY;
		const videoBlockHeight = videoBlock.offsetHeight;

		if (window.scrollY + window.innerHeight >= videoBlockTop + videoBlockHeight / 2 && videoBlock.querySelector('iframe') === null) {
			activateYTVideo(document.querySelector('.player_block'));
		}
	});

	document.querySelector('.video_btn').addEventListener('mouseenter', () => {
		if (document.querySelector('.video_block iframe') === null) {
			activateYTVideo(document.querySelector('.player_block'));
		}
	});
}

const animSections = [];
const sectionsCount = $$('[data-animate]').length;
let showedCount = $$('[data-animate].showed').length;

if ($$('[data-animate]').length > 0) {
	$$('[data-animate]').forEach(($section, index) => {
		animSections[index] = [$section, $section.offsetTop];
	});
}


const heightTestimonials = () => {
	let detailsInner = document.querySelector('.testimonials_item');
	let detailsDescription = document.querySelector('.description_sub');

	let detailsSpace = 263 - parseInt(getComputedStyle(detailsInner).paddingTop) - parseInt(getComputedStyle(detailsInner).paddingBottom);
	let detailsHeight = detailsDescription.offsetHeight - parseInt(getComputedStyle(detailsDescription).paddingTop);

	if (detailsHeight > detailsSpace) {
		detailsBtn.classList.add('active');
	} else {
		detailsBtn.classList.remove('active');
	}
}

const animateSections = (scrollSize) => {
	if (showedCount < sectionsCount) {
		for (let i = showedCount; i < sectionsCount; i++) {
			if (scrollSize + window.innerHeight - 200 >= animSections[i][1]) {
				animSections[i][0].classList.add('showed');
			}
		}
		showedCount = $$('[data-animate].showed').length;
	}
};

const scrollEvents = (scrollSize) => {
	if (document.querySelectorAll('.number_block').length > 0) {
		animateStats(document.querySelectorAll('.number_block'));
	}
	animateSections(scrollSize);
};


// window.addEventListener('load', function () {
// 	if (document.querySelector('.services_page')) {
// 		detailsButtons.forEach(button => {
// 			countDetailsHeight(button);
// 		});
// 	}
// });


docReady(() => {
	initGlobalFunctions();

	scrollPage(scrollEvents);

	if (document.querySelectorAll('.tab_btns').length > 0) {
		const tabBtns = getElement('.tab_btns');
		tabBtns.onClick(tabSwitch, 'button');
	}

	if (document.querySelector('.testimonials_section')) {
		document.querySelectorAll('.testimonials_section .item_link').forEach(button => {
			heightTestimonials(button);
		});
	}


	// callPopup('callback');

	// document.querySelector('.popup_btn').addEventListener('click', openPopupByBtn)
});

window.addEventListener('load', () => {
	detectContentHeight();



	window.addEventListener('resize', () => {
		detectContentHeight();
	});
});
