let homepage = 'home';
//            let homepage = 'main-resources';
let c = 10;
let oDivs = {
    subheader: $('#subheader'),
    icon: $('#subheader').find('#icon'),
    crown: $('#subheader').find('#crown'),
    summary: $('#summary'),
    yourep: $('#yourep')
}
let oUp = {
    subheader: {
        'padding-top': '190px'
    },
    icon: {
        width: '120px',
        height: '120px'
    },
    crown: {
        width: '58px',
        height: '58px',
        left: 'calc(50% + 29px)',
        top: '200px'
    },
    summary: {
        'font-size': '0px',
        'height': '0px'
    },
    yourep: {
        'font-size': '0px',
        'height': '0px'
    }
};
let oDown = {
    subheader: {
        'padding-top': '260px'
    },
    icon: {
        width: '210px',
        height: '210px'
    },
    crown: {
        width: '100px',
        height: '100px',
        left: 'calc(50% + 50px)',
        top: '330px'
    },
    summary: {
        'font-size': '3rem',
        'height': 'auto'
    },
    yourep: {
        'font-size': '2.4rem',
        'height': 'auto'
    }
};
let oUpFunk = {
    crown: function () {
        //                        console.log('oooooooo')
        $('#subheader').find('#crown').addClass('sub');
    }

};
let oDownFunk = {
    crown: function () {
        //                        console.log('oooooooo')
        //                        $('#subheader').find('#crown').addClass('sub');
    }

};
let state = null;

function updateDebug(p, v) {
//    console.log(p, v);
    let db = $('#debug');
    if (db.find(p).length === 0) {
        db.append(`<p id='debug-${p}'></p>`);
    }
    db.find(`#debug-${p}`).html(`${p}: ${v}`);
}

function countdown() {
    $('#resources-meter').find('p').html(c);
    if (c > 1) {
        c -= 1;
    } else {
        c = 10;
    }
}

function expandSubheader(boo, f, p, updateHistory) {
//    console.log('expand');
    let d = 200;
    let o = boo ? oUp : oDown
    let ofk = boo ? oUpFunk : oDownFunk;
    //    console.log(o);
    //    console.log(ofk);
    for (i in oDivs) {
        //        console.log(oDivs[i]);
        oDivs[i].animate(o[i], d, function () {
            if (ofk.hasOwnProperty(i)) {
                ofk[i]();
            }
        });
    }
    if (f) {
        setTimeout(f, d, p, updateHistory);
    }
}

function test(p) {
    console.log('test ' + p)
}

function updateHistory(p, update) {
    const newState = {
        page: p
    };
    const newURL = '#' + p;
    if (update) {
        window.history.pushState(newState, '', newURL);
    }
}

function showPage(p, update) {
//    console.log('show ' + p);
//    console.log('update? ' + update);
    $(`.main`).addClass('hidden');
    if (p) {
        updateHistory(p, update);
        p = 'main-' + p;
        $(`#${p}`).removeClass('hidden');
        $(`#${p}`).show();

        if (p !== 'main-home') {
            //                        $(`#subheader`).addClass('sub');
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

}

function mainClick(id, popstate) {
//    console.log(`mainClick: ${id}`);
    let expand = id !== 'home';
    let updateHistory = !popstate;
//    console.log(`expand: ${expand}`);
    //                console.log(expand);
    //    id = 'main-' + id;
    $(`.main`).addClass('hidden');
    expandSubheader(expand, showPage, id, updateHistory);
    $('.main').hide();
    //                showPage('main-' + id);
}

function setSubheaderVals() {
    // Set all the return values for animating the subheader
    for (var i in oDivs) {
        let o = oDown[i];
        for (j in o) {
            oDown[i][j] = oDivs[i].css(j);
        }
    }
}

function setupHTML() {
    oDivs = {
        subheader: $('#subheader'),
        icon: $('#subheader').find('#icon'),
        crown: $('#subheader').find('#crown'),
        summary: $('#summary'),
        yourep: $('#yourep')
    }
}

function loadSecondScriptIfExists(url) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = function () {
//        console.log('Second script loaded successfully.');
        // Additional logic after the second script is loaded
    };
    script.onerror = function (ev) {
        ev.preventDefault();
//        console.error(ev);
        console.log('NOTE: 404 error above is a non-issue in deployment');
        // Additional error handling logic
    };
    document.head.appendChild(script);
}

function setup() {
    $('.tile.button.home').off('click');
    $('.tile.button.home').on('click', function () {
        let id = $(this).attr('id');
        if (id) {
            mainClick(id.replace('tile-', ''));
        } else {
            alert('clicked element requires an id but has none specified')
        }
    });
    $('.backbutton').off('click');
    $('.backbutton').on('click', function () {
        //                    showPage(homepage);
        //                    expandSubheader(false);
        mainClick('home');
    });

    $('.tile').css({
        height: $('.tile').width() + 'px'
    });
    //                showPage();
    //                showPage(homepage);
    //                setInterval(countdown, 2000);
    state = {
        page: homepage
    };
    //    console.log('clear the history')
    window.history.replaceState(state, '', '');
    loadSecondScriptIfExists('js/devtools/devtools.js');
    setupHTML();
    setSubheaderVals();
}
window.addEventListener('popstate', function (event) {
    if (event.state) {
        console.log(event.state);
        //        showPage(event.state.page, false);
        mainClick(event.state.page, true);
    }
});
$(document).ready(function () {
    setup();
});
