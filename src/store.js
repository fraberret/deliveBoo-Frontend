import { reactive } from 'vue'

export const store = reactive({
  localCart: JSON.parse(localStorage.getItem('cart')) || [],
  cartQuantity: 0
})