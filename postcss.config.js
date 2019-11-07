//
// module.exports = {
//   plugins: {
//     autoprefixer: {}
//   }
// }
module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: ['Android >= 4.4','Firefox >= 20', 'iOS >= 8']
        },
        'postcss-pxtorem': {
            rootValue: 10,// 将px转化为rem, 1px --> 0.01rem;
            propList: ['*']
        }
    }
}
