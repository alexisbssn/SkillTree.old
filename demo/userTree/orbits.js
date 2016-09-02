angular.module("skilltree").controller("userTreeController", function ($scope) {
    
    $scope.createOrbits = function(){
        var root = $(".orbitsRoot");
        root.children().remove();
        var skills = {type: "group", title: "Skills", items: []};
        skills.items = models.dropzones.Skills;
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
    
    //$scope.$watch('models.jsonRules', function (model) {
    //    $scope.models = angular.fromJson(model);
    //    $scope.createOrbits();
    //}, true);
    
    //test data, to remove.
    var models = {
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
});