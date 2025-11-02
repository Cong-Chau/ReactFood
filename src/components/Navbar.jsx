import { ShoppingCart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token") || "{}");

  return (
    <div className=" h-20 grid grid-cols-12 gap-x-3 px-3 items-center">
      {/* Logo - tiêu đề */}
      <div className=" col-start-2 2xl:col-start-3 w-fit">
        <Link
          to="/"
          className="text-2xl font-extrabold text-left w-auto hover:cursor-pointer hover:text-[#EA6D27] duration-300"
        >
          ReactFood
        </Link>
      </div>
      {/* Điều hướng */}
      <div className="col-start-6 col-end-8 flex justify-center gap-6 font-semibold">
        <Link
          to="/"
          className="hover:font-bold hover:text-[#EA6D27] duration-300"
        >
          Trang chủ
        </Link>
        <Link
          to="/menu"
          className="hover:font-bold hover:text-[#EA6D27] duration-300"
        >
          Menu
        </Link>
      </div>
      {/* Đăng nhập */}
      <div className="col-start-10 col-end-12 2xl:col-start-9 2xl:col-end-11 justify-self-end flex flex-row gap-6 items-center">
        <button
          onClick={() => navigate("/cart")}
          className="flex flex-row p-2 rounded-full hover:cursor-pointer hover:text-white hover:bg-amber-600 duration-300"
        >
          <ShoppingCart />{" "}
        </button>

        {/* Nếu đã đăng nhập */}
        {token.email ? (
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">{token.email}</span>
            <button
              onClick={() => {
                sessionStorage.removeItem("token");
                navigate("/login");
              }}
              className="p-2 font-semibold text-[#c50000] rounded-full hover:cursor-pointer hover:bg-[#c50000] hover:text-white duration-200 mt-1"
            >
              <LogOut />
            </button>
          </div>
        ) : (
          // Nếu chưa đăng nhập
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 font-semibold bg-[#EA6D27] text-white rounded-tl-[10px] rounded-br-[10px] rounded-tr-sm rounded-bl-sm hover:cursor-pointer hover:opacity-70 duration-200"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
