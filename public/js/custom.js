// PASSWORD-TOGGLE

$(function () {

    $('.eye').click(function () {
        if ($(this).hasClass('eye-close')) {
            $(this).removeClass('eye-close');
            $(this).addClass('eye-open');
            $(this).parent().parent().find('.password').attr('type', 'text');
        } else {
            $(this).removeClass('eye-open');
            $(this).addClass('eye-close');
            $(this).parent().parent().find('.password').attr('type', 'password');
        }
    });
});

// PASSWORD-TOGGLE

// DROPDOWN

$(document).ready(function () {
    $('.drop-btn .lesson-data h2 button').click(function () {
        $(this).toggleClass('active');
        $(this).parent().parent().parent().parent().find('.drop-btn').toggleClass('active');
        $(this).closest('.assessment-result').find('.drop-list').first().slideToggle('fast');
        event.stopPropagation();
    });
});

$(document).ready(function () {
    $('.lessons-btn').click(function () {
        $(this).toggleClass('active');
        $('.lessons-list').slideToggle('fast');
        event.stopPropagation();
    });
});

$(document).ready(function () {
    $('.correct-answer-in button').click(function () {
        $(this).toggleClass('active');
        $(this).closest('.correct-answer-in').find('.correct-answer-list').first().slideToggle('fast');
        // $('.correct-answer-list').slideToggle('fast');
        event.stopPropagation();
    });
});


$(document).ready(function () {
    // Toggle Main Dropdown
    $('.influ-more-drop-btn').click(function (event) {
        event.stopPropagation();

        // Close all inner dropdowns
        $('.influ-drop-list').slideUp('fast');
        $('.far').removeClass('active');

        // Toggle only this main dropdown
        const $targetList = $(this).siblings('.influ-more-drop-list');
        $('.influ-more-drop-list').not($targetList).slideUp('fast');
        $targetList.slideToggle('fast');
    });

    // Toggle Inner Dropdowns
    $('.influ-drop-btn').click(function (event) {
        event.stopPropagation(); // <- prevents outer dropdown from closing

        // Close outer main dropdown
        $('.influ-more-drop-list').not($(this).closest('.influ-more-drop-list')).slideUp('fast');

        // Toggle this inner dropdown
        const $targetList = $(this).siblings('.influ-drop-list');
        $('.influ-drop-list').not($targetList).slideUp('fast');
        $targetList.slideToggle('fast');

        // Toggle icon
        const $icon = $(this).find('.far');
        $('.far').not($icon).removeClass('active');
        $icon.toggleClass('active');
    });

    // Prevent closing when clicking inside dropdowns
    $('.influ-drop-list, .influ-more-drop-list, .influ-more-drop-list-inner').click(function (event) {
        event.stopPropagation();
    });

    // Click outside closes everything
    $(document).click(function () {
        $('.influ-drop-list, .influ-more-drop-list').slideUp('fast');
        $('.far').removeClass('active');
    });
});



// DROPDOWN

// TOGGLE SIDEBAR

const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})

// TOGGLE SIDEBAR



