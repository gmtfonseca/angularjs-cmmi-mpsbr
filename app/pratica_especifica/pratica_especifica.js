(
	function()
	{
		var app = angular.module('t2gb-pratica-especifica',['ngMaterial','t2gb-modelo']);
        
        app.controller('PraticaEspecificaController',['$http','$mdDialog','$mdToast',function($http,$mdDialog,$mdToast)
        {  
            var praticaEspecificaCtrl = this;
            praticaEspecificaCtrl.searchKeywords = "";
            praticaEspecificaCtrl.praticasEspecificas = [];

            praticaEspecificaCtrl.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            praticaEspecificaCtrl.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/pratica_especifica/create-template.html',
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
                createCtrl.metaEspecifica = "";

                createCtrl.create = function() 
                {
                    praticaEspecificaCtrl.create(createCtrl.sigla,createCtrl.nome,createCtrl.descricao,createCtrl.metaEspecifica);
                    createCtrl.cancel();
                };

                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            praticaEspecificaCtrl.create = function(sigla,nome,descricao,metaEspecifica)
            {
                $http({
                        method: 'POST',
                        data: 
                        {
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'metaEspecifica' : metaEspecifica
                        },
                        url: 'http://localhost:8888/api/pratica_especifica/create.php'
                    }).then(function successCallback(result)
                    {
                        praticaEspecificaCtrl.showToast(result.data.message)
                        praticaEspecificaCtrl.read();

                    },function errorCallback(result)
                    {
                        praticaEspecificaCtrl.showToast(result.data.message)
                    });
            };

            praticaEspecificaCtrl.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('A prática específica será excluída.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    praticaEspecificaCtrl.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            praticaEspecificaCtrl.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/pratica_especifica/delete.php'
                            }).then(function successCallback(result)
                            {
                                praticaEspecificaCtrl.showToast(result.data.message)
                                praticaEspecificaCtrl.read();

                            },function errorCallback(result)
                            {
                                praticaEspecificaCtrl.showToast(result.data.message)
                            });;
            };

            praticaEspecificaCtrl.showUpdateForm = function(event,id)
            {    
                $mdDialog.show({
                                controller: UpdateController,
                                templateUrl: 'app/pratica_especifica/update-template.html',
                                parent: angular.element(document.body),
                                targetEvent: event,
                                controllerAs: 'updateCtrl',
                                hasBackdrop: true,
                                locals:{id : id}
                            });
            };


            praticaEspecificaCtrl.update = function(id,sigla,nome,descricao,metaEspecifica)
            {
                $http({
                        method: 'POST',
                        data: {
                            'id' : id,
                            'sigla' : sigla,
                            'nome' : nome,
                            'descricao' : descricao,
                            'metaEspecifica' : metaEspecifica
                        },
                        url: 'http://localhost:8888/api/pratica_especifica/update.php'
                }).then(function successCallback(result)
                {
                    praticaEspecificaCtrl.showToast(result.data.message)
                    praticaEspecificaCtrl.read();

                },function errorCallback(result)
                {
                    praticaEspecificaCtrl.showToast(result.data.message)
                });
            };

            function UpdateController(id) 
            {

                var updateCtrl = this;

                praticaEspecificaCtrl.readOne(id).then(function successCallback(result)
                {
                    updateCtrl.id = result.data.id;
                    updateCtrl.sigla = result.data.sigla;
                    updateCtrl.nome = result.data.nome;
                    updateCtrl.descricao = result.data.descricao;
                    updateCtrl.metaEspecifica = result.data.metaEspecifica;
                    console.log(result.data.metaEspecifica);

                },function errorCallback(result)
                {
                    praticaEspecificaCtrl.showToast(result.data.message);
                    updateCtrl.cancel()
                });

                updateCtrl.update = function() 
                {
                    praticaEspecificaCtrl.update(updateCtrl.id,updateCtrl.sigla,updateCtrl.nome,updateCtrl.descricao,updateCtrl.metaEspecifica);
                    updateCtrl.cancel();
                };

                updateCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            praticaEspecificaCtrl.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/pratica_especifica/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        praticaEspecificaCtrl.praticasEspecificas = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

            praticaEspecificaCtrl.readOne = function(id)
            {
                return $http({
                                method: 'GET',
                                url: 'http://localhost:8888/api/pratica_especifica/read_one.php?id=' + id
                            });
            };

            praticaEspecificaCtrl.read = function()
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/pratica_especifica/read.php'
                    }).then(function successCallback(result)
                    {
                        praticaEspecificaCtrl.praticasEspecificas = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();