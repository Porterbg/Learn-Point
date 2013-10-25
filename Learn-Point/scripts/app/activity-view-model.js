var activityViewModel = (function () {
    return {
        show: function (e) {
            var activity = activitiesModel.activities.getByUid(e.view.params.uid);
            kendo.bind(e.view.element, activity, kendo.mobile.ui);
        }
    };
}());