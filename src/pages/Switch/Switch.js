import { Component } from 'react';
import Switch from 'components/Switch'
import './Switch.less'
export default class _Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          on1: true,
          on2: false,
          on3: false,
        };
    }
    handleChange(from,on){
        this.setState({
            [from]: on
        })
    }
    render() {
        return (
            <div>
                <div className="demo-item">
                    <Switch on={this.state.on1} onChange={this.handleChange.bind(this, 'on1')}/>
                    <input/>
                </div>
            </div>
        )
    }
}  