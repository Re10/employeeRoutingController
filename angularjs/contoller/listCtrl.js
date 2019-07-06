app.controller("listController", listController);
function listController($scope, $http, $state, $stateParams) {
    $scope.msg = "helllllo";
    $scope.url = "/home/am-n6/Rekha/employee/db/";
    $scope.token = window.localStorage.getItem("token");
    console.log($scope.token);
    $http.get('http://localhost:4000/emp/').then(function (res) {
        console.log("within get method::;: ", res);
        $scope.emp = res.data.doc;
        
        console.log("data:===", $scope.emp);
        console.log("Image name",$scope.emp.myImg);
    })
    $scope.logout = function () {
        console.log("logout button clickes");
        window.localStorage.clear();
        $state.go("login");
    }
    var id = $stateParams.id;
    console.log("Id", id);
    $scope.delete = function (id) {
        console.log("within delete function", id);
        $http.delete('http://localhost:4000/emp/' + id).then(function (res) {
            console.log("within Delete method");
            res.data.doc = " ";
            $state.go("list");

        })

    }

}