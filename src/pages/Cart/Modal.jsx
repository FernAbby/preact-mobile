import { h, Component } from 'preact';
import styles from './index.module.less';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.currentTarget.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { value } = this.state;
    // eslint-disable-next-line
    await this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { visible, onToggle } = this.props;
    const { value } = this.state;
    return (
      <div className={[styles['modal-wrap'], visible ? 'modal-visible' : ''].join(' ')}>
        <div
          className="modal-mask"
          onClick={() => onToggle(false)}
        />
        <div className="modal-body">
          <div className="modal-content">
            <div className="input-wrap">
              <input
                value={value}
                onChange={this.handleInputChange}
                type="text"
                placeholder="请输入商品编号"
              />
            </div>
            <button
              value="加入购物车"
              className="add-to-cart"
              onClick={this.handleSubmit}
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
