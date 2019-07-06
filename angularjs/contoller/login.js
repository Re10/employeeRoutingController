app.controller("loginController", loginController);
function loginController($scope, $http, $state, $stateParams, $rootScope, toastr) {
    $scope.msg = "hello";
    var id = $stateParams.id;
    // console.log("ID++++", id);
    // console.log("within  metho ", $scope.newregi);
    $scope.submit = function () {
        console.log("Within submit function");

        $http.post('http://localhost:4000/regies/' + id, $scope.newregi).then(function (res) {

            console.log("within get method: ", $scope.newregi);
            console.log("username and pass:", $scope.newregi.email);
            console.log("Response:", res);
            console.log("Response:", res.data.token);
            console.log("msges", res.data.message);
            if (res.data.message == 'Auth Successful') {
                toastr.success("Login Successful");
                window.localStorage.setItem('token', res.data.token);
                $state.go("list");
            }
            else {
                toastr.error("Login Error");

            }
        });

    }
    $scope.reset = function () {
        console.log("within reset function:");
        console.log("email", $scope.newregi.email);
        $http.post('http://localhost:4000/for/', $scope.newregi).then(function (res) {
            console.log("within Post forgot");
            console.log(res);
            $state.go("login");
        });

    }
}
