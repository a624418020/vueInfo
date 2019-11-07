/**
 * @func 函数防抖
 *@wait 延迟执行函数
 *@immediate 是否立即执行
 */
export function debounce(func, wait, immediate = true) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if(timeout){
            clearTimeout(timeout)

        }
        if(immediate){
            var callNow =!timeout;
            timeout=setTimeout(()=>{
                timeout=null
            },wait);
            if(callNow) func.apply(context,args)

        }else {
            timeout=setTimeout(()=>{
                func.apply(context,args)
            },wait)
        }

    }

}
