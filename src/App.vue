<template>
  <div id="app">
    <!--控制页面是否被缓存-->
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<style lang="scss">
#app {
  font-size: 36px;
  color: #222A2A;
}
.van-uploader__upload-icon{
  color: #999 !important;
}

</style>
