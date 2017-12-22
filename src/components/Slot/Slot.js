const classnames = require('classnames');
const Context = require('../Context');
const Popup = require('../Popup');
const cloneDeep = require('lodash/cloneDeep');

const SlotHeader = require('./tpls/Header');
const SlotPane = require('./tpls/Pane');
import './Slot.less'
const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

class Slot extends React.Component {
    constructor(props) {
        super(props);
    
        const t = this;
    
        this.lastChoose = cloneDeep(props.value);
    
        // 初始状态
        t.state = {
            childPaneIsScrolling: false,
            visible: false,
        };
    }

    setDefaultLastChoose(value) {
        if (value && value.length > 0) {
          return value;
        }
    
        const ret = [];
        this.props.data.forEach((item) => {
            ret.push(item[0]);
        });
    
        return ret;
    }

    show() {
        this.setState({
            visible: true,
        });
    }
    
    hide() {
        this.setState({
            visible: false,
        });
    }
    
    handleCancel() {
        const t = this;
        if (t.state.childPaneIsScrolling) {
            return;
        }
        try {
            t.props.onCancel();
        } finally {
            t.hide();
        }
    }

    handleConfirm() {
        const t = this;
        if (t.state.childPaneIsScrolling) {
            return;
        }
        // value can be only an array or undefined or null
        const isNotEmptyValue = value => !!(value && value.length);
        try {
            const confirmValue = isNotEmptyValue(t.lastChoose) ? t.lastChoose : t.setDefaultLastChoose();
            t.props.onConfirm(confirmValue);
        } finally {
            t.hide();
        }
    }

    handleChange(data, column, index) {
        const t = this;
        t.lastChoose = data;
        t.props.onChange(cloneDeep(data), column, index);
    }

    handleMaskClick() {
        if (this.props.maskCloseable) {
            this.setState({ visible: false });
        }
    }

    childPaneOnScrolling(scrollingState) {
        this.setState({
            childPaneIsScrolling: scrollingState,
        });
    }

    createPaneContent() {
        const t = this;
        const {
            className, title, value, data, scrollMod,
            columns, cancelText, confirmText, columnsFlex,
        } = t.props;
    
        const headerProps = {
            title,
            cancelText,
            confirmText,
            onConfirm: () => { t.handleConfirm(); },
            onCancel: () => { t.handleCancel(); },
            isScrolling: t.state.childPaneIsScrolling,
        };
    
        const paneProps = {
            visible: t.state.visible,
            data,
            value,
            onChange: t.handleChange.bind(t),
            scrollMod,
            columns,
            columnsFlex,
            onScrolling: t.childPaneOnScrolling.bind(t),
        };
    
        return (
          <div
            className={classnames(Context.prefixClass('slot'), {
                [className]: !!className,
            })}
          >
            <SlotHeader {...headerProps} />
            <SlotPane {...paneProps} />
          </div>
        );
    }

    render() {
        return(
            <Popup
                visible={this.state.visible}
                content={this.createPaneContent()}
                onMaskClick={() => { this.handleMaskClick(); }}
          />
        )
    }
}
// 格式化单列数据
Slot.formatColumnValue = (columnData, value) => {
    const newColumnData = cloneDeep(columnData);
    let newValue = cloneDeep(value);
    // 兼容简单选中值
    let columnValue;
    if (typeof newValue !== 'undefined') {
        if (Object.prototype.hasOwnProperty.call(newValue, 'value')) {
            columnValue = newValue.value;
        } else {
            columnValue = newValue;
        }
    }
    newValue = undefined;
  
    // 遍历每一项
    for (let i = 0; i < newColumnData.length; i++) {
        let cell = newColumnData[i];
  
        // 兼容非对象的数据
        if (typeof cell !== 'object') {
            cell = newColumnData[i] = {
            text: cell,
            value: cell,
            };
        }
  
        // 补全缺失数据
        if (!Object.prototype.hasOwnProperty.call(cell, 'text')) {
            cell.text = cell.value;
        }
        if (!Object.prototype.hasOwnProperty.call(cell, 'value')) {
            cell.value = cell.text;
        }
    
        // 定位选中值
        if (cell.value === columnValue) {
            newValue = cell;
        }
    }
  
    // 默认选中第一项
    if (typeof newValue !== 'object') {
        newValue = columnData[0];
    }
  
    return {
        columnData: newColumnData,
        columnValue: newValue,
    };
};

// 格式化多列数据
Slot.formatDataValue = (data = [], value = []) => {
    // 兼容单列数据的缩略写法
    let newData = cloneDeep(data);
    let newValue = cloneDeep(value);
    if (!isArray(newData[0])) {
        newData = [newData];
    }
    if (!isArray(newValue)) {
        newValue = [newValue];
    }
  
    // 遍历数据模型
    newData = newData.map((columnData, column) => {
        // 格式化列数据
        const ret = Slot.formatColumnValue(columnData, value[column]);
        newValue[column] = ret.columnValue;
        return ret.columnData;
    });
  
    return {
        data: newData,
        value: newValue,
    };
};

Slot.Pane = SlotPane;

Slot.defaultProps = {
    title: '',
    value: [],
    maskCloseable: true,
    data: [],
    className: '',
    confirmText: '完成',
    cancelText: '取消',
    onConfirm() { },
    onCancel() { },
    onChange() { },
    scrollMod: 'reset',
    columns: [],
};

Slot.propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    value: React.PropTypes.array,
    maskCloseable: React.PropTypes.bool,
    confirmText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onChange: React.PropTypes.func,
    scrollMod: React.PropTypes.string,
    columns: React.PropTypes.array,
};

Slot.displayName = 'Slot';

export default Slot