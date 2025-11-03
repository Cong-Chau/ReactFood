import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="bg-[#020618]">
      <Navbar />
      <main className="">
        <Outlet /> {/* Nơi render Home, MenuList, MenuDetail */}
      </main>
    </div>
  );
}
