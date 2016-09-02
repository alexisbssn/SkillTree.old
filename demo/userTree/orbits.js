angular.module("skilltree").controller("userTreeController", function ($scope) {
    
    $scope.createOrbits = function(){
        models = angular.fromJson($scope.textAreaData);
        
        var root = $(".orbitsRoot");
        root.children().remove();
        var skills = {type: "group", title: "Skills", items: []};
        skills.items = models.Skills;
        $scope.createSkillNodes(skills, root);
    };
    
    $scope.createSkillNodes = function(item, relativeRoot){
            if(item.type === "group"){
                var elem = $("<div class='orbital'>" + item.title + "</div>");
                var orbit = $("<div class='orbit'></div>");
                elem.append(orbit);
                relativeRoot.append(elem);
                $.each(item.items, function(index, newItem){
                    $scope.createSkillNodes(newItem, orbit);
                });
                elem.jOrbital();
            }else if(item.type === "skill"){
                var elem = $("<span class='planet'>" + item.title + "</div>");
                relativeRoot.append(elem);
            }
    };    
    var models = {};
    $scope.textAreaData = "";
});