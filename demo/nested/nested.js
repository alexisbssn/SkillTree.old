angular.module("skilltree").controller("AdminPanelController", function ($scope, $mdDialog) {
    
    $scope.models = {
        selected: null,
        templates: [
            {type: "skill", title: "new skill", rules: []},
            {type: "group", title: "new skill group", items: []},
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
                    type: "group",
                    title: "Magic",
                    items: [
                        {
                            type: "skill",
                            title: "Fireball",
                            rules: [
                                {
                                    type: "rule",
                                    title: "test rule 1"
                                },
                                {
                                    type: "rule",
                                    title: "test rule 2"
                                }
                            ]
                        },
                        {
                            type: "skill",
                            title: "Frostbite",
                            rules: []
                        },
                        {
                            type: "skill",
                            title: "Entangle",
                            rules: []
                        },
                        {
                            type: "skill",
                            title: "Magic missile",
                            rules: []
                        }
                    ]
                },
                {
                    type: "group",
                    title: "Combat",
                    items: [
                        {
                            type: "skill",
                            title: "Parry",
                            rules: []
                        },
                        {
                            type: "skill",
                            title: "Lunge",
                            rules: []
                        },
                        {
                            type: "skill",
                            title: "Slash",
                            rules: []
                        }
                    ]
                },
                {
                    type: "skill",
                    title: "Health",
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
            templateUrl: 'editDialog.html',
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
});