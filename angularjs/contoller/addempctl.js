app.controller("addempController", addempController);

function addempController($scope, $http, $state) {
    $scope.msg = "hello";
    $scope.skills = [];
    console.log("skills are:", $scope.skills);
    $scope.hobbies = [
        { id: 1, name: "swiming" },
        { id: 2, name: 'tracking' },
        { id: 3, name: 'Cycling' },
        { id: 4, name: 'Games' }

    ];
    $scope.checkVal = function (choice) {
        console.log("within check value function");
        $scope.details = [];
        angular.forEach(choice, function (value, key) {
            console.log("within forEach loop");

            if (choice[key].checked) {

                $scope.details.push(choice[key].name);

            }
        });
        if ($scope.details.length > 1) {
            $scope.msgs = 'Selected Values: ' + $scope.details.toString();
            $scope.result = $scope.details.toString();
            console.log("array:", $scope.msgs);
        }
        else
            $scope.mes = 'Please put atleast two Skills';
    }


    $scope.states = [
        { state: 'Maharashtra', cities: ['Nashik', 'Pune', 'Mumbai', 'Ahmednagar'] },
        { state: 'Gujarat', cities: ['Surat', 'Ahamadabad', 'Badoda', 'Vadodara'] },
        { state: 'Madhyapradesh', cities: ['Indor', 'Bhopal', 'Jabalpur', 'Ujjin'] },
        { state: 'Karnataka', cities: ['Bengaluru', 'Hubali', '	Mangalore', 'Gulbarga'] }
    ];
    // state data start
    $scope.stateData = [];
    console.log("states:", $scope.states);
    for (var i = 0; i < $scope.states.length; i++) {
        // console.log("states:", $scope.states[i].state);
        $scope.stateData.push($scope.states[i].state);
    }
    console.log("sates:", $scope.stateData);

    $scope.selectionChange = function () {
        console.log("Selected state:", $scope.newemp.state);
        for (var i = 0; i < $scope.stateData.length; i++) {
            if ($scope.newemp.state == $scope.stateData[i]) {
                $scope.cities = $scope.states[i].cities;
            }
        }

        console.log("Cities:", $scope.cities);
    }


    $scope.add = function () {
        if ($scope.skills.length == 1) {
            $scope.mes = "please put atleast two Skills";
        }
    }
    // $scope.zip = function () {
    //     if ($scope.zip.length > 5) {
    //         $scope.zipms = "Zip code should be 5 digit";
    //     }
    // }

    console.log("mobile no:", $scope.mob);
    $scope.submit = function () {
        console.log("within submit function");
        console.log("HOBBIES:", $scope.result);
        $scope.newemp.hobbies = $scope.result;

        $scope.newemp.skills = $scope.skills;
        console.log("DATAAAA:", $scope.newemp.result);
        console.log("DATAAAA777:", $scope.newemp);

        $scope.newemp.file = imgFile;
        console.log('save function img file', $scope.newemp.file);

        var formData = new FormData();
        formData.append("fname", $scope.newemp.fname);
        formData.append("lname", $scope.newemp.lname);
        formData.append("email", $scope.newemp.email);
        formData.append("mob", $scope.newemp.mob);
        formData.append("dob", $scope.newemp.dob);
        formData.append("addr", $scope.newemp.addr);
        formData.append("state", $scope.newemp.state);
        formData.append("city", $scope.newemp.city);
        formData.append("zip", $scope.newemp.zip);
        formData.append("gender", $scope.newemp.gender);
        formData.append("hobbies", $scope.newemp.hobbies);
        formData.append("skills", $scope.newemp.skills);
        formData.append("salary", $scope.newemp.salary);
        formData.append("file", $scope.newemp.file);
        console.log("formdata isss:", formData);
        $http.post('http://localhost:4000/emp/', formData, {

            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }

        }).then(function (res) {


            $state.go("list");
        });
        $scope.newemp = {};

    }




}

