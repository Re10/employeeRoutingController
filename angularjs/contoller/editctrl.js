app.controller("editController", editController);
function editController($scope, $http, $state, $stateParams) {

    $scope.msg = "hello";
    $scope.url = "/home/am-n6/Rekha/employee/db/";
    var id = $stateParams.id;
   // console.log("ID++++", id);
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
            $scope.msgs = 'Please choose atleast two hobbies option';
    }


    $scope.states = [
        { state: 'Maharashtra', cities: ['Nashik', 'Pune', 'Mumbai', 'Ahmednagar'] },
        { state: 'Gujarat', cities: ['Surat', 'Ahamadabad', 'Badoda', 'Vadodara'] },
        { state: 'Madhyapradesh', cities: ['Indor', 'Bhopal', 'Jabalpur', 'Ujjin'] },
        { state: 'Karnataka', cities: ['Bengaluru', 'Hubali', '	Mangalore', 'Gulbarga'] }
    ];
    // state data start
    $scope.stateData = [];
    $scope.statecity = [];
    console.log("states:", $scope.states);
    for (var i = 0; i < $scope.states.length; i++) {
        // console.log("states:", $scope.states[i].state);
        $scope.stateData.push($scope.states[i].state);
    }
    console.log("sates:", $scope.stateData);
    for (var i = 0; i < $scope.states.length; i++) {
        // console.log("states:", $scope.states[i].state);
        $scope.statecity.push($scope.states[i].city);
    }
    console.log("sates:", $scope.statecity);

    $scope.selectionChange = function () {
        console.log("Selected state:", $scope.newemp.state);
        for (var i = 0; i < $scope.stateData.length; i++) {
            if ($scope.newemp.state == $scope.stateData[i]) {
                $scope.cities = $scope.states[i].cities;
            }
        }

        console.log("Cities:", $scope.cities);
    }
    $scope.skills = [];
    $scope.add = function () {
        if ($scope.skills.length == 1) {
            $scope.mes = "please put atleast two Skills";
        }
    }


    $http.get('http://localhost:4000/emp/' + id).then(function (res) {
        console.log(document.getElementById('inputState').value = $scope.state);
        console.log("within get method::;: ", res);
        $scope.newemp = res.data.doc;
        console.log("data:===", $scope.newemp);
        console.log("date=>", $scope.newemp.dob);
        $scope.newemp.dob = new Date($scope.newemp.dob);
        console.log("Date:", dob);

        console.log("skills aeeeeee", $scope.newemp.skills);
        $scope.skills = $scope.newemp.skills[0].split(',');
        console.log("skills Splitsd", $scope.skills);
        console.log("state  :===", $scope.newemp.state);
        console.log("city  :===", $scope.newemp.city);
        console.log("dob   :===", $scope.newemp.dob);
        console.log("Hobbies   :===", $scope.newemp.hobbies);
        console.log("hhhhhhhhhhhhhhhhhhhhhh:", $scope.stateData);
        console.log("sates:", $scope.states);

        for (var i = 0; i < $scope.stateData.length; i++) {
            if ($scope.newemp.state == $scope.stateData[i]) {
                $scope.cities = $scope.states[i].cities;
            }
        }

        console.log("Cities:", $scope.cities);


        $scope.hobbie = $scope.newemp.hobbies[0].split(',');

        console.log("HABBIES ARE:", $scope.hobbie);
        console.log("HABBIES ARE STATIC :", $scope.hobbies);
        $scope.details = [false, false, false, false];
        for (let i = 0; i < $scope.hobbies.length; i++) {
            for (let j = 0; j < $scope.hobbie.length; j++) {
                if ($scope.hobbies[i].name === $scope.hobbie[j]) {
                    $scope.hobbi = $scope.hobbies[i].name;
                    console.log("matched data", $scope.hobbi);
                    $scope.details[i] = true;
                }
            }
        }
        console.log($scope.details);

    });

    $scope.submit = function (id) {
        console.log("within submit function");
        console.log("ID:===>", id);
        console.log("DATA IS:", $scope.newemp);
        console.log("HOBBIES:", $scope.result);
        $scope.newemp.hobbies = $scope.result;
        $scope.newemp.skills = $scope.skills;
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
        console.log("IMG:", $scope.newemp.file);
        console.log("formdata isss:", formData);
        for (var value of formData.values()) {
            console.log(value);
        }

        $http.put('http://localhost:4000/emp/' + id, formData, {

            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }

        }).then(function (res) {


            // $state.go("list");
        });
        $state.go("list");
        // $scope.newemp = {};

    }


}
