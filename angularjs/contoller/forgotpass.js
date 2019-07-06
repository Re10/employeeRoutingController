app.controller("forgotController", forgotController);

function forgotController($scope, $http, $state, $stateParams) {
    $scope.msg = "hii";
    var id = $stateParams.id;
    console.log("ID++++", id);
    console.log("passsss++++", $scope.newregi);

    $scope.submit = function () {
        console.log("within submit function");
        console.log("passsss++++", $scope.newregi);
        if ($scope.newregi.pass == $scope.newregi.cpass) {
            $http.put("http://localhost:4000/regi/" + id, $scope.newregi).then(function (res) {
                console.log("within put method");
                console.log("Response:", res);
                $state.go("login");
            })
        }
        else {
            console.log("new pass and confirm pass are not same");
        }
    }



}