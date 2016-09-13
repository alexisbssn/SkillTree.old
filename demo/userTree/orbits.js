angular.module("skilltree").controller("userTreeController", function ($scope) {
    
    $scope.createOrbits = function(){
        var models = angular.fromJson($scope.textAreaData);
        var skillsGroup = [{id:"0", type: "group", title: "Skills", items: []}];
        skillsGroup[0].items = models.Skills;
        $scope.skills = skillsGroup
        
        //var root = $(".orbitsRoot");
        //root.children().remove();
        //var skills = {type: "group", title: "Skills", items: []};
        //skills.items = models.Skills;
        //$scope.createSkillNodes(skills, root);
    };
    
    $scope.createSkillNodes = function(item, relativeRoot){
            if(item.type === "group"){
                var elem = $("<div class='orbital' id='" + item.id + "'>" + item.title + "</div>");
                var orbit = $("<div class='orbit'></div>");
                elem.append(orbit);
                relativeRoot.append(elem);
                $.each(item.items, function(index, newItem){
                    $scope.createSkillNodes(newItem, orbit);
                });
                elem.jOrbital();
            }else if(item.type === "skill"){
                var elem = $("<span class='planet' id='" + item.id + "'>" + item.title + "</div>");
                relativeRoot.append(elem);
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
    $scope.orbitalme = function($event){
        $($event.currentTarget).jOrbital();
        console.log($event.currentTarget);
    };
});

angular.module("skilltree").directive('orbital', function($timeout){
    return{
        restrict: 'A',
        link: {
            post: function(scope, element, attrs){
                $(element).jOrbital();
                console.log(attrs.id + " : " + scope.getItemById(attrs.id).title);
            }
        }
    };
});