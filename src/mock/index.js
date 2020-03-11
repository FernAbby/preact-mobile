/* eslint-disable */
import Mock from 'mockjs';

const Random = Mock.Random;

// Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;

Mock.setup({
  timeout: '1000-3000',
});

/* const generateProducts = Mock.mock({
  'list|10-20': [{
    'id|+1': 1,
    'picture': Random.dataImage('100x100', Random.color()),
    'title': Random.ctitle() + '  @id',
    'price': Random.natural(100, 1000),
  }]
});

const getProductList = Mock.mock({
  'success': true,
  'data': generateProducts
});

const getCartList = Mock.mock({
  'success': true,
  'data': {
    'list|3-10': [{
      'id|+1': 1,
      'picture': Random.dataImage('100x100', Random.color()),
      'title': Random.ctitle() + '  @id',
      'price': Random.natural(100, 1000),
      'quality': Random.natural(1, 3)
    }]
  }
}); */

function generateProducts() {
  const length = Random.natural(10, 20);
  let count = 0;
  const products = [];
  const cartList = [];
  while(count <= length) {
    const productItem = Mock.mock({
      id: '@id',
      picture: Random.dataImage('100x100', Random.color()),
      title: Random.ctitle(),
      price: Random.natural(100, 1000),
    });
    products.push(productItem);
    count ++;
    if (Random.boolean()) {
      cartList.push({ ...productItem, quality: Random.natural(1, 3) });
    }
  }

  return { products, cartList };
}

const { products, cartList } = generateProducts();

console.log('产品列表=>', products);
console.log('购物车=>', cartList);

const getProducts = (options) => {
  const { id } = JSON.parse(options.body);
  return {
    success: true,
    data: id ? (products || []).filter(item => item.id == id) : []
  }
};

const getCartList = () => {
  return {
    success: true,
    data: {
      list: cartList,
      total: cartList.reduce((prev, item) => (item.price * item.quality) + prev, 0)
    }
  }
};

// Mock.mock(/http:\/\/localhost:8086\/cart\/list/, 'get', getProductList);
Mock.mock(/(.*?)\/product\/list/, 'get', getProducts);
Mock.mock(/(.*?)\/cart\/list/, 'get', getCartList);
