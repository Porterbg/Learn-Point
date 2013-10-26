var activityViewModel = (function () {
    var activity;
    function generateMap() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var lat = activity.Location.latitude || 40;
        var lon = activity.Location.longitude || -80;
        var position = new google.maps.LatLng(lat, lon);
        var mapOptions = {
            zoom:10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: position
        };
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var marker = new google.maps.Marker({    
            position: position,
            map: map    
        });
        directionsDisplay.setMap(map);
    };
    
    var show = function (e) {
        activity = activitiesModel.activities.getByUid(e.view.params.uid);
        kendo.bind(e.view.element, activity, kendo.mobile.ui);
        generateMap();
    };
    
    var joinActivity = function() {
        console.log("Here");
    };
    
    return {
        show: show,
        join: joinActivity
    };
}());