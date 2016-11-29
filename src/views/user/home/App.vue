<template>
  <div class="cover-container">
    <div class="cover-content">
      <user-info :user="user"></user-info>
    </div>
    <div class="cover-overlay"></div>
  </div>
  <div class="ui-space ui-space--gray"></div>
  <menu-list :list="menuList">
    <span slot="extra"
          class="extra">{{eventsInfo.countryCount}}个国家 {{eventsInfo.targetCount}}个目的地</span>
  </menu-list>
  <div class="ui-space ui-space--gray"></div>
  <tab-nav :list="tabNavList" :current-index.sync="currentTabNavIndex"
           :styles="tabNavStyles"></tab-nav>
  <div class="tab-container">
    <div class="tab-content" v-show="currentTabNavIndex === 0">
      <line-list :api-url="apiUrl"></line-list>
    </div>
    <div class="tab-content" v-show="currentTabNavIndex === 1">
      <list :list="list"></list>
    </div>
  </div>
</template>

<style lang="scss">
  @import "./style.scss";
</style>

<script>
  import config from '../../../config';
  import MenuList from '../../../components/MenuList';
  import List from '../../../components/List';
  import LineList from '../../../components/LineList';
  import TabNav from '../../../components/TabNav';
  import UserInfo from '../components/UserInfo';

  const jsConfig = window.jsConfig;
  const user = jsConfig.user;

  export default {
    data() {
      return {
        user,
        list: [
          {
            title: '出生年',
            content: user.birthday
          },
          {
            title: '所在城市',
            content: user.place
          },
          {
            title: '个人介绍',
            content: user.summary
          }
        ],
        menuList: [
          {
            name: '我的足迹',
            styles: {
              iconName: 'icon-user-map'
            }
          }
        ],
        eventsInfo: jsConfig.eventsInfo,
        currentTabNavIndex: 0,
        tabNavStyles: {
          classNames: 'user-nav'
        },
        tabNavList: [
          {
            name: 'TA的线路'
          },
          {
            name: 'TA的信息'
          }
        ],
        apiUrl: `${config.authApiUrl}/line/my_line_list`
      };
    },
    components: {
      UserInfo,
      MenuList,
      List,
      TabNav,
      LineList
    },
    events: {
      onItemClick(item) {
        location.href = item.url;
      }
    }
  };
</script>
