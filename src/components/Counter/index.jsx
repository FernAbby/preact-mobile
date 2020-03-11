import { h, Component } from 'preact';
import styles from './index.module.less';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line
    if (nextProps.value != this.state.value) {
      this.setState({
        value: nextProps.value || 0
      });
    }
  }

  decrease = () => {
    const { value } = this.state;
    const { onChange, id, index } = this.props;
    if (value > 0) {
      this.setState({
        value: value - 1
      }, () => {
        // eslint-disable-next-line
        onChange && onChange(this.state.value, id, index);
      });
    }
  };

  increase = () => {
    const { value } = this.state;
    const { onChange, id, index } = this.props;
    this.setState({
      value: value + 1
    }, () => {
      // eslint-disable-next-line
      onChange && onChange(this.state.value, id, index);
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className={styles['counter-wrap']}>
        <span
          className={['counter-icon', styles['increase-icon']].join(' ')}
          onClick={this.increase}
        />
        <span className={styles['counter-value']}>{value}</span>
        <span
          className={['counter-icon', styles['decrease-icon']].join(' ')}
          onClick={this.decrease}
        />
      </div>
    );
  }
}

export default Counter;
