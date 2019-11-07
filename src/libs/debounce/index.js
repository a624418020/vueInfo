import Vue from 'vue'
import {debounce} from "./debounce";
//自定义防抖
Vue.directive('debounce',{
    bind(el,binding){
        let executeFunction;
        if(binding.value instanceof Array){
            const [func,time=1000]=binding.value;
            executeFunction=debounce(func,time)
        }else {
            executeFunction=debounce(binding.value,1000)
        }
        el.addEventListener('click',executeFunction)
    }
});
