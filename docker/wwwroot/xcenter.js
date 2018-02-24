var ts = 0;
var menuStr = sessionStorage.getItem('menu');
if (menuStr) {
    setMenu(JSON.parse(menuStr));
} else {
    $.getJSON('/menu', {}, function (rlt) {
        setMenu(rlt);
        sessionStorage.setItem('menu', JSON.stringify(rlt));
    });
}
function setMenu(data) {
    _data = data;
    _data.nopopover = localStorage.getItem('left') != 'min';
    new Vue({
        el: '#menu', data: _data, router: xRouter, created() {
            this.checkLogin();
            $('.menu-group').show();
        }, methods: {
            submenu: function (sub, event) {
                sub.open = !sub.open;
            }
        }
    });
    new Vue({ el: '#topbar', data: _data });
    var active = $('.menu-item[href="' + location.pathname + '"]');
    active.addClass('router-link-exact-active')
    if (active.hasClass('menu-item-sub')) {
        active.parent().prev()[0].click()
    }
}
function Switch() {
    if (Vue.prototype.getCookie('min') == '1') {
        $('#left').removeClass('min');
        Vue.prototype.delCookie('min');
        _data.nopopover = true;
    } else {
        $('#left').addClass('min');
        Vue.prototype.setCookie('min', '1');
        _data.nopopover = false;
    }
}
function GoHome() {
    sessionStorage.removeItem('menu');
    location.href = '/';
}
function JsAPI() {
    var _do = Vue.prototype.getCookie('do');
    if (_do) {
        Vue.prototype.delCookie('do');
        if (_do == 'tips') {
            var _type = Vue.prototype.getCookie('type');
            var _message = decodeURIComponent(Vue.prototype.getCookie('message'));
            Vue.prototype.delCookie('message');
            if (_type) {
                Vue.prototype.delCookie('type');
                Vue.prototype.$message({ message: _message, type: _type });
            } else {
                Vue.prototype.$message({ message: _message });
            }
        } else if (_do == 'path') {
            var _path = Vue.prototype.getCookie('path');
            Vue.prototype.delCookie('path');
            if (_path) {
                _path = '/' + decodeURI(_path);
                history.replaceState(null, '', _path);
            }
        }
        setTimeout(JsAPI, 1000);
    } else {
        setTimeout(JsAPI, 100);
    }
}
JsAPI();