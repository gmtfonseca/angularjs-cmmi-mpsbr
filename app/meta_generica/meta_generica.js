(
	function()
	{
		var app = angular.module('t2gb-meta-generica',['ngMaterial','t2gb-modelo','t2gb-nivel-capacidade']);
        
        app.controller('MetaGenericaController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var metaGenericaController = this;
            metaGenericaController.searchKeywords = "";
            metaGenericaController.metasGenericas = [];

            metaGenericaController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            metaGenericaController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/meta_generica/create-template.html',
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
                createCtrl.modelo = "";
                createCtrl.nivelCapacidade = "";

                createCtrl.create = function() 
                {
                    metaGenericaController.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao,createCtrl.modelo,createCtrl.nivelCapacidade);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            metaGenericaController.create = function(sigla,nome,descricao,modelo,nivelCapacidade)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'modelo' : modelo,
                            'nivelCapacidade' : nivelCapacidade
                        },
                        url: 'http://localhost:8888/api/meta_generica/create.php'
                    }).then(function successCallback(result)
                    {
                        metaGenericaController.showToast(result.data.message)
                        metaGenericaController.read();

                    },function errorCallback(result)
                    {
                        metaGenericaController.showToast(result.data.message)
                    });
            };

            metaGenericaController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('A meta genérica será excluída.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    metaGenericaController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            metaGenericaController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/meta_generica/delete.php'
                            }).then(function successCallback(result)
                            {
                                metaGenericaController.showToast(result.data.message)
                                metaGenericaController.read();

                            },function errorCallback(result)
                            {
                                metaGenericaController.showToast(result.data.message)
                            });;
            };

            metaGenericaController.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/meta_generica/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            metaGenericaController.update = function(id,sigla,nome,descricao,modelo,nivelCapacidade)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'modelo' : modelo,
                            'nivelCapacidade' : nivelCapacidade
                        },
                        url: 'http://localhost:8888/api/meta_generica/update.php'
                }).then(function successCallback(result)
                {
                    metaGenericaController.showToast(result.data.message)
                    metaGenericaController.read();

                },function errorCallback(result)
                {
                    metaGenericaController.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                metaGenericaController.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;
                    updateCtrl.modelo = result.data.modelo;
                    updateCtrl.nivelCapacidade = result.data.nivelCapacidade;

                },function errorCallback(result)
                {
                    metaGenericaController.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    metaGenericaController.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao,updateCtrl.modelo,updateCtrl.nivelCapacidade);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            metaGenericaController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/meta_generica/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        metaGenericaController.metasGenericas = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            metaGenericaController.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/meta_generica/read_one.php?id=' + id
                            });
            };

            metaGenericaController.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/meta_generica/read.php'
                    }).then(function successCallback(result)
                    {
                        metaGenericaController.metasGenericas = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();