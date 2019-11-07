
export default {
    getTxt(url) {
        let ajx = new XMLHttpRequest();
        ajx.open("get", url, true);
        return new Promise((resolve, reject) => {
            ajx.onreadystatechange = () => {
                if (ajx.readyState != 4) {
                    return;
                }
                if (ajx.status >= 200 && ajx.status < 300) {
                    resolve(ajx.responseText)
                }
            };
            ajx.send();
        })
    },
    //验证手机号合法性
    isPoneAvailable(mobile) {
        return /^1[3-9][0-9]\d{4,8}$/.test(mobile);

    },
    //手机号码中间加星号
    concealPone(phone){
        return phone.substr(0,3)+'****'+phone.substr(7);
    },
    //验证身份证合法性
    isCodeAvailable(code) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code);
    },
    //身份证码中间加星号
    concealCode(code){
        return code.substr(0,3)+'********'+code.substr(11);
    },

    format(time) {
//shijianchuo是整数，否则要parseInt转换
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + "-" + this.add0(m) + "-" + this.add0(d) + " " + this.add0(h) + ":" + this.add0(mm) + ":" + this.add0(s);
    },
    add0(m) {
        return m < 10 ? "0" + m : m;
    },
    //数组转字符串
    listToString(list) {
        let data = '';
        list.forEach((item, index) => {
            data += item.url;
            if (list.length !== index + 1) {
                data += ','
            }
        });
        return data;
    },

    //处理深拷贝问题
    deepClone(obj) {
        let _obj = JSON.stringify(obj),
            objClone = JSON.parse(_obj);
        return objClone
    }
}

