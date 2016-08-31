angular.module("skilltree").controller("AdminPanelController", function ($scope, $mdDialog) {
    $scope.tagetSelectionInProcess = null;
    $scope.models = {
        selected: null,
        templates: [
            {id: "", type: "skill", title: "new skill", description: "", rules: []},
            {id: "", type: "group", title: "new skill group", items: []},
            {type: "rule", title: "new rule", target: "", ruleType: "", value: ""}
        ],
        ruleTypes: [
            {data: "", label: "-- Select a rule type --"},
            {data: "gt", label: "has more than ... taken in target"},
            {data: "lt", label: "has less than ... taken in target"},
            {data: "eq", label: "has equal to ... taken in target"},
            {data: "cst", label: "costs ... target"}
        ],
        dropzones: {
            Skills: [
                {
                    id: "1",
                    type: "group",
                    title: "Magic",
                    items: [
                        {
                            id: "2",
                            type: "skill",
                            title: "Fireball",
                            description: "2 damage",
                            rules: []
                        },
                        {
                            id: "3",
                            type: "skill",
                            title: "Frostbite",
                            description: "2 damage",
                            rules: []
                        },
                        {
                            id: "4",
                            type: "skill",
                            title: "Entangle",
                            description: "2 damage",
                            rules: []
                        },
                        {
                            id: "5",
                            type: "skill",
                            title: "Magic missile",
                            description: "2 damage",
                            rules: []
                        }
                    ]
                },
                {
                    id: "6",
                    type: "group",
                    title: "Combat",
                    items: [
                        {
                            id: "7",
                            type: "skill",
                            title: "Parry",
                            description: "block 2 damage",
                            rules: []
                        },
                        {
                            id: "8",
                            type: "skill",
                            title: "Lunge",
                            description: "2 damage",
                            rules: []
                        },
                        {
                            id: "9",
                            type: "skill",
                            title: "Slash",
                            description: "2 damage",
                            rules: []
                        }
                    ]
                },
                {
                    id: "10",
                    type: "skill",
                    title: "Health",
                    description: "2 hp",
                    rules: []
                }
            ]
        }
    };
    
    $scope.copyZone = [];

    $scope.$watch('models.dropzones', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.edit = function () {
        $mdDialog.show({
            controller: function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            },
            templateUrl: 'nested/editDialog.html',
            parent: angular.element(document.body),
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        }).then(function (answer) {
            //$scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            //$scope.status = 'You cancelled the dialog.';
        });
    };
    
    $scope.$watch('models.selected', function(){
        if($scope.targetSelectionInProcess)
        {
            $scope.targetSelectionInProcess.target = $scope.models.selected.id;
            $scope.models.selected = $scope.targetSelectionInProcess;
            $scope.targetSelectionInProcess = null;
            $scope.edit();
        }
    }, true);
    
    $scope.onClickSelectTarget = function(){
        $scope.targetSelectionInProcess = $scope.models.selected;
        $mdDialog.hide();
    };
    
    $scope.finishTargetSelection = function(newlySelected, currentlySelected){
        if($scope.targetSelectionInProcess === true)
        {
            $scope.targetSelectionInProcess = false;
            console.log($scope.models.selected);
            currentlySelected.target = $scope.models.selected.id;
            $scope.models.selected = currentlySelected;
            $scope.edit();
        }
    };
});