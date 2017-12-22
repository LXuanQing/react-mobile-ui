
class Datetime extends React.Component {
    render() {
        return(
            <div>Datetime</div>
        )
    }
}
Datetime.defaultProps = {
    className: '',
    locale: 'zh-cn',
    columns: Datetime.YMD,
    onConfirm: _ => _,
    onCancel: _ => _,
    slotRef: _ => _,
};
  
  // http://facebook.github.io/react/docs/reusable-components.html
Datetime.propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    locale: React.PropTypes.string,
    columns: React.PropTypes.array,
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    confirmText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    slotRef: React.PropTypes.func,
};
Datetime.displayName = 'Datetime';

export default Datetime;