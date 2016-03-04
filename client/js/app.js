angular
    .module('app', ['ui.router', 'lbServices'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('add-drink', {
                url: '/add-drink',
                templateUrl: 'views/drink-form.html',
                controller: 'AddDrinkController',
                authenticate: true
            })
            .state('all-drinks', {
                url: '/all-drinks',
                templateUrl: 'views/all-drinks.html',
                controller: 'AllDrinksController'
            })
            .state('all-products', {
                url: '/all-products',
                templateUrl: 'views/all-products.html',
                controller: 'AllProductsController'
            })
            .state('edit-drink', {
                url: '/edit-drink/:id',
                templateUrl: 'views/drink-form.html',
                controller: 'EditDrinkController',
                authenticate: true
            })
            .state('delete-drink', {
                url: '/delete-drink/:id',
                controller: 'DeleteDrinkController',
                authenticate: true
            })
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'views/forbidden.html',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthLoginController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'AuthLogoutController'
            })
            .state('my-drinks', {
                url: '/my-drinks',
                templateUrl: 'views/my-drinks.html',
                controller: 'MyDrinksController',
                authenticate: true
            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: 'views/sign-up-form.html',
                controller: 'SignUpController',
            })
            .state('sign-up-success', {
                url: '/sign-up/success',
                templateUrl: 'views/sign-up-success.html'
            });
        $urlRouterProvider.otherwise('all-drinks');
    }])
    .run(['$rootScope', '$state', 'LoopBackAuth', 'Drinker', function ($rootScope, $state, LoopBackAuth, Drinker) {

        if (LoopBackAuth !== undefined && LoopBackAuth.accessTokenId) {
            Drinker.findById({id: LoopBackAuth.currentUserId}).$promise.then(function (drinker) {

                // add listener on $rootScope changes
                $rootScope.$on('$stateChangeStart', function (event, next) {
                    // redirect to login page if not logged in
                    if (next.authenticate && !$rootScope.currentUser) {
                        event.preventDefault(); //prevent current page from loading
                        $state.go('forbidden');
                    }
                });

                $rootScope.currentUser = {
                    id: LoopBackAuth.currentUserId,
                    tokenId: LoopBackAuth.accessTokenId,
                    email: drinker.email
                };
            });
        }
    }]);
