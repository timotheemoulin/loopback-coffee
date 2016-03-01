module.exports = function (app) {
    var path = require('path');
    var models = require(path.resolve(__dirname, '../model-config.json'));
    var datasources = require(path.resolve(__dirname, '../datasources.json'));

    function autoUpdateAll() {
        Object.keys(models).forEach(function (modelName) {
            if (typeof models[modelName].dataSource != 'undefined') {
                if (typeof datasources[models[modelName].dataSource] != 'undefined') {
                    app.dataSources[models[modelName].dataSource].autoupdate(modelName, function (err) {
                        if (err) throw err;
                        console.log('Model ' + modelName + ' updated');
                    });
                }
            }
        });
    }

    //autoUpdateAll();
};