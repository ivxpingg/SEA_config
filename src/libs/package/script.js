import Utils from '../utils';
import BrowserType from './browser-type';
/**
 * script加载js
 * @param {Object || Array} attribute
 *   {
 *       target: '',
 *       src: ''
 *   }
 * @param {Function} callback 回调函数
 * @Depend
 * @return null
 */
const createScript = function (attribute, callback) {
    if (Utils.isArray(attribute)) {}
    else {

        var domScript = document.createElement('script');
        domScript.setAttribute('type', 'text/javascript');
        domScript.setAttribute('src', attribute.src);

        if (callback && Utils.isFunction(callback)) {
            readyState(domScript, callback);
        }

        attribute.target.appendChild(domScript, callback);
    }
}

const readyState = function (el, callback) {
    var o = BrowserType();
    console.dir(o);
    if (!o.isIE) { //if not IE
        el.onload = function () {
            console.log('other');
            console.dir(BMap);
            callback();
        }
    }
    else {
        el.onreadystatechange = function () {

            if (js.readyState == 'loaded' || js.readyState == 'complete') {
                console.log('ie');
                console.dir(BMap);
                callback();
            }
        }
    }
}

export default createScript;