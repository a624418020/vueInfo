import {
    post, upload
} from './axios'

export default {
    //电子处方申请
    postElecrxSaveApply(prams) {
        return post('/elecrx/saveApply', prams)
    },
    //电子处方详情查询
    postElecrxElecrxInfo(prams) {
        return post('/elecrx/getElecrxInfo', prams)
    },
    //成功回调
    postElecrxCallBack(prams) {
        return post('/elecrx/callBack', prams)
    },
    //上传照片
    postOssUpload(prams) {
        console.log('prams',prams);
        return upload('/oss/upload', prams)
    },
    //电子处方购买
    postElecrxBuy(prams) {
        return post('/elecrx/buy', prams)
    },
    //获取病例
    getElecrxDisease(prams) {
        return post('/elecrx/getDisease', prams)
    },


}
