import { Component } from 'react';
import {HBox,VBox} from 'components/Boxs'
export default class _Boxs extends Component {
    render() {
        return (
            <div>
                <HBox>
                    <h1>图标</h1>
                    <div>信息HBox</div>
                </HBox>
                <VBox>
                    <h1>图标</h1>
                    <div>信息VBox</div>
                </VBox>
            </div>
        )
    }
}
