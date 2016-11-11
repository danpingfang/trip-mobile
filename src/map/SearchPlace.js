import assign from 'lodash.assign';
import config from './config';
import placeTemplate from './placeTemplate';

export default class SearchPlace {
  constructor(map) {
    this.map = map;
    this.markers = [];
    this.infobox = null;
  }

  add(place) {
    const markerStyle = config.placeTypges.place.markerStyle;
    const marker = new google.maps.Marker(assign({}, markerStyle, {
      map: this.map,
      position: place.geoCoordinate
    }));
    this.markers.push(marker);
    this.setPosition(marker);
    this.setInfoWindow(marker, place);
  }

  setInfoWindow(marker, place) {
    this.infobox = new InfoBox({
      closeBoxURL: '',
      pixelOffset: new google.maps.Size(-150, 10),
      boxClass: 'infobox-place-card',
      content: placeTemplate.buildSearchPlace(place)
    });
    marker.addListener('click', () => {
      this.infobox.open(this.map, marker);
      this.map.panTo(this.infobox.getPosition());
    }, false);
  }

  setPosition(marker) {
    this.map.setZoom(this.markers.length === 0 ? config.zoom : 15);
    this.map.setCenter(marker.getPosition());
  }

  clear(place) {
    const latlng = new google.maps.LatLng(place.geoCoordinate);
    this.markers.map((marker, index) => {
      const markerPosition = marker.getPosition();
      if (latlng.equals(markerPosition)) {
        marker.setMap(null);
        this.markers.splice(index, 1);
        this.setPosition(marker);
      }
      return marker;
    });
    this.infobox.close();
  }
}
