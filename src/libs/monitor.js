
export default {

    // 监听到事件发生后，调用_trackEvent方法来上报
    _trackEvent: function (e, instance) {
        // 首先找到这个事件的target
        // console.log('bbbbb', e);
        var target = this._getEventTarget(e);
        console.log('数据上报点击事件', target);
    },

    _getEventTarget: function (e) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
        if (typeof e.target === 'undefined') {
            return e.srcElement;
        } else {
            return e.target;
        }
    },


    // UNDERSCORE
// Embed part of the Underscore Library
    bind(func, context) {
        var win = window;
        var ArrayProto = Array.prototype,
            FuncProto = Function.prototype,
            ObjProto = Object.prototype,
            slice = ArrayProto.slice,
            toString = ObjProto.toString,
            hasOwnProperty = ObjProto.hasOwnProperty,
            windowConsole = win.console,
            navigator = win.navigator,
            document = win.document,
            windowOpera = win.opera,
            screen = win.screen,
            userAgent = navigator.userAgent;

        var nativeBind = FuncProto.bind,
            nativeForEach = ArrayProto.forEach,
            nativeIndexOf = ArrayProto.indexOf,
            nativeIsArray = Array.isArray,
            breaker = {};
        var args, bound;
        if (nativeBind && func.bind === nativeBind) {
            return nativeBind.apply(func, slice.call(arguments, 1));
        }
        // if (!_.isFunction(func)) {
        //     throw new TypeError();
        // }
        args = slice.call(arguments, 2);
        bound = function () {
            if (!(this instanceof bound)) {
                return func.apply(context, args.concat(slice.call(arguments)));
            }
            var ctor = {};
            ctor.prototype = func.prototype;
            var self = {};
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) {
                return result;
            }
            return self;
        };
        return bound;

    },

}
