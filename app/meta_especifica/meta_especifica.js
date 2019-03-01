(
	function()
	{
		var app = angular.module('t2gb-meta-especifica',['ngMaterial','t2gb-area-processo']);
        
        app.controller('MetaEspecificaController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var metaEspecificaController = this;
            metaEspecificaController.searchKeywords = "";
            metaEspecificaController.metasEspecificas = [];

            metaEspecificaController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            metaEspecificaController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/meta_especifica/create-template.html',
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
                createCtrl.areaProcesso = "";

                createCtrl.create = function() 
                {
                    metaEspecificaController.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao,createCtrl.areaProcesso);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            metaEspecificaController.create = function(sigla,nome,descricao,areaProcesso)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'areaProcesso': areaProcesso
                        },
                        url: 'http://localhost:8888/api/meta_especifica/create.php'
                    }).then(function successCallback(result)
                    {
                        metaEspecificaController.showToast(result.data.message)
                        metaEspecificaController.read();

                    },function errorCallback(result)
                    {
                        metaEspecificaController.showToast(result.data.message)
                    });
            };

            metaEspecificaController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('A meta específica será excluída.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    metaEspecificaController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            metaEspecificaController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/meta_especifica/delete.php'
                            }).then(function successCallback(result)
                            {
                                metaEspecificaController.showToast(result.data.message)
                                metaEspecificaController.read();

                            },function errorCallback(result)
                            {
                                metaEspecificaController.showToast(result.data.message)
                            });;
            };

            metaEspecificaController.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/meta_especifica/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            metaEspecificaController.update = function(id,sigla,nome,descricao,areaProcesso)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'areaProcesso' : areaProcesso
                        },
                        url: 'http://localhost:8888/api/meta_especifica/update.php'
                }).then(function successCallback(result)
                {
                    metaEspecificaController.showToast(result.data.message)
                    metaEspecificaController.read();

                },function errorCallback(result)
                {
                    metaEspecificaController.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                metaEspecificaController.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;
                    updateCtrl.areaProcesso = result.data.areaProcesso;

                },function errorCallback(result)
                {
                    metaEspecificaController.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    metaEspecificaController.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao,updateCtrl.areaProcesso);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            metaEspecificaController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/meta_especifica/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        metaEspecificaController.metasEspecificas = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            metaEspecificaController.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/meta_especifica/read_one.php?id=' + id
                            });
            };

            metaEspecificaController.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/meta_especifica/read.php'
                    }).then(function successCallback(result)
                    {
                        metaEspecificaController.metasEspecificas = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();