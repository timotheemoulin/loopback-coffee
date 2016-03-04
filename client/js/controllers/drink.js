angular
    .module('app')

    // all products
    .controller('AllProductsController', ['$scope', 'Product', function ($scope, Product) {
        $scope.products = Product.find();
    }])

    // all drinks
    .controller('AllDrinksController', ['$scope', 'Drink', function ($scope, Drink) {
        $scope.drinks = Drink.find();

    }])

    // all products
    .controller('AllProductsController', ['$scope', 'Product', function ($scope, Product) {
        $scope.products = Product.find();

    }])

    // add drink
    .controller('AddDrinkController', ['$scope', 'Category', 'Product', 'Drink',
        '$state', function ($scope, Category, Product, Drink, $state) {
            $scope.action = 'Add';
            $scope.products = Product.find();
            $scope.categories = Category.find();
            $scope.selectedProduct = {};
            $scope.selectedCategory = {};
            $scope.drink = {};
            $scope.isDisabled = false;

            Product.find().$promise.then(function (products) {
                    $scope.products = products;
                    $scope.selectedProduct = $scope.selectedProduct || products[0];
                });

            $scope.submitForm = function () {
                Drink
                    .create({
                        rating: $scope.drink.rating,
                        comments: $scope.drink.comments,
                        coffeeShopId: $scope.selectedProduct.id
                    })
                    .$promise
                    .then(function (data) {
                        $state.go('all-drinks');
                    });
            };
        }
    ])

    // delete drink
    .controller('DeleteDrinkController', ['$scope', 'Drink', '$state',
        '$stateParams', function ($scope, Drink, $state, $stateParams) {
            Drink
                .deleteById({id: $stateParams.id})
                .$promise
                .then(function () {
                    $state.go('my-drinks');
                });
        }
    ])

    // my drinks
    .controller('MyDrinksController', ['$scope', 'Drink', '$rootScope',
        function ($scope, Drink, $rootScope) {
            $scope.drinks = Drink.find({
                filter: {
                    where: {
                        publisherId: $rootScope.currentUser.id
                    },
                    include: [
                        'coffeeShop',
                        'drinker'
                    ]
                }
            });
        }
    ]);
