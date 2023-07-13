const homepage = 'main-home';
const setupHTML = function () {
    let backbutton = $('.backbutton');
    let hometiles = $('.tile.button.home');
    hometiles.off('click');
    hometiles.on('click', function () {
        let id = $(this).attr('id');
//        console.log(id);
        if (id) {
            mainClick(id.replace('tile-', ''));
        } else {
            alert('clicked element requires an id but has none specified')
        }
    });
    backbutton.off('click');
    backbutton.on('click', function () {
        showPage(homepage);
    });

    hometiles.css({height: $('.tile').width() + 'px'});
}
const showPage = function (p) {
//    console.log('show');
    $(`.main`).addClass('hidden');
    $(`#subheader`).removeClass('sub');
    if (p) {
        $(`#${p}`).removeClass('hidden');
        if (p !== 'main-home') {
            $(`#subheader`).addClass('sub');
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}
const mainClick = function (id) {
//    console.log('main');
    showPage();
    showPage('main-' + id);
}
const startup = function () {
//    console.log('startup');
    setupHTML();
    showPage(homepage);
}
