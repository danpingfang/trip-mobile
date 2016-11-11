import config from './config';
import helper from '../utils/helper';

export default {
  buildSearchPlace(place) {
    const template = `
    <div class="place-card place-card--arrow-up">
    <div class="place-content">
    <div class="place-type place-type--${place.poiType}">
    ${config.placeTypes[place.poiType].text}
    </div>
    <div class="place-info">
    <div class="place-title">{{name}}</div>
    <p class="place-location">${place.targetNameList.join(' > ')}{{address}}</p>
    </div>
    </div>
    <button type="button" class="button-place-recommend">
    <i class="icon icon-place-recommend"></i>推荐该地点</button>
    `;
    return helper.formatTemplate(template, place);
  }
};
