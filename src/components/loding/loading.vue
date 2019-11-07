<template>
            <div class="page" @click.stop="" v-show="show">
                <div class="loadingView">
                    <van-loading size="24px" vertical>加载中...</van-loading>
                </div>
            </div>
</template>

<script>
    export default {
        name: "loading",
        props: {
            show: Boolean,
        },

        created() {
            setTimeout(()=>{
                this.props=false
            },5000)
        },
    }
</script>

<style scoped>
    .page{
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        z-index: 999;
    }
    .loadingView{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30vw;
        height: 30vw;
        background: rgba(0,0,0,0.7);
        border-radius: 6px;
    }
    /*.van-loading__text{*/
        /*color: #555555;*/
    /*}*/

</style>
