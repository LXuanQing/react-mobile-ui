import classnames from 'classnames';
import Dialog from 'rc-dialog';
import IconCheckRound from 'salt-icon/lib/CheckRound';
import IconCrossRound from 'salt-icon/lib/CrossRound';
import IconToastFail from 'salt-icon/lib/ToastFail';
import IconToastLoading from 'salt-icon/lib/ToastLoading';
import IconInfoRound from 'salt-icon/lib/InfoRound';
import { prefixClass, noop } from '../Context';
import { VBox } from '../Boxs';
import './Toast.less'
let globalInstance;
const iconCompMap = {
    success: IconCheckRound,
    error: IconCrossRound,
    fail: IconToastFail,
    loading: IconToastLoading,
    light: IconInfoRound,
};
class Toast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: props.visible,
          hasMask: props.hasMask,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            hasMask: nextProps.hasMask,
        })
    }

    getIconComp() {
        return iconCompMap[this.props.type];
    }

    renderIcon() {
        const Icon = this.getIconComp();
        
        const icon = this.props.icon;
        if (!icon && !Icon) {
            return null;
        }
        // svg loader 无法解析 loading 的 svg
        // 使用 dangerouslySetInnerHTML={{__html: toastLoading}} 在 uc 内核也有问题
        // 临时方案使用 background
        if (Icon === IconToastLoading) {
            return (
              <div className={prefixClass('toast-icon toast-icon-loading')} />
            );
        }
        const iconProps = {
            fill: '#fff',
            width: '44px',
            height: '44px',
            className: prefixClass('toast-icon'),
        };
        if (icon) {
            return React.cloneElement(icon, iconProps);
        }
        return (
            <Icon {...iconProps} />
        );
    }

    handleDidHide() {
        this.props.onDidHide();
    }

    hasIcon() {
        return this.getIconComp() || this.props.icon;
    }

    startCountdown() {
        const t = this;
        t.timer = setTimeout(() => {
          this.hide();
          clearTimeout(t.timer);
        }, t.props.duration);
    }

    hide(fn) {
        this.setState({
            visible: false,
            hasMask: false,
        }, () => {
            if (typeof fn === 'function') {
                fn();
            }
        });
    }
    render() {
        const t = this;
        const { visible, hasMask } = t.state;
        const {
            className, content, autoHide, transitionName,
            prefixCls, type, maskTransitionName, ...other
        } = t.props;
        const customStyle = {
            width: other.width,
            height: other.height,
        };
        let transName;
        if (!transitionName) {
            if (type !== 'light') {
                transName = 'liu-toast-fade';
            } else {
                transName = 'liu-toast-light-fix-top';
            }
        } else {
            transName = `liu-toast-light-${transitionName}`;
        }

        // 如果可见 且 可自动关闭 则开始倒计时
        if (visible && autoHide) { // type = loading时，传入autoHide不自动隐藏
            t.startCountdown();
        }

        let maskTransName;
        if (!maskTransitionName) {
            maskTransName = 'liu-toast-fade';
        } else {
            maskTransName = `liu-toast-mask-${maskTransitionName}`;
        }

        return (
            <Dialog
                prefixCls={prefixCls}
                visible={visible}
                title=""
                footer=""
                closable={false} // whether show close button
                mask={hasMask} // whether show mask
                style={customStyle}
                maskTransitionName={maskTransName}
                transitionName={transName} // 内容动画
                afterClose={() => { t.handleDidHide(); }} // visible = false时调用
                className={classnames({
                    [prefixClass(`toast-${type} toast-has-icon`)]: !!this.hasIcon(),
                    [className]: !!className,
                    [transName]: !!transName,
                })}
            >
                <VBox hAlign="center">
                    {this.renderIcon()}
                    {content && <div className={prefixClass('toast-content')}>{content}</div>}
                </VBox>
            </Dialog>
        )
    }
}
Toast.defaultProps = {
    prefixCls: 'liu-toast',
    hasMask: false,
    onDidHide: noop,
    visible: true,
    autoHide: true,
    content: '',
    duration: 1500,
};
Toast.propTypes = {
    prefixCls: React.PropTypes.string,
    visible: React.PropTypes.bool,
    hasMask: React.PropTypes.bool,
    autoHide: React.PropTypes.bool,
    onDidHide: React.PropTypes.func,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    content: React.PropTypes.string,
    icon: React.PropTypes.string,
    duration: React.PropTypes.number,
    transitionName: React.PropTypes.string,
    type: React.PropTypes.string,
};

const WRAPPER_ID = '__TingleGlobalToast__';
const doc = document;  
let wrapper = doc.getElementById(WRAPPER_ID);

if (!wrapper) {
    wrapper = doc.createElement('div');
    wrapper.id = WRAPPER_ID;
    doc.body.appendChild(wrapper);
}
ReactDOM.render(<Toast visible={false} />, wrapper);


Toast.show = (props) => {
    ReactDOM.render(<Toast visible {...props} ref={(c) => { globalInstance = c; }} />, wrapper);
    
};

Toast.hide = (fn) => {
    if (globalInstance) {
      globalInstance.hide(fn);
    }
};
  
Toast.displayName = 'Toast';

export default Toast