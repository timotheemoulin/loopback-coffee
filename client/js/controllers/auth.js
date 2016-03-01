angular
    .module('app')

    // login
    .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
        function ($scope, AuthService, $state) {
            $scope.user = {
                email: 'timothee.moulin@virtua.ch',
                password: 'Welcome123'
            };

            $scope.login = function () {
                AuthService.login($scope.user.email, $scope.user.password)
                    .then(function () {
                        $state.go('add-drink');
                    });
            };
        }]
    )

    // logout
    .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
        function ($scope, AuthService, $state) {
            AuthService.logout()
                .then(function () {
                    $state.go('all-drinks');
                });
        }]
    )

    // signup
    .controller('SignUpController', ['$scope', 'AuthService', '$state',
        function ($scope, AuthService, $state) {
            $scope.user = {
                email: 'timothee.moulin@virtua.ch',
                password: 'Welcome123'
            };

            $scope.register = function () {
                AuthService.register($scope.user.email, $scope.user.password)
                    .then(function () {
                        $state.transitionTo('sign-up-success');
                    });
            };
        }]
    );
