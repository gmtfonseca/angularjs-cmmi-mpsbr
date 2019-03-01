(
	function()
	{
		var app = angular.module('t2gb-modelo',['ngMaterial','ui.tree','t2gb-area-processo','t2gb-meta-generica']);
        
        app.controller('ModeloController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var modeloController = this;
            modeloController.searchKeywords = "";
            modeloController.modelos = [];

            modeloController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            modeloController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/modelo/create-template.html',
                    clickOutsideToClose: true,
                    controllerAs: 'createCtrl',
                    hasBackdrop: true,
                    parent: angular.element(document.body)
                });
            };
            
            modeloController.showViewForm = function(event,id)
            {
                $mdDialog.show({
                    controller: ViewController,
                    templateUrl: 'app/modelo/view-template.html',
                    clickOutsideToClose: true,
                    controllerAs: 'viewCtrl',
                    hasBackdrop: true,
                    targetEvent: event,
                    parent: angular.element(document.body),
                    locals:{id : id}
                });
            };
            
            function ViewController(id)
            {
                viewCtrl = this;
                viewCtrl.id = id;
                viewCtrl.nodes = {}
                
                modeloController.readOne(id).then(function successCallback(result)
                {
                    viewCtrl.sigla = result.data.sigla;
                    viewCtrl.nome = result.data.nome;
                    viewCtrl.descricao = result.data.descricao;

                },function errorCallback(result)
                {
                    modeloController.showToast(result.data.message);
                    updateCtrl.cancel()
                });
                    
                    
                viewCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
                
            };
            
            function CreateController() 
            {
                var createCtrl = this;
                createCtrl.sigla = "";
                createCtrl.nome = "";
                createCtrl.descricao = "";

                createCtrl.create = function() 
                {
                    modeloController.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            modeloController.create = function(sigla,nome,descricao)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao
                        },
                        url: 'http://localhost:8888/api/modelo/create.php'
                    }).then(function successCallback(result)
                    {
                        modeloController.showToast(result.data.message)
                        modeloController.read();

                    },function errorCallback(result)
                    {
                        modeloController.showToast(result.data.message)
                    });
            };

            modeloController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('O modelo será excluído.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    modeloController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            modeloController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/modelo/delete.php'
                            }).then(function successCallback(result)
                            {
                                modeloController.showToast(result.data.message)
                                modeloController.read();

                            },function errorCallback(result)
                            {
                                modeloController.showToast(result.data.message)
                            });;
            };

            modeloController.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/modelo/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            modeloController.update = function(id,sigla,nome,descricao)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao
                        },
                        url: 'http://localhost:8888/api/modelo/update.php'
                }).then(function successCallback(result)
                {
                    modeloController.showToast(result.data.message)
                    modeloController.read();

                },function errorCallback(result)
                {
                    modeloController.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                modeloController.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;

                },function errorCallback(result)
                {
                    modeloController.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    modeloController.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            modeloController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/modelo/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        modeloController.modelos = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            modeloController.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/modelo/read_one.php?id=' + id
                            });
            };

            modeloController.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/modelo/read.php'
                    }).then(function successCallback(result)
                    {
                        modeloController.modelos = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };
            
            modeloController.buildTree = function(id)
            {
                
            }

        }]);
    
        
	}
)();