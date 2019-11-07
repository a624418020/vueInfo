<template>
    <div>
        <div v-show="showPage"  class="page">
            <img class="paySuccessImg" src="../assets/paySuccess.png"/>
            <div class="prompt">恭喜您，已成功开具处方</div>
            <div class="amount">处方价格：¥2.00</div>
            <div class="content">您有一张抵扣券可使用<span style="color:#F39900 ">(处方抵扣券-¥2.00)</span></div>
            <div class="payAmount">本次开方您还需支付<span>¥0.00</span></div>
            <div class="payBt" @click="pay()">立即支付</div>
        </div>

    </div>

</template>

<script>
    import api from '../libs/apiServe'

    export default {
        name: "Pay",
        data() {
            return {
                params: {
                    waterNo: '',
                    rxIds: []
                },
                showPage:true,

            }
        },
        created() {
            if(this.$route.query.waterNo&&this.$route.query.rxId){
                this.params.waterNo=this.$route.query.waterNo;
                this.params.rxIds.push(this.$route.query.rxId);
            }else {
                this.showPage=false;
                this.$toast('订单ID不可为空')
            }

        },
        methods: {
            pay() {
                this.setData()
            },
            //提交数据
            setData() {
                api.postElecrxBuy(this.params).then((res) => {
                    this.$router.replace({path:'bill',query:{waterNo:this.$route.query.waterNo,rxId:this.$route.query.rxId}});
                    console.log(res)
                })
            },
        }
    }

</script>

<style scoped>
    .page {
        display: flex;
        padding: 30px;
        flex-direction: column;
        align-items: center;
    }

    .paySuccessImg {
        width: 360px;
        height: 242px;
        padding: 60px 0;
    }

    .prompt {
        font-size: 32px;
        padding-bottom: 16px;
    }

    .amount {
        font-size: 28px;
        color: #F39900;
        line-height: 70px;

    }

    .content {
        font-size: 28px;
        color: #999999;
        padding-bottom: 20px;
    }

    .payAmount {
        font-size: 28px;
        color: #999999;
        padding-bottom: 60px;
    }

    .payAmount span {
        margin-left: 5px;
        color: #517BD7;
        font-size: 36px;
    }

    .payBt {
        line-height: 100px;
        text-align: center;
        font-size: 36px;
        color: white;
        width: 630px;
        height: 100px;
        background: linear-gradient(141deg, rgba(104, 211, 255, 1) 0%, rgba(81, 123, 215, 1) 100%);
        border-radius: 50px;
    }



</style>
