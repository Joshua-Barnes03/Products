const app = require('../../server/app.js');
const axios = require('axios');

test('server is operational', () => {
  axios.get('localhost:3000/products')
  .then((response) => {
    expect(response).toBeDefined();
  })
  .catch((err) => {
    console.log(err);
  })
});

test('should return the requested number of products', () => {
  axios.get('localhost:3000/products?count=20')
  .then((response) => {
    expect(response).toHaveLength(20);
  })
  .catch((err) => {
    console.log(err);
  })
});

test('should return individual product queries in the right shape', () => {
  axios.get('localhost:3000/products/1')
  .then((response) => {
    expect(response.id).toBeDefined();
    expect(Array.isArray(response.features)).toBe(true);
    expect(response.features[0].feature).toBeDefined();
  })
  .catch((err) => {
    console.log(err);
  })
});

test('should return style queries in the right shape', () => {
  axios.get('localhost:3000/products/1/styles')
  .then((response) => {
    expect(response.product_id).toBeDefined();
    expect(Array.isArray(response.results)).toBe(true);
    expect(response.results[0].style_id).toBeDefined();
    expect(Array.isArray(response.results[0].photos)).toBeDefined();
    expect(typeof response.results[0].skus).toBe('object');
  })
  .catch((err) => {
    console.log(err)
  })
})