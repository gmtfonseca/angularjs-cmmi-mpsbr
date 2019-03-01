(
	function()
	{
		var app = angular.module('t2gb-categoria',['ngMaterial','t2gb-modelo']);
        
        app.controller('CategoriaController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var categoriaController = this;
            categoriaController.searchKeywords = "";
            categoriaController.categoris = [];

            categoriaController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            categoriaController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/categoria/create-template.html',
                    clickOutsideToClose: true,
                    controllerAs: 'createCtrl',
                    hasBackdrop: true,
                    parent: angular.element(document.body)
                });
            };

            function CreateController() 
            {
                var createCtrl = this;
                createCtrl.nome = "";
                createCtrl.modelo = "";

                createCtrl.create = function() 
                {
                    categoriaController.create(createCtrl.nome,createCtrl.modelo);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            categoriaController.create = function(nome,modelo)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'nome' : nome,
                            'modelo': modelo
                        },
                        url: 'http://localhost:8888/api/categoria/create.php'
                    }).then(function successCallback(result)
                    {
                        categoriaController.showToast(result.data.message)
                        categoriaController.read();

                    },function errorCallback(result)
                    {
                        categoriaController.showToast(result.data.message)
                    });
            };

            categoriaController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('A categoria será excluída.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    categoriaController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            categoriaController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/categoria/delete.php'
                            }).then(function successCallback(result)
                            {
                                categoriaController.showToast(result.data.message)
                                categoriaController.read();

                            },function errorCallback(result)
                            {
                                categoriaController.showToast(result.data.message)
                            });;
            };

            categoriaController.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/categoria/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            categoriaController.update = function(id,nome,modelo)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'nome' : nome,
                            'modelo': modelo
                        },
                        url: 'http://localhost:8888/api/categoria/update.php'
                }).then(function successCallback(result)
                {
                    categoriaController.showToast(result.data.message)
                    categoriaController.read();

                },function errorCallback(result)
                {
                    categoriaController.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                categoriaController.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.modelo = result.data.modelo;

                },function errorCallback(result)
                {
                    categoriaController.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    categoriaController.update(updateCtrl.id,updateCtrl.nome,updateCtrl.modelo);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            categoriaController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/categoria/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        categoriaController.categorias = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            categoriaController.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/categoria/read_one.php?id=' + id
                            });
            };

            categoriaController.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/categoria/read.php'
                    }).then(function successCallback(result)
                    {
                        categoriaController.categorias = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };
            

        }]);
    
        
	}
)();