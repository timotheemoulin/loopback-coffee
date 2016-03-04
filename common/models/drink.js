module.exports = function (Drink) {

    Drink.on('dataSourceAttached', function (obj) {
        var find = Drink.find;
        Drink.find = function (filter, cb) {

            filter = {
                include: {
                    relation: 'product'
                }
            };

            return find.apply(this, arguments);
        };
    });

    Drink.beforeRemote('create', function (context, user, next) {
        var req = context.req;
        req.body.date = Date.now();
        req.body.drinkerId = req.accessToken.userId;

        req.body.quantity = req.body.quantity || 1;

        next();
    });
};