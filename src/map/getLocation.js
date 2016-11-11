const geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 1000,
  timeout: 1000
};

export default (options) => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        resolve({ lat: crd.latitude, lng: crd.longitude });
      }, () => {
        resolve(null);
      }, options || geoOptions);
    } else {
      resolve(null);
    }
  });
};
