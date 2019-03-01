(
	function()
	{
		var app = angular.module('t2gb-nivel-capacidade',['ngMaterial','t2gb-modelo']);
        
        app.controller('NivelCapacidadeController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var nivelCapacidadeController = this;
            nivelCapacidadeController.searchKeywords = "";
            nivelCapacidadeController.niveisCapacidade = [];

            nivelCapacidadeController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            nivelCapacidadeController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/nivel_capacidade/create-template.html',
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

                createCtrl.create = function() 
                {
                    nivelCapacidadeController.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao,createCtrl.modelo);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            nivelCapacidadeController.create = function(sigla,nome,descricao,modelo)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'modelo' : modelo
                        },
                        url: 'http://localhost:8888/api/nivel_capacidade/create.php'
                    }).then(function successCallback(result)
                    {
                        nivelCapacidadeController.showToast(result.data.message)
                        nivelCapacidadeController.read();

                    },function errorCallback(result)
                    {
                        nivelCapacidadeController.showToast(result.data.message)
                    });
            };

            nivelCapacidadeController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('O nível de capacidade será excluído.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    nivelCapacidadeController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            nivelCapacidadeController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/nivel_capacidade/delete.php'
                            }).then(function successCallback(result)
                            {
                                nivelCapacidadeController.showToast(result.data.message)
                                nivelCapacidadeController.read();

                            },function errorCallback(result)
                            {
                                nivelCapacidadeController.showToast(result.data.message)
                            });;
            };

            nivelCapacidadeController.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/nivel_capacidade/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            nivelCapacidadeController.update = function(id,sigla,nome,descricao,modelo)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'modelo': modelo
                        },
                        url: 'http://localhost:8888/api/nivel_capacidade/update.php'
                }).then(function successCallback(result)
                {
                    nivelCapacidadeController.showToast(result.data.message)
                    nivelCapacidadeController.read();

                },function errorCallback(result)
                {
                    nivelCapacidadeController.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                nivelCapacidadeController.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;
                    updateCtrl.modelo = result.data.modelo;

                },function errorCallback(result)
                {
                    nivelCapacidadeController.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    nivelCapacidadeController.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao,updateCtrl.modelo);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            nivelCapacidadeController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/nivel_capacidade/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        nivelCapacidadeController.niveisCapacidade = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            nivelCapacidadeController.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/nivel_capacidade/read_one.php?id=' + id
                            });
            };

            nivelCapacidadeController.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/nivel_capacidade/read.php'
                    }).then(function successCallback(result)
                    {
                        nivelCapacidadeController.niveisCapacidade = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();