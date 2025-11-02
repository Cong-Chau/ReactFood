import emailjs from "emailjs-com";
import { useState, useEffect } from "react";
import { getCart, clearCart } from "../utils/cartUtils";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    setCarts(getCart());
  }, []);

  const total = carts.reduce((sum, f) => sum + f.price * f.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const orderDetails = carts
      .map(
        (item) =>
          `${item.name} - SL: ${item.quantity} - ${(
            item.price * item.quantity
          ).toLocaleString("vi-VN")}đ`
      )
      .join("\n");

    const templateParams = {
      from_name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      note: form.note,
      cart_items: orderDetails,
      total: (total + 20000).toLocaleString("vi-VN"),
      to_email: "congchau206@gmail.com", // mail nhận
    };

    emailjs
      .send(
        "service_8sa66m5", // Service ID
        "template_6l40fff", // Template ID
        templateParams,
        "-FKVZGUgWuoz50e0N" // Public Key
      )
      .then(
        () => {
          alert("Đơn hàng đã được gửi thành công!");
          clearCart();
          setLoading(false);
          navigate("/");
        },
        (error) => {
          console.error(error);
          alert("Gửi đơn hàng thất bại!");
          setLoading(false);
          navigate("/");
        }
      );
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-12 gap-x-3 px-3 py-12">
      <div className="w-full col-start-2 col-end-12 2xl:col-start-3 2xl:col-end-11">
        <h1 className="font-bold text-3xl mb-8">Đặt hàng</h1>

        <div className="flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            className="col-span-2 flex flex-col gap-4 border border-gray-100 rounded-md shadow-lg p-4"
          >
            <h2 className="font-bold text-2xl">Thông tin giao hàng</h2>
            <label>
              <p>Họ và tên</p>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>
            <label>
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>
            <label>
              <p>Số điện thoại</p>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <label>
              <p>Địa chỉ giao hàng</p>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <label>
              <p>Ghi chú</p>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#EA6D27] text-white font-bold rounded-sm hover:opacity-80 duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang gửi đơn hàng...</span>
                </div>
              ) : (
                "Xác nhận đơn hàng"
              )}
            </button>
          </form>

          {/* Tóm tắt đơn hàng */}
          <div className="h-fit border border-gray-100 rounded-md shadow-lg p-4">
            <h1 className="font-bold text-2xl mb-4">Tóm tắt đơn hàng</h1>

            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
              {carts.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-right">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 mt-4 pt-2">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{total.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span>20.000đ</span>
              </div>
              <div className="flex justify-between font-bold text-[#EA6D27] mt-2">
                <span>Tổng cộng:</span>
                <span>{(total + 20000).toLocaleString("vi-VN")}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
