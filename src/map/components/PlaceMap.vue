<template>
  <div id="map" class="map"></div>
</template>

<script>
  import assign from 'lodash.assign';
  import $ from 'jquery';
  import config from '../config';
  import getLocation from '../utils/getLocation';
  import PlaceCardTemplate from '../templates/PlaceCardTemplate';
  export default {
    props: ['show'],
    watch: {
      show(isShow) {
        if (isShow) {
          this.init();
        }
      }
    },
    methods: {
      init() {
        const mapContainer = document.getElementById('map');
        this.map = new google.maps.Map(mapContainer, {
          zoom: config.zoom,
          center: config.center,
          clickableIcons: false,
          disableDefaultUI: true
        });
        getLocation().then((center) => {
          if (center) {
            this.map.setCenter(center);
          }
        });
      },
      addSearchPlace(place) {
        this.removeSearchPlace();
        const placeZoom = 15;
        const markerStyle = config.placeTypes.place.markerStyle;
        this.placeSearchMarker = this.createMarker(
          place.geoCoordinate, markerStyle);
        this.map.setZoom(placeZoom);
        this.map.setCenter(this.placeSearchMarker.getPosition());
        this.addSearchInfoBox(this.placeSearchMarker, place);
        $(document).on('touchend', (e) => {
          const target = $(e.target).closest(`#place-${place.poiId}`);
          if (target.length && !place.isRecommend) {
            this.$dispatch('onRecommendPlace', place);
            this.setRecommendButtonText(place);
          }
        });
      },
      addLinePlace(places) {
        if (this.linePlaceMarkers) {
          this.clearLinePlace();
        }
        this.linePlaceMarkers = [];
        this.linePlaceInfoBox = new InfoBubble({
          distanceY: 98,
          shadowStyle: 0,
          closeSrc: 0,
          arrowSize: 0,
          minWidth: 300,
          minHeight: 55,
          borderWidth: 0,
          padding: 0,
          borderColor: 'transparent'
        });
        this.linePlacebounds = new google.maps.LatLngBounds();
        const flightPlanCoordinates = [];
        places.map((place, index) => {
          const geo = place.poiGeo;
          const marker = this.createMarker(geo, assign({},
            config.placeTypes.place.markerStyle, {
              label: {
                text: `${index + 1}`,
                color: '#eb4c5d'
              }
            }));
          google.maps.event.addListener(marker, 'click', () => {
            this.linePlaceInfoBox.setContent(
              PlaceCardTemplate.render('line', place));
            this.linePlaceInfoBox.open(this.map, marker);
          });
          this.linePlacebounds.extend(marker.position);
          flightPlanCoordinates.push(marker.position);
          this.linePlaceMarkers.push(marker);
          return place;
        });
        this.linePlaceFlightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          offset: '50%',
          geodesic: true,
          strokeColor: '#b7c0c8',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        this.map.fitBounds(this.linePlacebounds);
        this.linePlaceFlightPath.setMap(this.map);
      },
      setRecommendButtonText(place) {
        const content = place.isRecommend ? '已推荐' : '推荐该地点';
        $(`#place-${place.poiId}`)
          .find('span').text(content);
      },
      addSearchInfoBox(marker, place) {
        this.infobox = new InfoBox({
          closeBoxURL: '',
          pixelOffset: new google.maps.Size(-150, 10),
          enableEventPropagation: true,
          pane: 'floatPane',
          content: PlaceCardTemplate.render('search', place)
        });
        this.infobox.open(this.map, marker);
        this.map.panBy(0, 180);
      },
      removeSearchPlace() {
        if (this.placeSearchMarker) {
          this.placeSearchMarker.setMap(null);
          this.clearInfoBox();
        }
      },
      clearInfoBox() {
        if (this.infobox) {
          this.infobox.close();
        }
      },
      clearLinePlace() {
        this.linePlaceMarkers.map((marker) => {
          marker.setMap(null);
          return null;
        });
        this.linePlaceInfoBox.setMap(null);
        this.linePlaceFlightPath.setMap(null);
      },
      createMarker(position, markerOptions) {
        console.log(JSON.stringify(markerOptions));
        return new google.maps.Marker(assign({}, markerOptions, {
          map: this.map,
          position
        }));
      }
    }
  };
</script>
