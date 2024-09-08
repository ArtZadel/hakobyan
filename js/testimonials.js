import { getElement, docReady, closeAllMenues, slideDown, slideUp, comboHover, tabSwitch, callPopup, openPopupByBtn, $, $$ } from "./imports/utils.js";
import { initGlobalFunctions, detectContentHeight } from "./main.js";


const dropToggle = (evt) => {
    evt.preventDefault();
    const target = evt.currentTarget;
    const parent = target.parentNode;
    const dropBlock = parent.querySelector('.drop_block');

    const previouslyOpened = document.querySelector('.users_list.opened');
    if (previouslyOpened && previouslyOpened !== parent) {
        previouslyOpened.classList.remove('opened');
        const previouslyOpenedDropBlock = previouslyOpened.querySelector('.drop_block');
        if (previouslyOpenedDropBlock) {
            slideUp(previouslyOpenedDropBlock);
        }
    }

    parent.classList.toggle('opened');

    if (dropBlock) {
        const isOpened = parent.classList.contains('opened');
        if (isOpened) {
            slideDown(dropBlock);
        } else {
            slideUp(dropBlock);
        }
    }

    const usersListElements = document.querySelectorAll('.users_list');
    usersListElements.forEach((element) => {
        if (element !== parent) {
            element.classList.remove('selected');
        }
    });

    parent.classList.add('selected');
};


const handleUserListClick = (event) => {
    if (window.innerWidth > 1024) {
        const target = event.currentTarget;
        const htmlContent = target.innerHTML;
        const asdElement = getElement('.show_user .inner_block');

        $$('.users_list').forEach(element => {
            if (element !== target) {
                element.classList.remove('selected');
            }
        });

        target.classList.toggle('selected');

        asdElement.innerHTML = htmlContent;
    }
};


const scrollInfo = () => {
    if (window.innerWidth > 1024) {
        const tabItems = document.querySelectorAll('.users_list');
        const showUserBlock = document.querySelector('.show_user .inner_block');
        const tabSection = document.querySelector('.tab_section');
        tabItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.add('selected');
                tabItems.forEach(tab => tab.classList.remove('selected'));

                const content = item.querySelector('.drop_inner').innerHTML;

                showUserBlock.innerHTML = content;

                const topPosition = tabSection.getBoundingClientRect().top + window.pageYOffset - 100;

                window.scrollTo({ top: topPosition, behavior: 'smooth' });
            });
        });
    }
}

const appendSelectedContentToShow = () => {
    if (window.innerWidth > 1024) {
        const selectedTabInner = getElement('.users_list.selected');
        if (selectedTabInner) {
            const htmlContent = selectedTabInner.innerHTML;
            const asdElement = getElement('.show_user .inner_block');

            asdElement.innerHTML = '';

            asdElement.insertAdjacentHTML('beforeend', htmlContent);
        }
    }
};


docReady(() => {
    initGlobalFunctions();

});


window.addEventListener('load', () => {
    detectContentHeight();

    scrollInfo()

    if (window.innerWidth > 1024) {
        const usersListElements = $$('.users_list');
        usersListElements.forEach((element) => {
            element.addEventListener('click', handleUserListClick);
        });

        appendSelectedContentToShow();
    } else {
        document.querySelectorAll('.users_list .tab_inner').forEach(btn => {
            btn.addEventListener('click', dropToggle);
        });
    }
});

window.addEventListener('resize', () => {
    detectContentHeight();
    // Check window width before executing the function on resize
    if (window.innerWidth > 1024) {
        appendSelectedContentToShow();
    } else {
        document.querySelectorAll('.users_list .tab_inner').forEach(btn => {
            btn.addEventListener('click', dropToggle);
        });
    }
});