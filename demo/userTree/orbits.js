angular.module("skilltree").controller("userTreeController", function ($scope) {
    $scope.createOrbits = function(){
        $(".orbital4").jOrbital({});
        $(".orbital3").jOrbital({});
        $(".orbital2").jOrbital({});
        $(".orbital").jOrbital({});  
    };
    
    $scope.$watch('models.jsonRules', function (model) {
        $scope.createOrbits();
    }, true);
});