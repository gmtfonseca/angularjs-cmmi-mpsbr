(
	function()
	{
		var app = angular.module('t2gb-area-processo',['ngMaterial','t2gb-nivel-maturidade','t2gb-categoria']);
        
        app.controller('AreaProcessoController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var areaProcessoController = this;
            areaProcessoController.searchKeywords = "";
            areaProcessoController.areasProcesso = [];

            areaProcessoController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            areaProcessoController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/area_processo/create-template.html',
                    clickOutsideToClose: true,
                    controllerAs: 'createCtrl',
                    hasBackdrop: true,
                    parent: angular.element(document.body)
                });
            };
            

            function CreateController() 
            {
                var createCtrl = this;
                createCtrl.sigla = "";
                createCtrl.nome = "";
                createCtrl.descricao = "";
                createCtrl.nivelMaturidade = "";
                createCtrl.categoria = "";

                createCtrl.create = function() 
                {
                    areaProcessoController.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao,createCtrl.nivelMaturidade,createCtrl.categoria,createCtrl.modelo);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            areaProcessoController.create = function(sigla,nome,descricao,nivelMaturidade,categoria,modelo)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'nivelMaturidade' : nivelMaturidade,
                            'categoria' : categoria,
                            'modelo' : modelo
                        },
                        url: 'http://localhost:8888/api/area_processo/create.php'
                    }).then(function successCallback(result)
                    {
                        areaProcessoController.showToast(result.data.message)
                        areaProcessoController.read();

                    },function errorCallback(result)
                    {
                        areaProcessoController.showToast(result.data.message)
                    });
            };

            areaProcessoController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('A Área de Processo será excluído.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    areaProcessoController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            areaProcessoController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/area_processo/delete.php'
                            }).then(function successCallback(result)
                            {
                                areaProcessoController.showToast(result.data.message)
                                areaProcessoController.read();

                            },function errorCallback(result)
                            {
                                areaProcessoController.showToast(result.data.message)
                            });;
            };

            areaProcessoController.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/area_processo/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            areaProcessoController.update = function(id,sigla,nome,descricao,nivelMaturidade,categoria,modelo)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'nivelMaturidade' : nivelMaturidade,
                            'categoria' : categoria,
                            'modelo': modelo
                        },
                        url: 'http://localhost:8888/api/area_processo/update.php'
                }).then(function successCallback(result)
                {
                    areaProcessoController.showToast(result.data.message)
                    areaProcessoController.read();

                },function errorCallback(result)
                {
                    areaProcessoController.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                areaProcessoController.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;
                    updateCtrl.nivelMaturidade = result.data.nivelMaturidade;
                    updateCtrl.categoria = result.data.categoria;
                    updateCtrl.modelo = result.data.modelo;

                },function errorCallback(result)
                {
                    areaProcessoController.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    areaProcessoController.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao,updateCtrl.nivelMaturidade,updateCtrl.categoria,updateCtrl.modelo);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            areaProcessoController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/area_processo/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        areaProcessoController.areasProcesso = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            areaProcessoController.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/area_processo/read_one.php?id=' + id
                            });
            };

            areaProcessoController.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/area_processo/read.php'
                    }).then(function successCallback(result)
                    {
                        areaProcessoController.areasProcesso = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();