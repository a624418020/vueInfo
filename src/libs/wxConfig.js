import wx from 'weixin-js-sdk';
import axios from '@/core/net/default.interceptor';

export default function getWXSign() {
    return new Promise((resolve) => {
        let url = '';
        if (window.location.host === 'wx.uniondrug.cn') {
            url = 'https://wxapi.uniondrug.cn/v/wx/config';
        }
        else if (window.location.host === 'wx.uniondrug.net') {
            url = 'https://wxapi.uniondrug.net/v/wx/config';
        }
        else {
            url = 'https://wxapi.turboradio.cn/v/wx/config';
        }
        axios.postJson(url, {}).then((res) => {
            const data = res.data; // 返回wx.config需要的参数
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',//检测接口权限
                    'updateTimelineShareData',//1.4.0的分享接口，注意：使用新版本的分享功能，一定要在该列表加上对应的老版本功能接口，否则新接口不起作用
                    'updateAppMessageShareData',//1.4.0的分享接口,注意：使用新版本的分享功能，一定要在该列表加上对应的老版本功能接口，否则新接口不起作用
                    'onMenuShareAppMessage',//老版本分享接口。
                    'onMenuShareTimeline'//老版本分享接口。
                ]
            });
            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                wx.updateAppMessageShareData({
                    title: '您收到了一份药联权益', // 分享标题
                    desc: '您的好友送了您一份药联权益，快去激活吧！', // 分享描述
                    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://uniondrug.oss-cn-hangzhou.aliyuncs.com/frontend.resident/stagnation-logo1.png', // 分享图标
                    success: function () {
                        console.log('11111')
                        // 设置成功
                    }, fail: function (res) {
                        console.log('1234', res)
                    }
                })
            });
            wx.onMenuShareAppMessage({
                title: '您收到了一份药联权益', // 分享标题
                desc: '您的好友送了您一份药联权益，快去激活吧；', // 分享描述
                link: 'location.href', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://uniondrug.oss-cn-hangzhou.aliyuncs.com/frontend.resident/stagnation-logo1.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    console.log('11111')
                    // 用户点击了分享后执行的回调函数
                },
                fail: function (res) {
                    console.log('123', res)
                }
            });
            wx.ready(() => {
                resolve(wx);
            });
        });
    });
}
//# sourceMappingURL=wxSign.js.map
