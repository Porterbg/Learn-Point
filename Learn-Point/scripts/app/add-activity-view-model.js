var addActivityViewModel = (function () {
    var $newStatus;
    var validator;
    var init = function () {
        validator = $('#enterStatus').kendoValidator().data("kendoValidator");
        $newStatus = $('#newStatus');
    };
    var show = function () {
        $newStatus.val('');
        validator.hideMessages();
    };
    var saveActivity = function () {
        if (validator.validate()) {
            var activities = activitiesModel.activities;
            var activity = activities.add();
            activity.Text = $newStatus.val();
            activity.UserId = usersModel.currentUser.get('data').Id;
            activities.one('sync', function () {
                app.mobileApp.navigate('#:back');
            });
            activities.sync();
        }
    };
    return {
        init: init,
        show: show,
        me: usersModel.currentUser,
        saveActivity: saveActivity
    };
}());