<template>

    <div>
        <img class="titleImg" src="../assets/entry-title.png"/>
        <div class="title">为了更好的为您提供在线咨询及开方服务， 请先填写资料信息便于医生快速诊断</div>
        <div class="view">
            <div class="pointView">标红色*号为必填项，未填写完成无法开方</div>
            <div class="itemView">
                <div class="starView">*</div>
                <div class="inputView" @click="beforeShow()"><input type="text"
                                                                    v-model="upData.diseaseName"
                                                                    placeholder="请选择慢病名称" @blur="onBlur()" readonly>
                    <van-icon name="arrow-down"/>
                </div>
            </div>
            <div class="itemView">
                <div class="starView">*</div>
                <textarea class="textareaView" placeholder="病情描述" v-model="upData.diseaseDesc"
                          @blur="onBlur()"></textarea>
            </div>
            <div class="itemView">
                <div class="starView">*</div>
                <van-uploader :after-read="afterRead"
                              preview-size="80"
                              upload-text="上传病例信息"
                              :max-count="8"
                              v-model="fileList">
                </van-uploader>
            </div>
            <div class="itemView">
                <div class="starView">*</div>
                <div class="inputView">
                    <img class="headImg" src="../assets/head.png"/>
                    <input type="text" placeholder="姓名" v-model="upData.name" @blur="onBlur()">
                </div>
            </div>
            <div class="itemView">
                <div class="starView">*</div>
                <div class="inputView">
                    <img class="telImg" src="../assets/tel.png"/>
                    <input type="tel" placeholder="手机" v-model="upData.phone" @blur="onBlur()">
                </div>
            </div>
            <div class="itemView">
                <div class="starView">*</div>
                <div class="inputView">
                    <img class="codeImg" src="../assets/code.png"/>
                    <input type="text" placeholder="身份证号码" v-model="upData.idcard" @blur="onBlur()">
                </div>
            </div>
            <div class="itemView">
                <div class="starView">*</div>
                <van-uploader :after-read="afterReadCode"
                              preview-size="80"
                              :max-count="2"
                              upload-text="上传身份信息"
                              v-model="fileCodeList">
                </van-uploader>
            </div>
            <div class="itemView">
                <div class="starView" style="color: white">*</div>
                <div class="inputView">
                    <input type="text" placeholder="性别" @click="showSex=!showSex" @blur="onBlur()">
                </div>
            </div>
            <div class="itemView">
                <div class="starView" style="color: white">*</div>
                <div class="inputView">
                    <input type="number" placeholder="年龄" @blur="onBlur()">
                </div>
            </div>
            <div class="itemView ">
                <div class="starView">*</div>
                <van-checkbox v-model="checked" icon-size="14"><a class="notification" @click.stop="goNotofi()">互联网诊疗风险告知及知情同意书</a>
                </van-checkbox>
            </div>


            <div  v-debounce="[() => { submit() }, 500]"
                 v-if="upData.diseaseName&&upData.diseaseDesc&&upData.phone&&checked&&upData.idcard&&fileList.length>0&&fileCodeList.length>0"
                 class="upData">确定
            </div>

            <div class="upData" id="1231"   v-else style="background: #CCCCCC">确定</div>

        </div>

        <van-popup
                v-model="showInput"
                position="bottom"
                :style="{ height: '35%' }"
        >
            <van-picker :columns="columns"
                        @confirm="onChange"
                        @cancel="beforeClose"
                        show-toolbar
                        :default-index="2"/>
        </van-popup>

    </div>
</template>

<script>
    import {upData} from '../infoData/entry.model.js'
    import publicFunction from '../libs/publicFunction.js'
    import notification from '../views/Notification.vue'
    import api from '../libs/apiServe'

    export default {
        name: "entry",
        data() {
            return {
                checked: true,
                showSex: false,
                fileList: [],//病例图片列表
                fileCodeList: [],//身份证图片列表
                caseList: [],//病例列表
                showInput: false, //显示选择病例
                columns: [],
                upData: new upData(),
                theArray: [],

            }
        },
        created() {

            this.getCase();
        },
        methods: {


            //确认按钮按钮
            submit() {
                console.log(this.fileList);
                if (!publicFunction.isPoneAvailable(this.upData.phone)) {
                    this.$toast('请输入有效的手机号码！');
                    return
                }
                if (!publicFunction.isCodeAvailable(this.upData.idcard)) {
                    this.$toast('请输入有效的身份证号码！');
                    return
                }
                this.upData.diseasePic = publicFunction.listToString(this.fileList);
                this.upData.idcardPic = publicFunction.listToString(this.fileCodeList);
                console.log(this.upData);
                this.setData();
            },
            //提交数据 5813b132fa2a4cbd96b0870c0ad1c79b
            setData() {
                api.postElecrxSaveApply(this.upData).then((res) => {
                    if(window.location.host === 'wx.uniondrug.net'||window.location.host === 'wx.uniondrug.cn'){
                        location.href ='https://www.tdaifu.cn/#/login/'+res.waterNo+'/'+res.customerId;
                        console.log('aaa','https://www.tdaifu.cn/#/login/' + res.waterNo + '/' + res.customerId);
                    }else {
                        location.href ='https://www.tdaifu.cn/IMDemo/#/login/'+res.waterNo+'/'+res.customerId;
                        console.log('aaa','https://www.tdaifu.cn/IMDemo/#/login/' + res.waterNo + '/' + res.customerId);
                    }

                    //  location.href = 'https://www.tdaifu.cn/IMDemo/#/?name=' + res.customerId + '&customerId=' + res.customerId + '&to=customer_wangyiyang'
                })
            },
            //获取病例
            getCase() {
                api.getElecrxDisease({}).then((res) => {
                    this.caseList = res;
                    this.caseList.forEach((item) => {
                        this.columns.push(item.name);
                    });

                    console.log(res)

                })
            },
            //选择病例
            onChange(value, index) {
                this.upData.diseaseName = value;
                // console.log(`当前值：${value}, 当前索引：${index}`);

                this.beforeClose();
            },
            // 此时可以自行将文件上传至服务器 上传病例
            afterRead(file) {
                api.postOssUpload(file).then((res) => {
                    this.fileList[this.fileList.length - 1]['url'] = res;
                    this.$forceUpdate();
                })
            },
            // 可以自行将文件上传至服务器 上传身份证
            afterReadCode(file) {
                api.postOssUpload(file).then((res) => {
                    this.fileCodeList[this.fileCodeList.length - 1]['url'] = res;
                    this.$forceUpdate()
                })
            },
            beforeShow() {
                this.showInput = true;
                console.log(this.showInput)
            },
            //关闭选择框
            beforeClose() {
                this.showInput = false

            },
            goNotofi() {
                this.$router.push({path: 'Notification'})

            },
            //解决IOS低版本系统兼容
            onBlur() {
                document.body && (document.body.scrollTop = window.document.body.scrollTop);
            },


        }

    }

</script>

<style scoped>
    textarea {
        background: rgba(249, 249, 249, 1);;
        box-sizing: border-box;
        outline: none;
        padding: 26px;
        width: 630px;
        height: 200px;
        font-size: 28px;
        border: 0;
    }

    input {
        background: none;
        box-sizing: border-box;
        outline: none;
        padding-left: 26px;
        font-size: 28px;
        flex-grow: 1;
        padding-right: 26px;
        border: 0;
    }
    input:disabled{
        color: #222A2A;
        opacity: 1;
        -webkit-text-fill-color:#222A2A;
    }

    input::placeholder {
        color: #999999;
    }

    textarea::placeholder {
        color: #999999;
    }

    .titleImg {
        position: absolute;
        top: 0;
        left: 0;
        width: 750px;
        height: 340px;
        z-index: -1;
    }

    .view {
        width: 710px;
        margin-left: 20px;
        border-radius: 16px;
        background: white;
        padding-bottom: 40px;

    }

    .title {
        height: 194px;
        width: 494px;
        font-size: 26px;
        padding: 0 20px;
        color: white;
        display: flex;
        align-items: center;
    }

    .pointView {
        font-size: 28px;
        color: #FF4851;
        line-height: 110px;
        padding: 0 40px;
    }

    .itemView {
        padding-bottom: 48px;
        display: flex;
        align-items: center;
    }

    .itemViewNoyifi {
        justify-content: center;
    }

    .starView {
        padding-top: 6px;
        width: 40px;
        color: #FF4851;
        font-size: 28px;
        text-align: center;
    }

    .inputView {
        width: 630px;
        background: #F9F9F9;
        height: 84px;
        border-radius: 42px;
        display: flex;
        align-items: center;
    }

    .headImg {
        width: 28px;
        height: 28px;
        margin-left: 24px;
    }

    .telImg {
        width: 24px;
        height: 28px;
        margin-left: 24px;
    }

    .codeImg {
        width: 32px;
        height: 24px;
        margin-left: 24px;
    }

    .addImg {
        width: 158px;
        height: 158px;
    }

    .upData {
        height: 100px;
        width: 630px;
        border-radius: 50px;
        margin: auto;
        font-size: 36px;
        color: white;
        text-align: center;;
        line-height: 100px;
        background: linear-gradient(141deg, rgba(104, 211, 255, 1) 0%, rgba(81, 123, 215, 1) 100%);
    }

    .van-icon {
        padding: 0 30px;
        color: #999999;
    }

    .notification {
        font-size: 24px;
        text-decoration: underline;
    }


</style>
