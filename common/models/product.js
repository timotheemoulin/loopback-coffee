module.exports = function (Product) {

    Product.validatesPresenceOf('name', 'category');
    Product.validatesLengthOf('name', {min: 5, message: 'Name is too short'});
    Product.validatesUniquenessOf('email', {message: 'email is not unique'});
    //
    Product.on('dataSourceAttached', function (obj) {
        var find = Product.find;
        Product.find = function (filter, cb) {

            filter = {
                include: {
                    relation: 'category',
                    scope: {
                        fields: ['name']
                    }
                }
            };

            return find.apply(this, arguments);
        };
    });

    Product.afterRemote('create', function (context, user, next) {
        var req = context.req;
        if (req.body.accessToken) {
            req.body.publisherId = req.body.accessToken.userId;
        }
        next();
    });
};
