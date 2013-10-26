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
        showMap();
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
    
    var showMap = function() {
        var lon;
        var lat;
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        
        function onSuccess(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            generateMap(lat, lon);
        };
        
        function onError(error) {
            lon = -87.6500523;
            lat = 43.465187;
            generateMap(lat, lon);
        };
        
        function generateMap(lat, lon) {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var position = new google.maps.LatLng(lat, lon);
            var mapOptions = {
                zoom:7,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: position
            }
            console.log(position);
            console.log(lat);
            console.log(lon);
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            directionsDisplay.setMap(map);
        }
    };
    
    return {
        init: init,
        show: show,
        me: usersModel.currentUser,
        saveActivity: saveActivity
    };
}());