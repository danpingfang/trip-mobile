<template>
  <search-bar></search-bar>
  <div id="map"></div>
  <search-list :list="placeList"></search-list>
</template>

<script>
  import $ from 'jquery';
  import config from '../../config';
  import mapConfig from '../../map/config';
  import getLocation from '../../map/getLocation';
  import SearchPlace from '../../map/SearchPlace';
  import SearchBar from './components/SearchBar';
  import SearchList from './components/SearchList';

  export default {
    data() {
      return {
        placeList: null
      };
    },
    components: {
      SearchBar,
      SearchList
    },
    events: {
      onSubmit(keyword) {
        this.onSearch(keyword);
      },
      onSelect(place) {
        this.addPlace(place);
      }
    },
    ready() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: mapConfig.zoom,
          center: mapConfig.center,
          clickableIcons: false,
          disableDefaultUI: true
        });
        this.place = new SearchPlace(this.map);
        getLocation().then((center) => {
          if (center) {
            this.map.setCenter(center);
          }
        });
      },
      addPlace(place) {
        if (place.isSelected) {
          this.place.add(place);
        } else {
          this.place.clear(place);
        }
      },
      onSearch(keyword) {
        $.ajax({
          url: `${config.apiUrl}/poi/keyword_search`,
          type: 'get',
          data: {
            keyword
          },
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          }
        }).done((response) => {
          this.renderSearchList(response.data.list);
        });
      },
      renderSearchList(list) {
        const selectedIndex = 0;
        this.placeList = list.map((item, index) => {
          item.isSelected = index === selectedIndex;
          return item;
        });
        this.addPlace(list[selectedIndex]);
      }
    }
  };
</script>
