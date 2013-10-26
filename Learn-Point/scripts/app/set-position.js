var setPositionViewModel = (function () {
    var lon;
    var lat;
    
    var init = function () {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    
    function onSuccess(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        generateMap();
    };
    
    function onError(error) {
        lon = -87.6500523;
        lat = 43.465187;
        generateMap();
    };
    
    var setPosition = function () {
        var pos = new google.maps.LatLng(lat, lon); 
        addActivityViewModel.addPosition(pos);
        app.mobileApp.navigate('#:back');
    };
    
    function generateMap() {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var position = new google.maps.LatLng(lat, lon);
        var mapOptions = {
            zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: position
        }
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);
        var marker = new google.maps.Marker({    
            position: position, 
            draggable: true,
            map: map    
        });
        google.maps.event.addListener(marker,'dragend',function(overlay,point){
            lat = marker.position.lat();
            lon = marker.position.lng();
        });
    };
    return {
        lat: lat,
        lon: lon,
        setPosition: setPosition,
        init: init
    };
}());