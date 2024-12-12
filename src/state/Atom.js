import { atom } from "recoil";

export const productState =atom({
  key: 'product_id',
  default: '',
});
 
export const productDetails=atom({
  key: 'name',
  default:'',
});



