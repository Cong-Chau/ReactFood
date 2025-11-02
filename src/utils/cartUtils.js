// Lấy giỏ hàng từ sessionStorage
export function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng
export function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Thêm món vào giỏ
export function addToCart(item, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((f) => f.id === item.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  saveCart(cart);
}

// Cập nhật số lượng món trong giỏ
export function updateCartItem(id, quantity) {
  const cart = getCart();
  const updated = cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  saveCart(updated);
}

// Xóa món khỏi giỏ
export function removeFromCart(id) {
  const cart = getCart().filter((f) => f.id !== id);
  saveCart(cart);
}

// Xóa toàn bộ giỏ hàng
export function clearCart() {
  sessionStorage.removeItem("cart");
}
