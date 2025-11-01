import { ArrowRight, Facebook, Instagram, Earth } from "lucide-react";
import bannerImg from "../assets/images/banner.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-12 gap-x-3 px-3 items-center">
      <div className="w-full col-start-2 col-end-12 2xl:col-start-3 2xl:col-end-11 flex flex-row justify-between">
        {/* Bên trái */}
        <div className="pt-14">
          <h1 className="font-extrabold text-4xl">Chào mừng đến với</h1>
          <h2 className="font-extrabold text-6xl bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent mt-4 mb-8">
            React Food
          </h2>
          <p className="max-w-2xl">
            Những món ăn ngon tuyệt vời được chuẩn bị tươi mới mỗi ngày!
          </p>
          <p className="max-w-xl 2xl:max-w-2xl">
            Khám phá bộ sưu tập các món ăn đặc biệt của chúng tôi, từ burger
            juicy, pizza nóng hổi đến các món salad tươi mát. Đặt hàng ngay hôm
            nay và tận hưởng bữa ăn ngon miệng!
          </p>
          <button
            onClick={() => {
              navigate("menu");
            }}
            className="mt-20 mb-6 px-4 py-2 font-semibold bg-[#101A24] text-white rounded-tl-[10px] rounded-br-[10px] rounded-tr-sm rounded-bl-sm hover:cursor-pointer hover:opacity-80 duration-200"
          >
            Menu <ArrowRight className="inline-block ml-2" />
          </button>
          {/* Mạng xã hội */}
          <div className="flex flex-row gap-4">
            <div className="p-2 rounded-full border-2 hover:bg-black hover:text-white duration-300">
              <Facebook size={22} />
            </div>
            <div className="p-2 rounded-full border-2 hover:bg-black hover:text-white duration-300">
              <Instagram size={22} />
            </div>
            <div className="p-2 rounded-full border-2 hover:bg-black hover:text-white duration-300">
              <Earth size={22} />
            </div>
          </div>
        </div>
        {/* Bên phải */}
        <div className="max-w-xl mt-4">
          <img
            src={bannerImg}
            alt=""
            className="min-h-[70vh] object-cover rounded-tl-[50px] rounded-br-[50px] rounded-tr-[10px] rounded-bl-[10px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
