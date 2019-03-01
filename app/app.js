(
    function()
    {
        var app = angular.module('t2gb',['ngMaterial',
                                         't2gb-modelo',
                                         't2gb-area-processo',
                                         't2gb-nivel-maturidade',
                                         't2gb-categoria',
                                         't2gb-nivel-capacidade',
                                         't2gb-meta-especifica',
                                         't2gb-meta-generica',
                                         't2gb-pratica-especifica',
                                         't2gb-produto-trabalho']);

        app.controller('MenuController',['$mdSidenav',function($mdSidenav)
        {
            var menuController = this;
            menuController.templateURL = "app/modelo/panel-template.html";
            
            menuController.toggleLeft = function() 
            {
                $mdSidenav('left').toggle();
            };
            
            menuController.setTemplateURL = function(templateURL)
            {
                menuController.templateURL = templateURL;
                menuController.toggleLeft();
            };
        }]);
    }   
)();