angular.module("skilltree", ["ngRoute", "dndLists", "ngMaterial", "ngclipboard"])
    .config(function($routeProvider) {
        $routeProvider
            .when('/nested', {
                templateUrl: 'nested/nested-frame.html',
                controller: 'AdminPanelController'
            })
            .when('/types', {
                templateUrl: 'types/types-frame.html',
                controller: 'TypesDemoController'
            })
            .when('/advanced', {
                templateUrl: 'advanced/advanced-frame.html',
                controller: 'AdvancedDemoController'
            })
            .otherwise({redirectTo: '/nested'});
    })

    .directive('navigation', function($rootScope, $location) {
        return {
            template: '<li ng-repeat="option in options" ng-class="{active: isActive(option)}">' +
                      '    <a ng-href="{{option.href}}">{{option.label}}</a>' +
                      '</li>',
            link: function (scope, element, attr) {
                scope.options = [
                    {label: "Nested Containers", href: "#/nested"},
                    {label: "Item Types", href: "#/types"},
                    {label: "Advanced Demo", href: "#/advanced"},
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
