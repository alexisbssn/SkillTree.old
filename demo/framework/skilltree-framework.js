angular.module("skilltree", ["ngRoute", "dndLists", "ngMaterial", "ngclipboard"])
    .config(function($routeProvider) {
        $routeProvider
            .when('/nested', {
                templateUrl: 'nested/nested-frame.html',
                controller: 'AdminPanelController'
            })
            .when('/tree', {
                templateUrl: 'userTree/userTree.html',
                controller: ''
            })
            .otherwise({redirectTo: '/tree'});
    })

    .directive('navigation', function($rootScope, $location) {
        return {
            template: '<li ng-repeat="option in options" ng-class="{active: isActive(option)}">' +
                      '    <a ng-href="{{option.href}}">{{option.label}}</a>' +
                      '</li>',
            link: function (scope, element, attr) {
                scope.options = [
                    {label: "Admin Page", href: "#/nested"},
                    {label: "User Page", href: "#/tree"},
                ];

                scope.isActive = function(option) {
                    return option.href.indexOf(scope.location) === 1;
                };

                $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
                    scope.location = $location.path();
                });
            }
        };
    });
