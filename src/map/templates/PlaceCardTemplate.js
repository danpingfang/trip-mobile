import config from '../config';

export default {
  render(place) {
    return `<div class="place-card place-card--arrow-up">
      <div class="place-card-content">
      <div class="place-type place-type--${place.poiType}">
      ${config.placeTypes[place.poiType].text}
  </div>
    <div class="place-info">
      <div class="place-title">${place.name}</div>
    <p class="place-location">
    ${place.targetNameList.join(' > ')}${place.address}</p>
    </div>
    </div>
    <button id="place-${place.poiId}" class="button-place-recommend"
      type="button">
      <i class="icon icon-place-recommend"></i><span>推荐该地点</span>
    </button>
    </div>`;
  }
};
