import Dialog from 'rc-dialog';
import classnames from 'classnames';

import './Popup.less'

const ins = {
    defaultInstance: null,
    instances: [],
};
let instanceId = 1;

function create(instanceId, config, content, afterClose = () => { }) { // 0 afterClose 这是传入参数的默认值
    const props = {
        prefixCls: 't-popup',
        animationType: 'slide-up',
        ...config,
    };
    const {
        prefixCls,
        transitionName,
        maskTransitionName,
        maskClosable = true,
        animationType,
        className,
        onClose,
    } = props;
  
    let div = document.createElement('div');
    div.className = "Popup"
    document.body.appendChild(div);
  
    function close() {
        if (div) {
            console.log("卸载")
            console.log(div)
            ReactDOM.unmountComponentAtNode(div); // 从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。
            div.parentNode.removeChild(div);
            div = null;
        }
        afterClose(instanceId);
    }
  
    const transName = `${prefixCls}-${animationType}`;
  
    function handleMaskClick() {
        console.log("消失")
        if (maskClosable) {
            if (props.onMaskClose && typeof props.onMaskClose === 'function') {
                const res = props.onMaskClose();
                if (res && res.then) {
                    res.then(() => {
                        close();
                    });
                } else {
                    close();
                }
            } else {
                close();
            }
        }
    }
  
    const maskProps = {
        onClick: (e) => {
            e.preventDefault();
            handleMaskClick();
        },
    };
  
    const update = (newContent) => {
        ReactDOM.render(
            <Dialog
                prefixCls={prefixCls}
                visible
                title=""
                footer=""
                closable={false}
                className={classnames(`${prefixCls}-${animationType}`, {
                    [className]: !!className,
                })}
                onClose={() => {
                    if (onClose) {
                        onClose();
                    } else {
                        handleMaskClick();
                    }
                }}
                transitionName={transitionName || transName}
                maskTransitionName={maskTransitionName || 't-fade'} // t-fade-leave  t-fade-leave-active
                maskClosable={maskClosable}
                wrapProps={props.wrapProps || {}}
                maskProps={props.maskProps || maskProps}
            >
                {newContent || content}
            </Dialog>,
            div
        );
    };
  
    update();
  
    return {
      instanceId,
      close,
      update,
    };
  }
class Popup extends React.Component {

    static propTypes = {
        children: React.PropTypes.node,
        content: React.PropTypes.node,
        options: React.PropTypes.object,
        visible: React.PropTypes.bool,
        onMaskClick: React.PropTypes.func,
    }
    
    static defaultProps = {
        onMaskClick: () => {},
    }

    componentDidMount() {
        console.log("componentDidMount")
        if (this.props.visible === true) {
            this.show();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.instance) {
            this.instance.update(this.props.content);
        }
        if (this.props.visible === true && prevProps.visible === false) {
            this.show();
        } else if (this.props.visible === false && prevProps.visible === true) {
            this.hide();
        }
    }

    show() {
        if (!this.instance) {
            console.log("没有 instance")
            this.instance = Popup.newInstance();
        }
        this.instance.show(this.props.content, this.getOptions());
    }

    hide() {
        if (this.instance) {
            this.instance.hide();
            this.instance = null;
        }
    }

    getOptions() {
        const options = { ...this.props };
        delete options.content;
        if ('visible' in this.props) {
            options.maskProps = {
                onClick: () => {
                    this.props.onMaskClick();
                },
            };
            options.onClose = () => {
                this.props.onMaskClick();
            }
        }
        return options;
    }

    static newInstance = () => {
        let j;
        return {
            show: (content, config) => {
                j = create(instanceId, config, content, (iId) => {
                    for (let i = 0; i < ins.instances.length; i++) {
                        if (ins.instances[i].instanceId === iId) {
                            ins.instances.splice(i, 1);
                            return;
                        }
                    }
                });
                instanceId += 1;
                ins.instances.push(j);
            },
            hide: () => {
                j.close();
            },
            update: (content) => {
                j.update(content);
            },
        };
    }

    static show = (content, config) => {
        Popup.hide();
        ins.defaultInstance = create('0', config, content, (iId) => {
            if (iId === '0') { // 直接调用 .show
                console.log(ins.defaultInstance,"1")
                ins.defaultInstance = null;
            }
        });
        console.log(ins.defaultInstance)
        return ins.defaultInstance;
    }

    static hide = () => {
        if (ins.defaultInstance) {
            ins.defaultInstance.close();
        }
    }

    fireEvents(type, e) {
        const childCallback = this.props.children.props[type];
        if (childCallback) {
            childCallback(e);
        }
    }

    handleClick(e) {
        this.fireEvents('onClick', e);
        if (!Object.prototype.hasOwnProperty.call(this.props, 'visible')) {
            this.show();
        }
    }

    render() {
        // console.log("render")  // 直接调用 class方法不渲染render
        const children = this.props.children;
        if (children === undefined || children === null) {
            return null;
        }
        const child = React.Children.only(children);
        const newChildProps = {
            onClick: (e) => { this.handleClick(e); },
        };
        return React.cloneElement(child, newChildProps);
    }
}
export default Popup