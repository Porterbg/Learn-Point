// activities view model
var activitiesViewModel = (function () {
    var activitySelected = function (e) {
        app.mobileApp.navigate('views/activityView.html?uid=' + e.data.uid);
    };
    var navigateHome = function () {
        app.mobileApp.navigate('#welcome');
    };
    var logout = function () {
        app.AppHelper.logout()
        .then(navigateHome, function (err) {
            app.showError(err.message);
            navigateHome();
        });
    };
    var joinActivity = function() {
        console.log("Here");
    };
    return {
        activities: activitiesModel.activities,
        activitySelected: activitySelected,
        logout: logout,
        join: joinActivity
    };
}());