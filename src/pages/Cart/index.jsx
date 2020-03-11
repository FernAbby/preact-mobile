import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import fetch from '../../utils/request';
import Counter from '../../components/Counter/index.jsx';
import Modal from './Modal';
import styles from './index.module.less';
import defaultImage from '../../assets/images/default-image-icon.svg';
import '../../mock/index';

@connect(({ counter }) => ({
  counter
}), dispatch => ({ dispatch }))
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartList: [],
      cartProductIds: [],
      totalPrice: 0,
      modalVisible: false,
      lock: false
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    fetch({ url: '/cart/list' }).then((data) => {
      const { list, total } = data;
      this.setState({
        cartList: list,
        cartProductIds: list.map(item => item.id),
        totalPrice: total
      });
    });
  };

  fetchProduct = (id, callback) => {
    fetch({
      url: '/product/list',
      data: { id }
    }).then(callback);
  };

  calculateSum = (data) => {
    return data.reduce((prev, item) => prev + (item.quality * item.price), 0);
  };

  handleCounterChange = (quality, id, index) => {
    const { cartList } = this.state;
    cartList[index].quality = quality;
    this.setState({
      cartList: [...cartList],
      totalPrice: this.calculateSum(cartList)
    });
  };

  /*setCounter = () => {
    const { dispatch, counter, item: { quality } } = this.props;
    const { value } = this.state;
    dispatch({
      type: 'setCounter',
      payload: {
        counter: {
          ...counter,
          [item.id]: {
            quality: value,
            price: item.price
          }
        }
      }
    });
  }; */

  handleToggleVisible = (visible) => {
    this.setState({
      modalVisible: visible
    });
  };

  handleSubmit = (value) => {
    const { cartProductIds, lock, cartList: oldCartList } = this.state;
    if (value && !lock) {
      let cartList = JSON.parse(JSON.stringify(oldCartList));
      this.setState({ lock: true });
      return new Promise((resolve) => {
        this.fetchProduct(value, (data) => {
          if (data && data.length) {
            const index = cartProductIds.indexOf(value);
            if (index >= 0) {
              cartList[index].quality += 1;
            } else {
              cartList = [...cartList, ...data];
            }
          }
          this.setState({
            cartList,
            modalVisible: false,
            lock: false
          });
          resolve();
        });
      });
    }
  };

  render() {
    const { cartList, totalPrice, modalVisible } = this.state;
    return (
      <div className={styles['page-cart']}>
        <header>
          <h1>购物车</h1>
          <div
            className={styles['add-button']}
            onClick={() => {
              this.handleToggleVisible(true);
            }}
          />
        </header>
        <section className={[styles['product-list'], modalVisible ? 'no-scroll' : ''].join(' ')}>
          {
            cartList.map((product, index) => (
              <div key={product.id} className="product-item">
                <div className="left-image">
                  <img src={product.picture || defaultImage} alt="图片" />
                </div>
                <div className="right-info">
                  <div className="item-info">
                    <span className="item-name">{product.title}</span>
                    <span className="item-price">￥{product.price}</span>
                  </div>
                  <Counter
                    id={product.id}
                    value={product.quality}
                    index={index}
                    onChange={this.handleCounterChange}
                  />
                </div>
              </div>
            ))
          }
        </section>
        <footer className={styles['cart-footer']}>
          <div className="footer-left">
            <div className="price">总价：<span>￥{totalPrice}</span></div>
            <div className="remark">包邮</div>
          </div>
          <div className="footer-right">￥{totalPrice}</div>
        </footer>
        <Modal
          visible={modalVisible}
          onToggle={this.handleToggleVisible}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

/*export default connect((state) => ({
    counter: state.counter
  }), (dispatch) => ({dispatch}))(Cart);*/
export default Cart;
