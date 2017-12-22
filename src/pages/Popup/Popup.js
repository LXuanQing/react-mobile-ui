import Popup from 'components/Popup'

import './Popup.less'
class _Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: 1,
            visible: false,
        };
    }

    render() {
        return (
            <div className="demo_Popup">
                <button onClick={() => {
                    Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
                        animationType: 'slide-up',
                    });
                }}>默认向上划出</button>
                <button onClick={() => {
                    Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                        animationType: 'slide-right',
                    });
                }}>向左划出</button>

                <button onClick={() => {
                    Popup.show(
                        <div className="demo-popup-container-2">
                            <div onClick={() => {
                                Popup.hide();
                            }}
                            >点我关闭 popup</div>
                            </div>, {
                            maskClosable: false,
                        });
                    }}
                >手动控制关闭 Popup</button>

                <button onClick={() => { this.setState({ visible: true }); }}>手动控制 Visible</button>
                <Popup
                    content={
                        <div>
                            <input
                                value={this.state.keyword}
                                onChange={(e) => { this.setState({ keyword: e.target.value }); }}
                            />
                            <button onClick={() => { this.setState({ visible: false }); }}>关闭 Popup</button>
                        </div>
                    }
                    animationType="slide-down"
                    onMaskClick={() => { this.setState({ visible: false }); }}
                    visible={this.state.visible}
                >
                    {null}
                </Popup>
            </div>
        )
    }
}
export default _Popup