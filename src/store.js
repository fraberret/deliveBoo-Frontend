import { reactive } from 'vue'

export const store = reactive({
  localCart: JSON.parse(localStorage.getItem('cart')) || [],
  cartQuantity: 0,
  grandTotal() {
    let total = 0;
    for (let item of this.localCart) {
      total += item.quantity * item.price;
    }
    return total;
  }
})