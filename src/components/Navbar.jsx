import { ShoppingCart, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token") || "{}");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" h-20 grid grid-cols-12 gap-x-3 px-3 items-center">
      {/* Logo - tiêu đề */}
      <div className=" col-start-2 2xl:col-start-3 w-fit">
        <Link
          to="/"
          className=" text-[#9810fa] text-2xl font-extrabold text-left w-auto hover:cursor-pointer hover:opacity-80 duration-200"
        >
          ReactFood
        </Link>
      </div>
      {/* Điều hướng */}
      <div className="hidden col-start-6 col-end-8 lg:flex justify-center gap-6 font-semibold">
        <Link
          to="/"
          className="hover:font-bold text-white hover:text-[#9810fa] duration-300"
        >
          Trang chủ
        </Link>
        <Link
          to="/menu"
          className="hover:font-bold text-white hover:text-[#9810fa] duration-300"
        >
          Menu
        </Link>
      </div>
      {/* Đăng nhập */}
      <div className="col-start-10 col-end-12 2xl:col-start-9 2xl:col-end-11 justify-self-end flex flex-row gap-6 items-center">
        <button
          onClick={() => navigate("/cart")}
          className="flex flex-row p-2 rounded-full hover:cursor-pointer text-white  hover:bg-[#9810fa] duration-300"
        >
          <ShoppingCart />{" "}
        </button>

        {/* Desktop view */}
        <div className="hidden lg:block">
          {token.email ? (
            <div className="flex flex-row items-center gap-2">
              <span className="font-semibold text-white">{token.email}</span>
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
              className="px-4 py-2 font-semibold bg-[#9810fa] text-white rounded-tl-[10px] rounded-br-[10px] rounded-tr-sm rounded-bl-sm hover:cursor-pointer hover:opacity-70 duration-200"
            >
              Đăng nhập
            </button>
          )}
        </div>
        {/* Mobile view */}
        <div
          ref={menuRef}
          className="flex lg:hidden items-center gap-2 relative "
        >
          {token.email ? (
            <>
              {/* Icon menu */}
              <button onClick={handleToggle} className="p-2 text-white">
                <Menu size={24} />
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-4 flex flex-col gap-3 z-50">
                  <span className="font-semibold border-b border-gray-200 pb-2">
                    {token.email}
                  </span>
                  <div className="flex lg:hidden flex-col justify-center gap-3 font-semibold">
                    <Link to="/" className="duration-300">
                      Trang chủ
                    </Link>
                    <Link to="/menu" className="duration-300">
                      Menu
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      navigate("/login");
                    }}
                    className=" font-semibold text-[#c50000] rounded-md duration-200 flex items-center gap-2"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1.5 text-sm font-semibold bg-[#9810fa] text-white rounded-tl-md rounded-br-md hover:opacity-80 duration-200"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
