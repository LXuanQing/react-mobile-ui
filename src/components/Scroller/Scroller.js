import classnames from 'classnames';
const IScroll = require('./iscroll');
import Context from '../Context'
import './Scroller.less'
class Scroller extends React.Component {

    componentDidMount() {
        const t = this;
    
        // 根节点的dom引用
        t.el = ReactDOM.findDOMNode(t.root);
    
        // 初始化 iscroll
        t.initScroll();
    }

    initScroll() {
        const t = this;
    
        // 参数过滤，onXxx 是事件，否则是配置参数
        const options = {};
        const events = {};
        console.log(t.props)
        Object.keys(t.props).forEach((key) => {
            const matches = /^on([A-Z]\w*)$/.exec(key); // exec如果找到了匹配，而且包含分组的话，返回的数组将包含多个元素，第一个元素是找到的匹配，之后的元素依次为该匹配中的第一、第二...个分组
            if (matches) { // 事件
                const evtName = matches[1].replace(/./, p => p.toLowerCase()); // 第一个首字母转换成小写 scrollEnd
                events[evtName] = t.props[key];
            } else if (key !== 'className' && key !== 'autoRefresh' &&
                key !== 'minWidth') { // 配置
                options[key] = t.props[key];
            }
        });
    
        // iscroll 实例化
        t.scroller = new IScroll(t.el, options);
    
        // 事件挂载
        Object.keys(events).forEach((key) => {
            t.scroller.on(key, events[key].bind(null, t.scroller));
        });
    }

    componentDidUpdate() {
        const t = this;
    
        // 避免很频繁的调用
        clearTimeout(t.timeout);
        t.timeout = setTimeout(() => {
          // 有些场景下不需要刷新
          if (t.props.autoRefresh) {
            // 更新 iscroll
            if (t.scroller) {
              t.scroller.refresh();
            }
          }
        }, 10);
    }
    
    componentWillUnmount() {
        // 销毁 iscroll
        this.scroller.destroy();
    }
    
    render() {
        const t = this;
        // iscroll 需要一个 wrapper，所以里面多加了一层 div
        return (
            <div // wrapper
                className={classnames(Context.prefixClass('scroller'), {
                    [t.props.className]: !!t.props.className,
                })}
                style={t.props.style}
                ref={(c) => { this.root = c; }}
            >
                <div
                    className={Context.prefixClass('DIB')}
                    style={{ minWidth: t.props.minWidth }}
                >{this.props.children}</div>
            </div>
        )
    }
}
// 更多配置参数，详见 http://iscrolljs.com/ ，事件用 onXxx 的格式，例如 scrollEnd 事件对应的参数是 onScrollEnd
Scroller.defaultProps = {
    click: /chrome/i.test(navigator.userAgent), // iscroll 默认屏蔽内部的 click 事件，考虑到在 chrome 中调试没开模拟器的场景，允许响应 click 点击。 http://iscrolljs.com/#basic-features
    disablePointer: true,
    autoRefresh: true,
    minWidth: '100%',
};
  
// http://facebook.github.io/react/docs/reusable-components.html
Scroller.propTypes = {
    autoRefresh: React.PropTypes.bool,
    className: React.PropTypes.string,
    disablePointer: React.PropTypes.bool,
    children: React.PropTypes.node,
};

export default Scroller