import wx from 'weixin-js-sdk';
import axios from 'axios';
import api from '@/core/net/default.interceptor';

export default function location() {
    return new Promise((resolve, reject) => {
        api.postJson('/v/wx/config', {}).then((res) => {
            var data = res.data; // 返回wx.config需要的参数
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(() => {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标 sasdasd，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var location = longitude + ',' + latitude;
                        sessionStorage.setItem('location', location);
                        sessionStorage.setItem('latitude', latitude);
                        sessionStorage.setItem('longitude', longitude);
                        resolve(location)
                    },
                    fail: function (e) {
                        resolve('noLocation');

                    },
                });
            });
            wx.error(function(e){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
        });
    });
}
