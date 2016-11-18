import config from '../config';

export default {
  render(type, place) {
    switch (type) {
      case 'search':
        return `<div class="place-card place-card--arrow-up">
          <div class="place-card-content">
          <div class="place-type place-type--${place.poiType}">
          ${config.placeTypes[place.poiType].text}
      </div>
        <div class="place-info">
          <div class="place-title">${place.name}</div>
        <p class="place-location">
        ${place.targetNameList.join(' > ')}
        ${place.address ? place.address : ''}</p>
        </div>
        </div>
        <button id="place-${place.poiId}" class="button-place-recommend"
          type="button">
          <i class="icon icon-place-recommend"></i>
          <span>${place.isRecommend ? '已推荐' : '推荐该地点'}</span>
        </button>
        </div>`;
      case 'line':
        return `<div class="place-card place-card--arrow-up">
          <div class="place-card-content">
          <div class="place-type place-type--${place.poiType}">
          ${config.placeTypes[place.poiType].text}
      </div>
        <div class="place-info">
          <div class="place-title">${place.poiName}</div>
        <p class="place-location">
        ${place.targetNameList.join(' > ')}${place.poiAddress}</p>
        </div>
        </div>
        </div>`;
      default:
        return '';
    }
  }
};
