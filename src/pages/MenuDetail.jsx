import { ShoppingCart, MoveLeft } from "lucide-react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";

function MenuDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("foods");
    if (stored) {
      const foods = JSON.parse(stored);
      const found = foods.find((f) => f.id == id);
      setFood(found);
    }
  }, [id]);

  if (!food) return <p className="w-full text-center">Đang tải món ăn...</p>;

  // Xử lý thêm vào giỏ hàng
  const handleAdd = () => {
    addToCart(food, quantity);
    alert("Đã thêm vào giỏ hàng!");
    console.log(JSON.parse(sessionStorage.getItem("cart")));
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-12 gap-x-3 px-3 py-12">
      <div className="w-full col-start-2 col-end-12 2xl:col-start-3 2xl:col-end-11 ">
        <div
          className="mb-4 font-bold flex gap-2 w-fit text-white hover:cursor-pointer hover:text-[#9810fa] duration-300"
          onClick={() => navigate(-1)}
        >
          <MoveLeft />
          <p>Quay lại</p>
        </div>
        <div className="bg-[#f4e5ff] flex flex-col lg:grid md:grid-cols-2 shadow-lg rounded-xl lg:h-9/10">
          {/* Ảnh */}
          <div className="h-full p-8">
            <img
              src={food.imageUrl}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Chi tiết */}
          <div className="flex flex-col justify-between items-start p-8">
            <div className="w-full">
              <p className="w-fit text-sm px-3 py-1 rounded-full text-[#9810fa] bg-[#e9caff] font-bold">
                {food.category === 1
                  ? "Món nước"
                  : food.category === 2
                  ? "Cơm"
                  : food.category === 3
                  ? "Khai vị"
                  : food.category === 4
                  ? "Tráng miệng"
                  : "Không xác định"}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold mt-8 mb-4">
                {food.name}
              </h1>
              <p className="mb-4">{food.description}</p>
            </div>
            <div className="w-full">
              {/* Giá */}
              <div className="bg-[#e9caff] p-4 rounded-tl-[10px] rounded-br-[10px] rounded-tr-sm rounded-bl-sm mb-4">
                <p className="text-gray-600">Giá</p>{" "}
                <p className="font-bold text-[#9810fa] text-4xl">
                  {food.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
              {/* Số lượng */}
              <div className="mb-6">
                <p className="mb-2">Số lượng</p>
                <div className="flex flex-row">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-[3px] hover:bg-gray-200 hover:cursor-pointer text-2xl font-bold"
                  >
                    -
                  </button>
                  <p className="w-16 h-10 text-center font-bold text-3xl">
                    {quantity}
                  </p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-[3px] hover:bg-gray-200 hover:cursor-pointer text-2xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Thêm vào giỏ hàng */}
              <div className="">
                <div
                  onClick={() => {
                    handleAdd();
                  }}
                  className="flex flex-row items-center justify-center gap-4 text-lg font-bold text-white bg-[#9810fa] px-4 py-2 rounded-sm hover:cursor-pointer hover:opacity-70 duration-200"
                >
                  <ShoppingCart size={20} />
                  <p>Thêm vào giỏ hàng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetail;
