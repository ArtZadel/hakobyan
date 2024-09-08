import { closeAllMenues, getElement, slideDown, slideUp, fadeIn, fadeOut, $, $body, } from "./utils.js";

const activateMenu = () => {
    const menu = getElement('.main_menu');
    let openedSubs = null;
    const burgerBtn = $('.menu_btn');


    const togglemobileMenu = () => {
        if ($body.classList.contains('menu_opened')) {
            $body.classList.remove('menu_opened');
        } else {
            openedSubs = menu.querySelectorAll('.opened').length > 0 ? menu.querySelectorAll('.opened') : null;
            if (openedSubs) {
                openedSubs = null;
            }
            $body.classList.add('menu_opened');
        }
    };


    burgerBtn.addEventListener('click', togglemobileMenu);
};

export {
    activateMenu,
}