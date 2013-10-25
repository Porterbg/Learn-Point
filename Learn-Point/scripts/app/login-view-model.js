 var loginViewModel = (function () {
    var login = function () {
        var username = $('#loginUsername').val();
        var password = $('#loginPassword').val();

        app.el.Users.login(username, password)
        .then(function () {
            return usersModel.load();
        })
        .then(function () {
            app.mobileApp.navigate('views/activitiesView.html');
        })
        .then(null,
              function (err) {
                  app.showError(err.message);
              }
        );
    };
    var loginWithFacebook = function() {
        app.mobileApp.showLoading();
        app.facebook.getAccessToken(function(token) {
            app.el.Users.loginWithFacebook(token)
            .then(function () {
                return usersModel.load();
            })
            .then(function () {
                app.mobileApp.hideLoading();
                app.mobileApp.navigate('views/activitiesView.html');
            })
            .then(null, function (err) {
                app.mobileApp.hideLoading();
                if (err.code = 214) {
                    app.showError("The specified identity provider is not enabled in the backend portal.");
                }
                else {
                    app.showError(err.message);
                }
            });
        })
    } 
    return {
        login: login,
        loginWithFacebook: loginWithFacebook
    };
}());