(
	function()
	{
		var app = angular.module('t2gb-produto-trabalho',['ngMaterial','ngFileUpload']);
        
        app.controller('ProdutoTrabalhoController',['$http','$mdDialog','$mdToast','Upload',function($http,$mdDialog,$mdToast,Upload)
        {  
            var produtoTrabalhoController = this;
            produtoTrabalhoController.searchKeywords = "";
            produtoTrabalhoController.produtosTrabalho = [];

            produtoTrabalhoController.showToast = function(message)
            {
                $mdToast.show($mdToast.simple()
                                        .textContent(message)
                                        .hideDelay(1500)
                                        .position('top left').parent(angular.element(document.body)));
            };

            produtoTrabalhoController.showCreateForm = function()
            {
                $mdDialog.show({
                    controller: CreateController,
                    templateUrl: 'app/produto_trabalho/create-template.html',
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
                createCtrl.descricao = "";

                createCtrl.create = function(template) 
                {
                   
                    produtoTrabalhoController.create(createCtrl.nome,createCtrl.descricao,template);
                    createCtrl.cancel();
                };
                
                createCtrl.cancel = function() 
                {
                    $mdDialog.cancel();
                };
            };

            produtoTrabalhoController.create = function(nome,descricao,template)
            {
                 Upload.upload({
                                url: 'http://localhost:8888/api/produto_trabalho/create.php',
                                data: {template: template, nome : nome, descricao : descricao}
                                    }).then(function successCallback(result)
                                {
                                    produtoTrabalhoController.showToast(result.data.message)
                                    produtoTrabalhoController.read();

                                },function errorCallback(result)
                                {
                                    produtoTrabalhoController.showToast(result.data.message)
                                });  
            };

            produtoTrabalhoController.confirmDelete = function(event,id)
            {
                var confirm = $mdDialog.confirm().title('Deseja continuar?')
                                                .textContent('O produto de trabalho será excluído.')
                                                .targetEvent(event)
                                                .parent(angular.element(document.body))
                                                .cancel('Não')
                                                .ok('Sim');

                $mdDialog.show(confirm).then(function() 
                {
                    produtoTrabalhoController.delete(id);
                },
                function() 
                {
                    $mdDialog.cancel();
                });
            };

            produtoTrabalhoController.delete = function(id)
            {
                return $http({
                                method: 'POST',
                                data: { 'id' : id },
                                url: 'http://localhost:8888/api/produto_trabalho/delete.php'
                            }).then(function successCallback(result)
                            {
                                produtoTrabalhoController.showToast(result.data.message)
                                produtoTrabalhoController.read();

                            },function errorCallback(result)
                            {
                                produtoTrabalhoController.showToast(result.data.message)
                            });;
            };


            produtoTrabalhoController.search = function(keywords)
            {
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/produto_trabalho/search.php?s=' + keywords 
                    }).then(function successCallback(result)
                    {
                        produtoTrabalhoController.produtosTrabalho = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };


            produtoTrabalhoController.read = function()
            {
                
                $http({
                        method: 'GET',
                        url: 'http://localhost:8888/api/produto_trabalho/read.php'
                    }).then(function successCallback(result)
                    {
                        produtoTrabalhoController.produtosTrabalho = result.data.records;
                    }, function errorCallback(result)
                    {
                        console.log(result);
                    });
            };

        }]);
    
        
	}
)();