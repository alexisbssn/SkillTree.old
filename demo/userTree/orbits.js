angular.module("skilltree").controller("userTreeController", function ($scope, $timeout) {
    
    $scope.createOrbits = function(){
        var models = angular.fromJson($scope.textAreaData);
        var skillsGroup = [{id:"0", type: "group", title: "Skills", items: []}];
        skillsGroup[0].items = models.Skills;
        $scope.skills = skillsGroup;
        
        // Timeout so that we let time to render before starting any jQuery on an unfinished DOM
        $timeout(function(){
           $scope.traverseAndOrbit(); 
        });
    };
    
    $scope.traverseAndOrbit = function(){
        var target = $('.orbitsRoot').children().first();
        $scope.activateOrbits(target);
    };
    
    $scope.activateOrbits = function(relativeRoot){
        $(relativeRoot).children().each(function(index, item) {
            $scope.activateOrbits($(this));
        });
        if($(relativeRoot).hasClass("orbital")){
            $(relativeRoot).jOrbital();
        }
    };
     
    $scope.models = {};
    $scope.textAreaData = "";
    
    $scope.skillPoints = 0;
    $scope.remainingSkillPoints = function(){
        var tempPoints = $scope.skillPoints;
        for(var i = 0; i < $scope.chosenSkills.length; i++){
            for(var j = 0; j < chosenSkills[i].rules.length; j++){
                if(chosenSkills[i].rules[j].ruleType === "cst"){
                    tempPoints = tempPoints - chosenSkills[i].rules[j].value;
                    break;
                }
            }
        }
        return tempPoints;
    };
    $scope.chosenSkills = [];
    
    $scope.getItemById = function(id){
        return $scope.recursiveFindById(id, $scope.skills);
    };
    $scope.recursiveFindById = function(id, group){
        for(var i = 0; i < group.length; i++){
            if(group[i].id === id){
                return group[i];
            }
            if(group[i].type === "group"){
                var gottenGroup = $scope.recursiveFindById(id, group[i]);
                if(gottenGroup !== null){
                    return gottenGroup;
                }
            }
        }
        return null;
    };
});

angular.module('skilltree').directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});