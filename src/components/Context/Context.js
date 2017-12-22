let win = window;
let doc = document;
let runtimeGlobalConfig = {};
let Context = {
    noop(v) {
        return v;
    },
    /**
     * 获取全局配置
     * @param property {String} optional
     * @returns {*}
     */
    getGlobal(property) {
        return property ? runtimeGlobalConfig[property] : runtimeGlobalConfig;
    },
    /**
     * 为 class 添加前缀
     * @param property {String} required
     * @returns {*}
     */
    prefixClass(classNames) {
        let prefix = 'liu';
        return classNames.split(' ').map((className) => {
            return prefix + '-' + className;
        }).join(' ');
    }
}
// 多次require时保证返回同一个全局对象 保证setGlobal/getGlobal正确执行
module.exports = win.__TingleContext || (win.__TingleContext = Context);