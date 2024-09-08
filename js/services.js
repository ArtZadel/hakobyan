import { getElement, docReady, comboHover, tabSwitch, callPopup, openPopupByBtn, $, $$ } from "./imports/utils.js";
import { initGlobalFunctions, detectContentHeight } from "./main.js";

const toggleClass = (element, toggleClassName) => {
    element.classList.toggle(toggleClassName);
};

const countDetailsHeight = (button) => {
    const detailsDescription = button.parentElement.querySelector('.standard_textpage');
    const detailsBtn = button;

    if (!detailsDescription || !detailsBtn) {
        return;
    }

    let detailsHeight = detailsDescription.clientHeight;

    if (detailsHeight > 355) {
        detailsBtn.classList.add('active');
        detailsDescription.classList.add('exceeds-height');
    } else {
        detailsDescription.classList.remove('exceeds-height');
    }
};

const detailsButtons = document.querySelectorAll('.details_btn');
detailsButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const innerService = this.parentElement.querySelector('.inner_service');
        if (innerService) {
            toggleClass(innerService, 'open_details');
            countDetailsHeight(this);
        }
    });
});

window.addEventListener('load', function () {
    if (document.querySelector('.services_page')) {
        detailsButtons.forEach(button => {
            countDetailsHeight(button);
        });
    }
});

// Call document ready function and init all in ready
docReady(() => {
    // Global functions for all pages from main.js file
    initGlobalFunctions();
});

window.addEventListener('load', () => {
    detectContentHeight();

    window.addEventListener('resize', () => {
        detectContentHeight();
    });
});
