import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    sessionStorage.setItem(
      "token",
      JSON.stringify({
        email: form.email,
      })
    );

    // Quay lại trang trước đó hoặc trang chủ
    navigate(-1);
    setLoading(false);
  };

  return (
    <div className="bg-[#020618] min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#f4e5ff] max-w-md flex flex-col gap-4 border border-gray-100 shadow-md rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center">Đăng nhập</h1>
        <p className="text-center text-gray-600 mb-4">
          Đăng nhập vào tài khoản{" "}
          <span className="font-semibold">ReactFood</span> của bạn
        </p>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#9810fa] outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#9810fa] outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3  rounded-md text-white font-semibold text-lg transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9810fa] hover:opacity-90 hover:cursor-pointer"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <div className="w-full flex justify-center">
          <button
            className="hover:cursor-pointer hover:underline text-[#9810fa] font-semibold"
            onClick={() => navigate("/")}
          >
            Tiếp tục mà không đăng nhập
          </button>
        </div>
        <div className="bg-blue-50 text-sm text-gray-700 p-4 rounded-md border border-blue-100 mt-2">
          <p className="font-semibold">Demo tài khoản:</p>
          <p>Email: demo@email1.com</p>
          <p>Mật khẩu: demo123</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
