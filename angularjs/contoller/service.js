app.service('authoService', function () {
    this.auth = function () {
        return !!window.localStorage.getItem("token");
    }
});