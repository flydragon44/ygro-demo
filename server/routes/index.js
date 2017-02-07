module.exports = function (app) {
    app.use('/', require('./signIn'));
    app.use('/dashboards', require('./dashboards'));
};
