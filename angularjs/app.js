
var imgFile;

var app = angular.module("myApp", ['toastr', 'ngMaterial', 'ui.router']).config(($stateProvider, $httpProvider, $urlRouterProvider) => {
    //$qProvider.errorOnUnhandledRejections(false);
    $stateProvider.state("employees", {
        url: "/employees",
        templateUrl: "employee.html",
        controller: "employeeController",
        controllerAs: 'employeeCtrl'
    }).state("list", {
        url: "/list",
        templateUrl: "list.html",
        controller: "listController",
        controllerAs: 'listCtrl',
        resolve: {
            authRouth: ['authoService', '$state', function (authoService, $state) {
                if (authoService.auth()) {
                    return true;
                }
                else {
                    $state.go('login');
                    return false;
                }
            }]
        }
    })
        .state("edit", {
            url: "/edit/:id",
            templateUrl: "edit.html",
            controller: "editController",
            controllerAs: "editctrl",
        }).state("addemp", {
            url: "/addemp",
            templateUrl: "addemp.html",
            controller: "addempController",
            controllerAs: 'addempCtrl'
        }).state("auth", {
            url: "/auth",
            templateUrl: "auth.html",
            controller: "authController",
            controllerAs: "authCtrl"
        }).state("login", {
            url: "/login",
            templateUrl: "login.html",
            controller: "loginController",
            controllerAs: "loginCtrl"
        }).state("forgot", {
            url: "/forgot/:id",
            templateUrl: "forgotpass.html",
            controller: "forgotController",
            controllerAs: "forgotCtrl"
        })
});

// app.run(function (cfCryptoHttpInterceptor, $rootScope) {
//     $rootScope.base64Key = CryptoJS.enc.Base64.parse("2b7e151628aed2a6abf7158809cf4f3c");
//     $rootScope.iv = CryptoJS.enc.Base64.parse("3ad77bb40d7a3660a89ecaf32466ef97");
// })



function uploadImg(event) {
    console.log(event);
    imgFile = event.target.files[0];
    console.log("image file:", imgFile);
}