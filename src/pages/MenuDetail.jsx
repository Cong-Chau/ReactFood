import { ShoppingCart } from "lucide-react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

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

  if (!food) return <p>Đang tải món ăn...</p>;

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-12 gap-x-3 px-3 py-12">
      <div className="bg-gray-100 w-full col-start-2 col-end-12 2xl:col-start-3 2xl:col-end-11 shadow-lg rounded-xl grid grid-cols-2">
        {/* Ảnh */}
        <div className="h-full p-8">
          <img
            src={food.imageUrl}
            alt=""
            className="w-full h-full max-h-[500px] object-cover rounded-lg"
          />
        </div>
        {/* Chi tiết */}
        <div className="flex flex-col justify-between items-start p-8">
          <div className="w-full">
            <p className="w-fit text-sm px-3 py-1 rounded-full text-[#EA6D27] bg-[#ffe8db] font-bold">
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
            <h1 className="text-5xl font-bold my-8">{food.name}</h1>
            <p>{food.description}</p>
          </div>
          <div className="w-full">
            {/* Giá */}
            <div className="bg-[#ffece2] p-4 rounded-tl-[10px] rounded-br-[10px] rounded-tr-sm rounded-bl-sm mb-4">
              <p className="text-gray-600">Giá</p>{" "}
              <p className="font-bold text-[#EA6D27] text-4xl">
                {food.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
            {/* Số lượng */}
            <div className="mb-6">
              <p className="mb-2">Số lượng</p>
              <div className="flex flex-row">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-[3px] hover:bg-gray-200 text-2xl font-bold"
                >
                  -
                </button>
                <p className="w-16 h-10 text-center font-bold text-3xl">
                  {quantity}
                </p>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-[3px] hover:bg-gray-200 text-2xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
            {/* Thêm vào giỏ hàng */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => navigate(-1)}
                className="flex flex-row items-center justify-center gap-4 text-lg font-bold text-white bg-[#c7c7c7] px-4 py-2 rounded-sm hover:cursor-pointer hover:opacity-70 duration-200"
              >
                Quay lại
              </div>
              <div className="flex flex-row items-center justify-center gap-4 text-lg font-bold text-white bg-[#EA6D27] px-4 py-2 rounded-sm hover:cursor-pointer hover:opacity-70 duration-200">
                <ShoppingCart size={20} />
                <p>Thêm vào giỏ hàng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetail;
