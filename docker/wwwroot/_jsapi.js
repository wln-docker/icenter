var jsapi = '';
function iTips(message, success) {
    if (self != top) {
        if (arguments.length == 1) {
            $.getScript(jsapi + '?do=tips&message=' + message);
        } else if (success) {
            $.getScript(jsapi + '?do=tips&type=success&message=' + message);
        } else {
            $.getScript(jsapi + '?do=tips&type=error&message=' + message);
        }
    } else if (arguments.length == 1) {
        Vue.prototype.$message({ message: message });
    } else if (success) {
        Vue.prototype.$message({ message: message, type: 'success' });
    } else {
        Vue.prototype.$message({ message: message, type: 'error' });
    }
}
var _href = '';
function iPath() {
    if (self != top) {
        setInterval(function () {
            if (location.href != _href) {
                _href = location.href;
                if (localStorage.getItem('reload')) {
                    try {
                        localStorage.removeItem('reload');
                        if (typeof (app) != 'undefined' && typeof (app.refresh) == 'function') {
                            app.refresh();
                        } else if (typeof (appList) != 'undefined' && typeof (appList.refresh) == 'function') {
                            appList.refresh();
                        } else {
                            self.location.reload();
                        }
                    } catch (e) { }
                }
                $.getScript(jsapi + '?do=path&url=' + encodeURIComponent(_href));
            }
        }, 200)
    }
}
setTimeout(iPath, 800);