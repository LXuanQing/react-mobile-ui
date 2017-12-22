import PasswordInput from 'components/PasswordInput'
class _PasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            decrypted: true,
        };
    }
    handleChange(value) {
        this.setState({
            value,
        });
    }
    
    handleDecryptedToggle(decrypted) {
        this.setState({
            decrypted,
        });
    }
    render() {
        return (
            <PasswordInput
                // hideIcon
                placeholder="请输入密码"
                value={this.state.value}
                decrypted={this.state.decrypted}
                onChange={(value) => { this.handleChange(value); }}
                onDecryptedChange={(decrypted) => { this.handleDecryptedToggle(decrypted); }}
            />
        )
    }
}
export default _PasswordInput