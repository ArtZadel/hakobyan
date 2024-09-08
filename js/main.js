import { activateMenu } from "./imports/header.js";
import {
    closeAllMenues,
    showMenu,
    getElement,
    $body,
    $html,
    $,
    showDropBlock,
    checkFields,
    $$
} from "./imports/utils.js";
import { validateInputs } from './imports/validator.js';
import niceSelect from './nice-select2.js';

const body = getElement('body'); //body as clickable element

const $mobileSize = 1024;

//web/touch detect function
const isTouchDevice = () => {
    return 'ontouchstart' in document.documentElement;
};

//viewport meta change function for ios devices during touch and focusout fields with small font sizes
const changeIosMeta = () => {
    const fields = $$('input, textarea');
    if (body.classList.contains('ios_device') && fields.length > 0) {

        const viewPortMeta = $('meta[name="viewport"]'); //viewport meta
        const standardMeta = "width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"; //viewport meta content standard value
        const unScaleMeta = "width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover"; //viewport meta content unscaleable value for ios devices with fields with small font sizes
        let metaChange = null; //meta content value change indicator

        fields.forEach((field) => {
            const fieldFontSize = parseFloat(window.getComputedStyle(field).fontSize);
            if (fieldFontSize < 16) {
                field.addEventListener('touchstart', () => {
                    if (metaChange) {
                        clearTimeout(metaChange);
                    }

                    viewPortMeta.content = unScaleMeta;
                });

                field.addEventListener('focusout', () => {
                    if (metaChange) {
                        clearTimeout(metaChange);
                    }
                    metaChange = setTimeout(() => {
                        viewPortMeta.content = standardMeta;
                    }, 300)
                })
            }
        })
    }
}

// device type and ios detect function;
const detectDevice = () => {

    //detect ios device or not
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $body.classList.add('ios_device');
    } else if (navigator.userAgent.search("Mozilla") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $body.classList.add('moz');
    }

    //detect touch device or not
    if (isTouchDevice()) {
        $html.classList.add('touch');

        changeIosMeta();

    } else {
        $html.classList.add('web');
    }
}

//device call posibillity detect function
const detectCallPosibillity = () => {
    const phoneLink = $$('[href*="tel:"]');
    if (phoneLink.length > 0 && !/Android|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        phoneLink.forEach((link, index) => {
            link.removeAttribute('href');
        })
    }
}

const detectContentHeight = () => {
    let footerHeight = $$('.footer').length > 0 ? parseFloat(window.getComputedStyle($('.footer')).height) : 0;
    let headerHeight = $$('.header').length > 0 && $('.header').style.position != 'fixed' ? parseFloat(window.getComputedStyle($('.header')).height) : 0;

    let freeSpace = window.innerHeight - Math.round(footerHeight) - Math.round(headerHeight) - 1;
    if (freeSpace > 0) {
        $('.content').style.minHeight = freeSpace + 'px';
    } else {
        $('.content').style.minHeight = null;
    }
    ;
    $('.footer').style.opacity = 1;
}

const headerDropBtn = getElement('.drop_btn');
headerDropBtn.onClick(showDropBlock);


const openPopup = (evt) => {
    evt.preventDefault();
    document.body.classList.add('popup_opened');
    let popupName = '.' + evt.currentTarget.getAttribute('data-popup') + '_popup';
    let popupTemplate = '.' + evt.currentTarget.getAttribute('data-popup') + '_template';
    let popupContent = evt.currentTarget.getAttribute('data-content') || null;
    let popupCreateTime = 0;

    if (document.querySelectorAll(popupName).length < 1) {
        popupCreateTime = 300;
        document.body.insertAdjacentHTML('beforeend', document.querySelector(popupTemplate).innerHTML);

        if (document.querySelectorAll('.city_select').length > 0) {
            selectElements(popupContent);
        }

        if (document.querySelectorAll('#date_picker').length > 0) {
            dataPicker();
        }
    }

    setTimeout(() => {
        let $popup = document.querySelector(popupName);
        $popup.classList.add('showed');

        let formInPopup = $popup.querySelector('form');
        if (formInPopup) {
            validateBtn();
        }

        if (popupContent) {
            let $content = $popup.querySelector('.popup_content[data-content="' + popupContent + '"]');
            if ($content && !$content.classList.contains('active') || $popup.querySelector('.popup_content')) {
                $popup.querySelectorAll('.popup_content').forEach(content => {
                    content.classList.remove('active');
                });
                $content.classList.add('active');

            }
        }
    }, popupCreateTime);
};


const closePopup = () => {
    document.body.classList.remove('popup_opened');
    let popupBlocks = document.querySelectorAll('.popup_block');
    popupBlocks.forEach((popupBlock) => {
        popupBlock.classList.remove('showed');
    });
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup_close')) {
        closePopup();
    }
});

let popupBtns = document.querySelectorAll('.popup_btn');
popupBtns.forEach((btn) => {
    btn.addEventListener('click', openPopup);
});

const validateBtn = () => {
    if ($$('.validate_btn').length > 0) {
        $$('.validate_btn').forEach(($btn) => {
            const $form = $btn.closest('form');

            checkFields($form);
            $form.addEventListener('submit', function (e) {
                if ($$('.page_messages .message_block').length > 0) {
                    $('.page_messages .message_block').remove();
                }
                const checkValid = validateInputs($form);
                if (checkValid) {
                    if (typeof (submitCallback) == 'function') {
                        submitCallback(e);

                    }
                    return false;
                } else {
                    e.preventDefault();
                }
            });

        })
    }
};

const dataPicker = (target) => {
    var date_picker = new Datepicker('#date_picker', {
        time: true,
        separator: "/",
        min: new Date(),
        toValue: (date = '') => {
            return date.replace('@', " ");
        }
    });
};



const selectElements = (popupContent) => {
    const mySelectElements = document.querySelectorAll('.city_select');

    if (mySelectElements.length > 0) {
        const niceSelectOptions = {
            showSelectedItems: true,
        };

        mySelectElements.forEach((selectElement) => {
            if (document.querySelectorAll('.services_popup .city_select').length > 0) {
                const selectedValue = popupContent;
                const selectedOption = selectElement.querySelector(`option[value="${selectedValue}"]`);
                if (selectedOption) {
                    selectedOption.selected = true;
                }
            }

            new niceSelect(selectElement, niceSelectOptions);
        });
    }

};


function addClassesOnScroll() {
    var animationTransforms = document.querySelectorAll('.text_animation');
    var animationBlocks = document.querySelectorAll('.animation_block');
    var windowHeight = window.innerHeight;

    function isInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top + bounding.height / 2 - 250 < windowHeight &&
            bounding.bottom > 0
        );
    }

    animationTransforms.forEach(function (element) {
        if (isInViewport(element)) {
            element.classList.add('active');
        }
    });

    animationBlocks.forEach(function (element) {
        if (isInViewport(element)) {
            element.classList.add('showed');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    addClassesOnScroll();
});

window.addEventListener('scroll', function () {
    addClassesOnScroll();
});


//group all global functions in one function for exporting
const initGlobalFunctions = () => {
    detectDevice();
    detectCallPosibillity();
    showMenu();

    if (document.querySelectorAll('#date_picker').length > 0) {
        dataPicker();

    }


    selectElements();

    activateMenu(isTouchDevice(), $mobileSize);

    body.onClick(closeAllMenues);
    validateBtn();

}

export {
    initGlobalFunctions,
    detectContentHeight
}