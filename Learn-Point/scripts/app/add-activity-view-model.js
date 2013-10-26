var addActivityViewModel = (function () {
    var $newStatus;
    var $newScheduleDate;
    var newPosition;
    var validator;
    var init = function () {
        validator = $('#enterStatus').kendoValidator().data("kendoValidator");
        $newStatus = $('#newStatus');
        $newScheduleDate = $("#datetimepicker").kendoDateTimePicker({
                value:new Date()
            });
        newPosition = kendo.observable({ Address: null, LatLnd: { longitude: 0, latitude: 0 } });
        console.log("Done");
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
            activity.ScheduleDate = $newScheduleDate.val();
            activity.Address = newPosition.Address.toString();
            activity.Location = newPosition.LatLnd;
            
            activities.one('sync', function () {
                app.mobileApp.navigate('#:back');
            });
            activities.sync();
        }

        /*$.oajax({
            type: "POST",
            url: "https://graph.facebook.com/me/feed",
        
            dataType: 'json',
            data: {
                message: "WOW with my Icenium mobile application I can post to my Facebook wall!",
                link: "http://icenium.com/?utm_source=facebook&utm_medium=post&utm_campaign=sampleapp",
                picture: "http://www.icenium.com/iceniumImages/features-main-images/how-it-works.png"
            },
            success: function (data) {
                outputlog("Post response (facebook):");
                outputlog(data);
            },
            error: function (e) {
                outputlog(e);
            }
        });*/
    };
    
    var setPosition = function() {
        app.mobileApp.navigate('views/setPositionView.html');
    };
    
    var addPosition = function(address, position) {
        newPosition.Address = address;
        console.log(newPosition);
        console.log(position.lat());
        console.log(position.lng());
        newPosition.LatLnd.latitude = position.lat();
        newPosition.LatLnd.longitude = position.lng();
        //newPosition.LatLnd = position.Lon;
    };
    
    return {
        init: init,
        show: show,
        me: usersModel.currentUser,
        saveActivity: saveActivity,
        addPosition: addPosition,
        setPosition: setPosition
    };
}());