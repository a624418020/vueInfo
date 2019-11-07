<template>
  <div class="home">
    <pop v-if="showPop" content="对不起，仅支持复诊开方！" @low="low()"></pop>
    <div class="title">仅支持复诊开方，初诊将无法使用此功能开具处方，请确认您是否为复诊用户</div>
    <div class="bodyView">
        <img class="first" @click="first()" src="../assets/first.png"/>
      <img class="first" @click="goEntry()" src="../assets/start.png"/>
    </div>
    <div class="name" style="font-weight: bold">互联网诊疗风险告知及知情同意书</div>
    <notification ></notification>
  </div>
</template>

<script>
  import pop from '../components/popView.vue'
  import notification from '../views/Notification.vue'
export default {
  name: 'home',
  components: {
      pop,
      notification,
  },
    data() {
        return {
            showPop:false,
        }
    },
    created() {

    },
    methods: {
        goEntry(){
          // this.$router.push({name:'entry'})
            location.href='/market/entry'
        },
      //初诊弹窗
        first(){
            this.showPop=!this.showPop;
        },
        low(data){
            this.showPop=data;
        },

    }
}
</script>
<style scoped >
  .home{
    padding: 40px;
  }
  .title{
    font-size: 28px;

  }
  .bodyView{
    display: flex;
    justify-content: space-between;
    padding: 40px 0;

  }
  img{
    width: 320px;
    height: 160px;
  }
  .name{
    font-size: 42px;
    font-weight: 500;
    padding-top: 30px;
  }
  .notificationView{
    height: calc(100vh -  400px);
    overflow: scroll;
  }
</style>
