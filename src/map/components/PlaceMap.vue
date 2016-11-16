<template>
  <div id="map" class="place-map"></div>
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
          content: PlaceCardTemplate.render(place)
        });
        this.infobox.open(this.map, marker);
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
      createMarker(position, markerOptions) {
        return new google.maps.Marker(assign({}, markerOptions, {
          map: this.map,
          position
        }));
      },
      getPixel(marker) {
        const scale = Math.pow(2, this.map.getZoom());
        const nw = new google.maps.LatLng(
          this.map.getBounds().getNorthEast().lat(),
          this.map.getBounds().getSouthWest().lng()
        );
        const worldCoordinateNW = this.map.getProjection().fromLatLngToPoint(nw);
        const worldCoordinate = this.map.getProjection().fromLatLngToPoint(
          marker.getPosition());
        const pixelOffset = new google.maps.Point(
          Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
          Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
        );
        console.log(pixelOffset);
      }
    }
  };
</script>
