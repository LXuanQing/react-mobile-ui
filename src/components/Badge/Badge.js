import classnames from 'classnames';
import './Badge.less'
class Badge extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        count: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        text: React.PropTypes.string,
        corner: React.PropTypes.oneOf(['rt', 'lt', 'rb', 'lb']),
        dot: React.PropTypes.bool,
        overflowCount: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
    };

    static defaultProps = {
        className: '',
        count: 0,
        text: '',
        dot: false,
        overflowCount: 99,
    };

    static displayName = 'Badge';

    render() {
        const t = this;
        const cls = {
            [t.props.className]: !!t.props.className,
        };

        const {
            dot,
            text,
            corner,
            overflowCount,
        } = this.props;

        let { count } = this.props;

        count = count > overflowCount ? `${overflowCount}+` : count;

        if (text) { // 有text 不显示 count
            count = text;
        }

        const style = t.props.style || {};

        if ('left' in style) {
            style.right = 'auto';
        }

        if (corner) { // 有 corner 显示倾斜的条 且不显示 dot
            cls['badge-corner'] = true;
            cls[`badge-${t.props.corner}`] = true;
        } else {
            if (dot) { // 有 dot 不显示 count
                count = '';
                cls['badge-dot'] = true;
            }
    
            if (t.props.children) {
                style.webkitTransform = 'translate(50%, -50%)';
                style.transform = 'translate(50%, -50%)';
            }
        }

        if (!t.props.children) {
            cls['badge-no-child'] = true;
        }

        let showBadge = true;
        if ((!count || count === '0' || count < 0) && !dot) { // count没有或=0或<0 并且 没有dot
            showBadge = false;
        }

        return (
            <div className={classnames("liu-badge",cls)}>
                {
                    showBadge ?
                        <div className="badge-inner" style={style}> {count} </div>
                    : null
                }
                {t.props.children}
            </div>
        )
    }
}
export default Badge

/**
 * 
 * 1 badge角标的样式
 * 绝对定位 top 50% 相对于父relative元素的大小
 * translate 50% 相对于自身的大小
 * t.props.children 来撑开 Badge的大小
 * badge-inner 在右上角中心 布局方法 绝对定位 top:0 right: 0 transform: translate(50%,-50%); 平移 X --> Y 下                                                                                            
 */