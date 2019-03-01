(
	function()
	{
		var app = angular.module('t2gb-nivel-maturidade',['ngMaterial','t2gb-modelo']);
        
        app.controller('NivelMaturidadeController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var nivelMaturidade = this;
            nivelMaturidade.searchKeywords = "";
            nivelMaturidade.niveisMaturidade = [];

            nivelMaturidade.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            nivelMaturidade.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/nivel_maturidade/create-template.html',
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
                    nivelMaturidade.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao,createCtrl.modelo);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            nivelMaturidade.create = function(sigla,nome,descricao,modelo)
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
                        url: 'http://localhost:8888/api/nivel_maturidade/create.php'
                    }).then(function successCallback(result)
                    {
                        nivelMaturidade.showToast(result.data.message)
                        nivelMaturidade.read();

                    },function errorCallback(result)
                    {
                        nivelMaturidade.showToast(result.data.message)
                    });
            };

            nivelMaturidade.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('O nível de maturidade será excluído.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    nivelMaturidade.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            nivelMaturidade.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/nivel_maturidade/delete.php'
                            }).then(function successCallback(result)
                            {
                                nivelMaturidade.showToast(result.data.message)
                                nivelMaturidade.read();

                            },function errorCallback(result)
                            {
                                nivelMaturidade.showToast(result.data.message)
                            });;
            };

            nivelMaturidade.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/nivel_maturidade/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            nivelMaturidade.update = function(id,sigla,nome,descricao,modelo)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'modelo' : modelo
                        },
                        url: 'http://localhost:8888/api/nivel_maturidade/update.php'
                }).then(function successCallback(result)
                {
                    nivelMaturidade.showToast(result.data.message)
                    nivelMaturidade.read();

                },function errorCallback(result)
                {
                    nivelMaturidade.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                nivelMaturidade.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;
                    updateCtrl.modelo = result.data.modelo;

                },function errorCallback(result)
                {
                    nivelMaturidade.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    nivelMaturidade.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao,updateCtrl.modelo);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            nivelMaturidade.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/nivel_maturidade/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        nivelMaturidade.niveisMaturidade = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            nivelMaturidade.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/nivel_maturidade/read_one.php?id=' + id
                            });
            };

            nivelMaturidade.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/nivel_maturidade/read.php'
                    }).then(function successCallback(result)
                    {
                        nivelMaturidade.niveisMaturidade = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();