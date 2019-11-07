<template>
    <div class="popView">
        <div class="view">
            <img src="../assets/popViewTitle.png"/>
            <div class="content">{{content}}</div>
            <div class="low" @click="low">我知道了</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popView",
        props: {
            content: String,
        },
        data() {
            return {}
        },
        created() {

        },
        methods: {
            low(){

                this.$emit('low', false)
            }
        }
    }

</script>

<style scoped>
    .popView{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
    }
    .view{
        width: 540px;
        background: white;
        border-radius: 10px;
    }
    .view img{
        width: 100%;
        height: 124px;
    }
    .content{
        min-height: 210px;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .low{
        border-top: 1px rgba(238,238,238,1) solid;
        line-height: 100px;
        font-size: 36px;
        color:#517BD7 ;
        text-align: center;
    }

</style>
