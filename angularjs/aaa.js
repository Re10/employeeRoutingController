angular
    .module('firstApp', ['ngMaterial', 'ui.router'])
    .controller('chipController', chipController);

function chipController($scope) {

    $scope.skills = [];

    console.log("skills", $scope.skills);

    $scope.add = function (skills) {
        console.log("within add fun");


        if (skills.length > 1) {
            console.log(skills);

        }
        else {
            $scope.msgs = 'Please choose atleast two hobbies option';
        }
    }
    $scope.states = {

        'Andhra Pradesh': ['Vijayawada', 'Guntur', 'Nellore', 'Kadapa'
        ],
        'Madhya Pradesh': ['Hyderabad', 'Warangal', 'Karimnagar'
        ],

        'San Francisco': ['SOMA', 'Richmond', 'Sunset'
        ],
        'Los Angeles': [
            'Burbank', 'Hollywood'
        ],

        'New South Wales': [
            'Sydney', 'Orange', 'Broken Hill'],
        'Victoria': ['Benalla', 'Melbourne'
        ]

    }
    console.log("STATATATATATATATATAhjgdshsf:=>", $scope.states);



    $scope.GetSelectedState = function (i) {
        //document.getElementById()
        $scope.number = document.getElementById("inputState").value;
        $scope.number1 = document.getElementById("inputState").key;
        console.log($scope.number);
        console.log($scope.states);
        // console.log("key are:", $scope.number1);
        // console.log("DATA:", $scope.states);
        // console.log("states are here:", $scope.states.state);
        // console.log("data:", $scope.states);
        // console.log("data:i", i);
        //console.log("STATATATATATATATATAhjgdshsf:=>", $scope.states[0]);
        // console.log("STATATATATATATATATAhjgdshsf:=>", $scope.states.state);

        $scope.stat = $scope.newemp.states;

        console.log("Cityyyy", $scope.stat);
        // if ($scope.newemp.states == true) {
        //     $scope.strState = e;
        // }



    };

}