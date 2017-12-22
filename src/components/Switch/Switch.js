import classnames from 'classnames';
import './Switch.less'
class Switch extends React.Component {
    handleChange(event) {
        const t = this;
        if (t.props.readOnly) {
          return;
        }
        t.props.onChange(!t.props.on, event);
    }

    render() {
        const t = this;
        const classSet = {
            active: t.props.on,
            readOnly: t.props.readOnly,
            [t.props.className]: !!t.props.className,
        };
        return (
            <div
                className={classnames("liu-switch", classSet)}
                readOnly={t.props.readOnly}
                onClick={t.handleChange.bind(this)}
            >
                <div className={'liu-switch-back'}>
                    <div className={'liu-switch-radius'} />
                </div>
            </div>
        )
    }
}
Switch.defaultProps = {
    on: true,
    onChange() {},
    readOnly: false,
};
  
Switch.propTypes = {
    on: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
};
  
Switch.displayName = 'Switch';
export default Switch