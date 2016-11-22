const staticUrl = '//s-test.lvbaoyou.com';
// 地图默认中心点
const zoom = 3;
// 默认坐标
const center = { lat: 39.915168, lng: 116.403875 };

const placeTypes = {
  place: {
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_shuzi2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      },
      label: {
        text: '1',
        color: '#eb4c5d'
      }
    }
  },
  // 目的地：TARGET("target")
  target: {
    text: '目',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_mudidisuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 酒店：HOTLE("hotel")
  hotel: {
    text: '住',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_zhusuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 吃：EAT("eat")
  eat: {
    text: '吃',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_chisuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 玩：PLAY("play")
  play: {
    text: '玩',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_wansuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 买：BUY("buy")
  buy: {
    placeText: '购',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_maisuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 景点：POINT("point")
  point: {
    text: '想',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_tuijiansuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 交通：TRAFFIC("traffic")
  traffic: {
    text: '交',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_jiaotongsuo2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  },
  // 其它：OTHER("other")
  other: {
    text: '想',
    markerStyle: {
      icon: {
        url: `${staticUrl}/static/images/btn_zhu2x.png`,
        scaledSize: {
          width: 32,
          height: 32
        }
      }
    }
  }
};

export default {
  zoom,
  center,
  placeTypes
};
