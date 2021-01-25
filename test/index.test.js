const testCart = require('./_cart');
const testOffice = require('./_office');
const testProduct = require('./_product');
const testUser = require('./_user');

describe('TESTING DIBUANG SAYANG SERVER', () => {
  testCart();
  testOffice();
  testProduct();
  testUser();
});
