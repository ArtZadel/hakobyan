import { validateInputs } from "./validator.js";

//click function
let slideEnd, fadeEnd = null;
const $body = document.body;
const $html = document.documentElement;
const getElement = (selector) => {

	const elem = document.querySelector(selector);

	const attachedElem = Object.assign(elem, {
		onClick: function (callback, ...args) {
			this.addEventListener('click', (e) => {
				callback(e, ...args);
			});
		},
		onHover: function (callback, ...args) {
			this.addEventListener('mouseover', (e) => {
				callback(e, ...args);
			});
		},
		unHover: function (callback, ...args) {
			this.addEventListener('mouseleave', (e) => {
				callback(e, ...args);
			})
		}
	})
	return attachedElem;
}

const resetStyles = ($element, duration, position, display = null) => {
	if (slideEnd) {
		clearTimeout(slideEnd);
	}
	slideEnd = setTimeout(() => {
		$element.style.height = null;
		$element.style.overflow = null;
		$element.style.transition = null;
		if (!display) {
			$element.style.display = null;
			$element.removeAttribute('data-height');
		};
		if (position) {
			$element.style.position = null
		}
		clearTimeout(slideEnd);
	}, duration);
}


const scrollPage = (animations) => {
	document.onscroll = () => {

		const scrollSize = window.scrollY;

		if(animations) {
			animations(scrollSize);
		};

	};

	document.dispatchEvent(new Event('scroll'));

}


const animateStats = (numBlocks) => {
	numBlocks.forEach((item) => {
		let thisItem = item;
		if (window.scrollY + window.innerHeight > thisItem.offsetTop + thisItem.clientHeight && !thisItem.classList.contains('showed')) {
			let countTo = parseInt(thisItem.textContent);
			let moreIcon = thisItem.textContent.includes('+') ? '+' : '';
			thisItem.classList.add('showed');
			let countNum = 1;
			let difference = countTo - countNum;
			let duration = 2500;

			let animationInterval = setInterval(() => {
				let step = Math.ceil(difference / (duration / 63));
				countNum += step;
				if (countNum >= countTo) {
					clearInterval(animationInterval);
					countNum = countTo;
				}
				thisItem.textContent = countNum + moreIcon;
			}, 63);
		}
	});
};


const slideDown = ($element, duration = 300, type = 'ease-in-out', blockType = 'block') => {
	$element.style.display = blockType;
	let blockHeight = $element.getAttribute('data-height') ? parseInt($element.getAttribute('data-height')) : parseFloat(window.getComputedStyle($element).height);
	if (!$element.getAttribute('data-height')) {
		$element.setAttribute('data-height', blockHeight);
	}
	let position = window.getComputedStyle($element).position == 'static' ? 'relative' : null;

	$element.style.height = 0;
	$element.style.transition = 'height ' + duration + 'ms ' + type;
	position ? $element.style.position = position : '';
	$element.style.overflow = 'hidden';

	setTimeout(() => {
		$element.style.height = blockHeight + 'px';
		resetStyles($element, duration, position, blockType);
	}, 0);
}

const slideUp = ($element, duration = 300, type = 'ease-in-out') => {
	let blockHeight = parseFloat(window.getComputedStyle($element).height);
	let position = window.getComputedStyle($element).position == 'static' ? 'relative' : null;

	$element.style.height = blockHeight + 'px';
	position ? $element.style.position = position : '';
	$element.style.overflow = 'hidden';
	$element.style.transition = 'height ' + duration + 'ms ' + type;

	setTimeout(() => {
		$element.style.height = 0 + 'px';
		resetStyles($element, duration, position);

	}, 0);
}

const finishFade = ($element, duration, $display = null) => {
	if (fadeEnd) {
		clearTimeout(fadeEnd);
	};
	fadeEnd = setTimeout(() => {
		$element.style.opacity = null;
		$element.style.transition = null;
		$element.style.overflow = null;
		if (!$display) {
			$element.style.display = null;
		}
		clearTimeout(fadeEnd);
	}, duration);
}

const fadeIn = ($element, duration = 300, type = 'ease-in-out', blockType = 'block') => {
	$element.style.display = blockType;
	// let position = window.getComputedStyle($element).position == 'static' ? 'relative' : null;

	$element.style.opacity = 0;
	$element.style.transition = 'opacity ' + duration + 'ms ' + type;
	// position ? $element.style.position = position : '';
	$element.style.overflow = 'hidden';

	setTimeout(() => {
		$element.style.opacity = 1;
		finishFade($element, duration, blockType);
	}, 0);
}

const fadeOut = ($element, duration = 300, type = 'ease-in-out') => {
	// let position = window.getComputedStyle($element).position == 'static' ? 'relative' : null;

	// position ? $element.style.position = position : '';
	$element.style.overflow = 'hidden';
	$element.style.transition = 'opacity ' + duration + 'ms ' + type;

	setTimeout(() => {
		$element.style.opacity = 0;
		finishFade($element, duration);
	}, 0);
}

const closeAllMenues = (evt) => {

	if ($$('.faq_list .opened').length > 0 && !evt.target.closest('.drop_block')) {
		slideUp($('.faq_list .opened .drop_block'));
		$('.faq_list .opened').classList.remove('opened');
	}

	if ($$('.drop_block.opened').length > 0 && !evt.target.closest('.drop_inner') || evt.target.classList.contains('close_btn')) {
		slideUp($('.drop_block.opened .drop_inner'));
		$('.drop_block.opened').classList.remove('opened');
	}
}

const comboHover = ($element, $block) => {
	const hoveredEl = getElement($element);
	const comboMouseOver = (e) => {
		if (e.target.tagName.toLowerCase() === 'a' || e.target.parentNode.tagName.toLowerCase() === 'a') {
			e.target.closest($block).classList.add('hovered');
		} else {
			comboMouseLeave();
		}
	}

	const comboMouseLeave = () => {
		if (document.querySelectorAll('.hovered').length > 0) {
			document.querySelectorAll($block).forEach((item) => {
				item.classList.remove('hovered');
			})
		}
	}

	hoveredEl.onHover(comboMouseOver);
	hoveredEl.unHover(comboMouseLeave);
}


const tabSwitch = (e, btnType = 'button') => {
	e.preventDefault();
	if (e.target.tagName.toLowerCase() === btnType && !e.target.classList.contains('selected')) {
		const tabBtn = e.target;
		const currentActive = tabBtn.closest('.tab_btns ').querySelector('.selected ');
		const currentTab = tabBtn.closest('.tab_section').querySelector('.tab_block.selected ');
		const tabId = tabBtn.getAttribute('data-tab');
		const newTab = document.querySelector(`.tab_block.${tabId}`);
		currentActive.classList.remove('selected');
		currentTab.classList.remove('selected');
		tabBtn.classList.add('selected');
		newTab.classList.add('selected');
	}
}

const callPopup = (popupKey) => {

	let popupBlock = document.querySelector(`.${popupKey}_popup`);
	const popupTemplate = document.querySelector(`.${popupKey}_template`);

	if (popupBlock || popupTemplate) {
		let popupCreateTime = 0;
		if (!popupBlock) {

			popupCreateTime = 300;
			$body.insertAdjacentHTML('beforeend', popupTemplate.innerHTML);
			popupBlock = document.querySelector(`.${popupKey}_popup`);
			popupTemplate.remove();
		};
		$body.classList.add('popup_opened');
		setTimeout(() => {
			popupBlock.classList.add('showed');
			const closeBtn = getElement('.showed .popup_container');
			closeBtn.onClick(closePopup);


		}, popupCreateTime)
	}
}

const openPopupByBtn = (e) => {
	const popupId = e.target.getAttribute('data-popup');
	callPopup(popupId);
}

const $ = (element) => {
	return document.querySelector(element);
}

const $$ = (elements) => {
	return document.querySelectorAll(elements);
}

const closePopup = (e) => {
	if (!e || e.target.classList.contains('popup_close')) {
		if (document.querySelectorAll('.popup_block.showed').length > 0) {
			$body.classList.remove('popup_opened');
			document.querySelector('.popup_block.showed').classList.remove('showed');
		}
	}
}

const resizeTextarea = ($area) => {
	$area.setAttribute("style", "height:" + ($area.scrollHeight) + "px");
	$area.addEventListener("input", OnInput, false);

	function OnInput() {
		this.style.height = 0;
		this.style.height = (this.scrollHeight + 10) + "px";
	}
}


const showDropBlock = (evt) => {
	if (evt.target.classList.contains('drop_btn') || evt.target.parentNode.classList.contains('drop_btn')) {
		const dropParent = evt.target.closest('div');
		const dropElement = dropParent.querySelector('.drop_inner');
		if (!dropParent.classList.contains('opened')) {
			closeAllMenues(evt);
			evt.stopPropagation();
			dropParent.classList.add('opened');
			slideDown(dropElement);
		}
	}
}

const checkFields = ($form) => {
	for (let i = 0; i < $form.elements.length; i++) {
		const $field = $form.elements[i];
		if ($field.tagName.toLowerCase() == 'input' || $field.tagName.toLowerCase() == 'textarea' || $field.tagName.toLowerCase() == 'select') {
			$field.addEventListener('input', () => {
				if ($field.value) {
					$field.classList.add('filled')
					if ($field.closest('div').querySelectorAll('.individual_hint').length > 0) {
						$field.closest('div').querySelector('.individual_hint').style.display = 'block';
						$field.closest('div').querySelector('.standard_hint').style.display = 'none';
					}

				} else {
					$field.classList.remove('filled');
					if ($field.closest('div').querySelectorAll('.individual_hint').length > 0) {
						$field.closest('div').querySelector('.individual_hint').style.display = 'none';
						$field.closest('div').querySelector('.standard_hint').style.display = 'block';
					}
				};

				if ($field.parentNode.classList.contains('error')) {
					validateInputs($field.closest('form'));
				}
			});
		}
	}

}


const showMenu = () => {
	let lastScrollTop = 0;
	const header = document.querySelector('.header');
	const headerFixedInitially = header.classList.contains('header_fix');
	const isContactsPage = document.querySelector('.contact_page'); 


	if (headerFixedInitially) {
		lastScrollTop = 1;
	}

	// Improved debounce function
	function debounce(func, wait, immediate) {
		let timeout;
		return function () {
			const context = this, args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	const handleScroll = debounce(function () {
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollTop > lastScrollTop || (scrollTop === 0 && !isContactsPage)) {
			if (!headerFixedInitially || scrollTop !== 0) {
				if (header.classList.contains('header_fix')) {
					header.classList.remove('header_fix');
				}
			}
		} else {
			if (!header.classList.contains('header_fix')) {
				header.classList.add('header_fix');
			}
		}

		lastScrollTop = scrollTop;
	}, 50); // Adjusted debounce delay to 50ms

	window.addEventListener('scroll', handleScroll);
};





//detecting document ready state
const docReady = (fn) => {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		setTimeout(fn, 1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}

}

export {
	resetStyles,
	slideDown,
	slideUp,
	fadeIn,
	fadeOut,
	getElement,
	docReady,
	comboHover,
	closeAllMenues,
	tabSwitch,
	callPopup,
	openPopupByBtn,
	$,
	$$,
	closePopup,
	showMenu,
	showDropBlock,
	checkFields,
	scrollPage,
	animateStats,
	$body,
	$html
}