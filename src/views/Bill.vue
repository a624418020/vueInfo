<template>
    <div class="page">
        <div class="view">
            <div class="type">基本信息</div>
            <div class="content">
                <div class="nameView">
                    <div><span>姓名：</span>{{data.applyPo.name}}</div>
                    <div v-if="data.sex"><span>性别：</span>{{data.applyPo.sex}}</div>
                    <div v-if="data.age"><span>年龄：</span>{{data.applyPo.age}}</div>
                </div>
                <div class="nameView">
                    <div><span>手机号码：</span>{{data.applyPo.phone |concealPone}}</div>
                </div>
                <div class="nameView">
                    <div><span>身份证号码：</span>{{data.applyPo.idcard |concealCode}}</div>
                </div>
                <div class="imgView">
                    <img v-for="(it,id) in this.data.applyPo.idcardPic" :key="id" :src="it"/>
                </div>
            </div>
            <div class="waist">
                <div class="circleLeft"></div>
                <div class="line"></div>
                <div class="circleRight"></div>
            </div>
            <div class="type">病情描述</div>
            <div class="content">
                <div class="txt">{{data.applyPo.diseaseDesc}}</div>
            </div>
            <div class="type">药品清单</div>
            <div class="content" style="padding-top: 0">
                <div class="item" v-for="(item,index) in data.drugList" :key="index"
                     :style="index==data.drugList.length-1?'border: none;':''">
                    <img :src="item.pic" v-if="item.pic"/>
                    <div class="default" v-else>
                        <img src="../assets/default.png"/>
                    </div>
                    <div class="right">
                        <div class="itemName">{{item.productName}}</div>
                        <p>{{item.description}}</p>
                        <p>{{item.form}}</p>
                        <!--<p >¥ 131.00</p>-->
                    </div>
                </div>
            </div>
            <div class="waist">
                <div class="circleLeft"></div>
                <div class="line"></div>
                <div class="circleRight"></div>
            </div>
            <div class="content QRView" style="padding-top: 0">
                <img :src="QRurl"/>
                <p>请告知店员使用药店宝扫码下单</p>
            </div>
        </div>

    </div>
</template>

<script>
    import api from '../libs/apiServe'
    import QRCode from 'qrcode'
    import publicFunction from '../libs/publicFunction'

    export default {
        name: "Bill",
        data() {
            return {
                data: {
                    applyPo: {},
                    rxId: ''
                },
                waterNo: '',
                QRurl: '',//二维码

            }
        },
        filters: {
            concealPone(e) {
                if (e) return publicFunction.concealPone(e)


            },
            concealCode(e) {
               if(e) return publicFunction.concealCode(e)
            }

        },
        created() {
            this.rxId = this.$route.query.rxId;
            if (this.$route.query.waterNo) {
                this.waterNo = this.$route.query.waterNo;
                this.getCase();
                this.qrcode(this.waterNo)
            } else {
                this.$toast('订单ID不可为空')
            }

        },
        methods: {
            qrcode(data) {
                QRCode.toDataURL(data)
                    .then(url => {
                        this.QRurl = url
                    })
                    .catch(err => {
                        this.$toast('二维码生成失败', err)
                    })
            },
            //获取病例
            getCase() {
                api.postElecrxElecrxInfo({waterNo: this.waterNo})
                    .then((res) => {
                        res.forEach((item) => {
                            if (item.rxId == this.rxId) {
                                this.data = item;
                            }
                        });
                        if (this.data.applyPo && this.data.applyPo.idcardPic) {
                            this.data.applyPo.idcardPic = this.data.applyPo.idcardPic.split(',')
                        }

                    })
            },
        }
    }

</script>

<style scoped>
    p {
        margin-block-start: 0.3em;
        margin-block-end: 0.3em;
    }

    span {
        font-size: 24px;
        color: #666666;
    }

    .page {
        width: 100vw;
        min-height: 100vh;
        background: #F9F9F9;
        padding: 30px;
        box-sizing: border-box; /*设置padding 不超过设置好的*/
    }

    .view {
        background: white;
        border-radius: 16px;
        padding: 36px 0;
    }

    .type {
        display: table;
        padding: 0 18px;
        background: #517BD7;
        border-top-right-radius: 22px;
        border-bottom-right-radius: 22px;
        text-align: center;
        color: white;
        font-size: 28px;
    }

    .content {
        padding: 40px;
    }

    .nameView {
        display: flex;
        justify-content: space-between;
        padding-bottom: 26px;
    }

    .nameView div {
        font-size: 28px;
    }

    .imgView {
        display: flex;
    }

    .imgView img {
        width: 138px;
        height: 138px;
        margin-right: 20px;
        border: 1px solid rgba(221, 221, 221, 1);
    }

    .waist {
        display: flex;
        align-items: center;
        padding-bottom: 60px;

    }

    .circleLeft {
        border-radius: 50%;
        background: #F9F9F9;
        width: 30px;
        height: 30px;
        margin-left: -15px;
    }

    .circleRight {
        border-radius: 50%;
        background: #F9F9F9;
        width: 30px;
        height: 30px;
        margin-right: -15px;
    }

    .line {
        width: 660px;
        border-bottom: 1px #F3F3F3 dashed;
    }

    .txt {
        font-size: 28px;
        padding-bottom: 20px;
    }

    .item {
        display: flex;
        align-items: center;
        padding: 30px 0;
        border-bottom: 1Px #F3F3F3 solid;
    }

    .item img {
        width: 132px;
        height: 132px;
        padding: 0 15px;
    }

    .itemName {
        font-size: 28px;
        color: #222A2A;
    }

    .right {
        font-size: 24px;
        color: #999999;
        margin-left: 20px;
    }

    .QRView {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .QRView p {
        font-size: 28px;
    }

    .default {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 132px;
        height: 132px;
        background: #F6F6F6;
    }

    .default > img {
        width: 96px;
        height: 104px;
    }


</style>
