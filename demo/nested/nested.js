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
            {data: "gt", label: "has more than ... taken"},
            {data: "lt", label: "has less than ... taken"},
            {data: "eq", label: "has equal to ... taken"},
            {data: "cst", label: "costs"}
        ],
        dropzones: {
            "Skills": [
                {
                    "type": "group",
                    "title": "Magic",
                    "items": [
                        {
                            "type": "skill",
                            "title": "Fireball",
                            "rules": [
                                {
                                    "type": "rule",
                                    "title": "test rule 1"
                                },
                                {
                                    "type": "rule",
                                    "title": "test rule 1"
                                }
                            ]
                        },
                        {
                            "type": "skill",
                            "title": "Frostbite"
                        },
                        {
                            "type": "skill",
                            "title": "Entangle"
                        },
                        {
                            "type": "skill",
                            "title": "Entangle"
                        }
                    ]
                },
                {
                    "type": "group",
                    "title": "Combat",
                    "items": [
                        {
                            "type": "skill",
                            "title": "Parry"
                        },
                        {
                            "type": "skill",
                            "title": "Lunge"
                        },
                        {
                            "type": "skill",
                            "title": "Slash"
                        }
                    ]
                },
                {
                    "type": "skill",
                    "title": "Health"
                }
            ]
        }
    };

    $scope.$watch('models.dropzones', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    $scope.editSkill = function () {
        $mdDialog.show({
            controller: function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            },
            templateUrl: 'dialog_skill.html',
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

    $scope.editRule = function (rule) {
        $scope.selectedRule = rule;
        $mdDialog.show({
            controller: function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            },
            templateUrl: 'dialog_rule.html',
            parent: angular.element(document.body),
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
        }).then(function (answer) {
            //$scope.status = 'You said the information was "' + answer + '".';
            if ($scope.selectedRule.ruleType === "") {
                delete $scope.selectedRule.ruleType;
            }
            $scope.editSkill();
        }, function () {
            //$scope.status = 'You cancelled the dialog.';
            if ($scope.selectedRule.ruleType === "") {
                delete $scope.selectedRule.ruleType;
            }
            $scope.editSkill();
        });
    };

    $scope.allowedTypes = function (list) {
        switch (list.$parent.type) {
            case "group":
                return ["group", "skill"];
                break;
            case "skill":
                return ["rule"];
                break;
            default:
                // rule
                return [];
        }
    };
});