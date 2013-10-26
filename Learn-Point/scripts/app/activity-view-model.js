var activityViewModel = (function () {
    function generateMap(location) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var position = new google.maps.LatLng(location.latitude, location.longitude);
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
    
    return {
        show: function (e) {
            var activity = activitiesModel.activities.getByUid(e.view.params.uid);
            kendo.bind(e.view.element, activity, kendo.mobile.ui);
            generateMap(activity.Location);
        }
        
    };
}());