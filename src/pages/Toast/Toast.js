import { Component } from 'react';
import Toast from 'components/Toast'
export default class _Toast extends Component {

    showToast (options) {
        Toast.show(options);
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    Toast.show({
                        type: 'loading',
                        content: '提交成功你好好',
                        autoHide: false
                    })
                    setTimeout(() => {
                        console.log("完成")
                        Toast.hide(() => {
                            console.log("hide")
                        })
                    },5000)
                }}>loading</button>
                <button onClick={() => {
                    this.showToast({
                        type: 'success',
                        content: '提交成功',
                        onDidHide() {
                            console.log('success tip is hidden');
                        }
                    })
                }}>成功</button>
                <button onClick={() => {
                    this.showToast({
                        content: "文本类型字字字字字字字字字字字字字字字"
                    })
                }}>文本</button>
                <button onClick={() => {
                    this.showToast({
                        content: "带遮罩层",
                        hasMask: true,
                        duration: 2000
                    })
                }}>Mask</button>
                <button onClick={() => {
                    this.showToast({
                        content: "这是一句轻提示这是一句轻提示",
                        duration: 2000,
                        type: 'light',
                        // autoHide: false,
                        transitionName: 'fix-top',
                    })
                }}>轻提示</button>
            </div>
            
        )
    }
}
