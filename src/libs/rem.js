// 设置 rem 函数
export default function setRem() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    let menu =7.5;

    htmlDom.style.fontSize = htmlWidth / menu + 'px';
    console.log(htmlWidth,htmlDom.style.fontSize)
}
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}

