module.exports = function(Category) {

    Category.on('dataSourceAttached', function (obj) {
        var find = Category.find;
        Category.find = function (filter, cb) {

            console.log('category ------------------');
            filter = {
                //include: {
                //    relation: 'products',
                //    scope: {
                //        fields: ['name']
                //    }
            };

            return find.apply(this, arguments);
        };
    });

};
