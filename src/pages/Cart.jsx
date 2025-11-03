import { Trash2, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartItem } from "../utils/cartUtils";

function Cart() {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setCarts(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCarts(getCart());
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateCartItem(id, quantity);
    setCarts(getCart());
  };

  const total = carts.reduce((sum, f) => sum + f.price * f.quantity, 0);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-12 gap-x-3 px-3 py-12">
      <div className="w-full col-start-2 col-end-12 2xl:col-start-3 2xl:col-end-11">
        <h1 className="font-bold text-3xl mb-8 text-[#9810fa]">
          Giỏ hàng của bạn
        </h1>
        <div className="flex flex-col lg:grid grid-cols-3 gap-6">
          {carts.length === 0 ? (
            <div className="p-8 rounded-md flex flex-col justify-center gap-4 col-span-3">
              <p className="text-center text-lg font-bold text-gray-700">
                Giỏ hàng trống ...
              </p>
              <div className="w-full flex justify-center">
                <button
                  onClick={() => navigate("/menu")}
                  className="px-4 py-2 font-semibold bg-[#9810fa] text-white rounded-tl-[10px] rounded-br-[10px] rounded-tr-sm rounded-bl-sm hover:cursor-pointer hover:opacity-70 duration-200"
                >
                  Chọn thêm món ăn
                </button>
              </div>
            </div>
          ) : (
            <div className="col-span-2 flex flex-col gap-4 ">
              {carts.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f4e5ff] flex flex-col gap-4 md:flex-row justify-between items-center p-4 border border-gray-100 rounded-md shadow-lg"
                >
                  <div className="w-full flex flex-row items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="font-bold text-xl">{item.name}</h2>
                      <p>{item.price.toLocaleString("vi-VN")}đ / Phần</p>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between md:justify-end gap-6">
                    <div className="flex flex-row">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 border border-gray-300 rounded-[3px] hover:bg-gray-200 hover:cursor-pointer text-2xl font-bold flex justify-center items-center"
                      >
                        <Minus size={16} />
                      </button>
                      <p className="w-14 h-8 text-center font-bold text-2xl">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-gray-300 rounded-[3px] hover:bg-gray-200 hover:cursor-pointer text-2xl font-bold flex justify-center items-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2  text-[#ff0000] rounded-sm hover:cursor-pointer hover:bg-[#ff0000] hover:text-white duration-200"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {carts.length > 0 && (
            <div className="bg-[#f4e5ff] col-start-3 col-span-1 h-[400px] border border-gray-100 rounded-md shadow-lg p-4">
              {/* Tổng tiền và nút thanh toán */}
              <h1 className="font-bold text-2xl mb-12">Tổng hợp</h1>
              <div className=" flex flex-col items-end gap-4 ">
                <div className="w-full flex justify-between">
                  <span className="text-right">Tổng cộng:</span>
                  <span className="font-bold text-lg text-right">
                    {total.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <span className="text-right">Phí giao hàng:</span>
                  <span className="font-bold text-lg text-right">20.000đ</span>
                </div>
                <div className="w-full border-t border-gray-600 pt-6">
                  <div className="flex justify-between bg-[#e9caff] p-4 rounded-sm">
                    <span className="text-right">Tổng thanh toán:</span>
                    <span className="font-extrabold text-xl text-[#9810fa] text-right">
                      {(total + 20000).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full px-4 py-2 bg-[#9810fa] text-white font-bold rounded-sm hover:opacity-80 duration-200 mt-6"
              >
                Thanh toán
              </button>
              <div className="w-full flex justify-center p-4">
                <button
                  onClick={() => navigate("/menu")}
                  className="mb-4 font-bold flex gap-2 w-fit hover:cursor-pointer hover:text-[#9810fa] duration-300"
                >
                  Tiếp tục chọn món
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
