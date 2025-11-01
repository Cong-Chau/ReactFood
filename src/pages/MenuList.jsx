import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MenuList() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filterFoods, setFilterFoods] = useState([]);
  const [selected, setSelected] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    if (foods.length > 0) {
      setFilterFoods(foods);
    }
  }, [foods]);

  useEffect(() => {
    // Lay categtory
    fetch(
      `https://raw.githubusercontent.com/Cong-Chau/mock-api/refs/heads/main/categories.json`
    )
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
    // Lay foods
    fetch(
      `https://raw.githubusercontent.com/Cong-Chau/mock-api/refs/heads/main/foods_v2.json?nocache=${Date.now()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        sessionStorage.setItem("foods", JSON.stringify(data));
      })
      .catch((error) => console.error("Error fetching foods:", error));
  }, []);

  const handleFilterFoods = (categoryID) => {
    if (categoryID == "all") {
      setFilterFoods(foods);
    } else {
      const filtered = foods.filter((food) => food.category == categoryID);
      setFilterFoods(filtered);
    }
    setSelected(categoryID);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-12 gap-x-3 px-3">
      <div className="w-full col-start-2 col-end-12 2xl:col-start-3 2xl:col-end-11 flex flex-col">
        {/* Search */}
        <div className="w-full flex flex-row items-center mt-8 border border-gray-400 rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-full outline-none ring-0 border-none bg-transparent"
          />
        </div>
        {/* Category */}
        <div className="w-full flex flex-row items-center mt-4 gap-4 overflow-x-auto pb-2">
          <div
            onClick={() => {
              handleFilterFoods("all");
            }}
            className={`py-2 px-4 select-none border-2 rounded-full hover:cursor-pointer ${
              selected == "all"
                ? "border-[#EA6D27] bg-[#EA6D27] text-white"
                : "border-gray-300 hover:border-[#EA6D27]"
            }`}
          >
            Tất cả
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                handleFilterFoods(category.id);
              }}
              className={`py-2 px-4 select-none border-2 rounded-full hover:cursor-pointer ${
                selected == category.id
                  ? "border-[#EA6D27] bg-[#EA6D27] text-white"
                  : "border-gray-300 hover:border-[#EA6D27]"
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
        {/* Foods */}
        <div className="mt-8 grid grid-cols-5 gap-4">
          {filterFoods
            .filter((food) => food.status == "AVAILABLE")
            .map((food) => (
              <div
                key={food.id}
                onClick={() => {
                  navigate(`${food.id}`);
                }}
                className=" bg-gray-100 shadow-lg rounded-xl flex flex-col items-center justify-between overflow-hidden group mb-8 pb-4 hover:cursor-pointer hover:scale-105 duration-200"
              >
                <div>
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="mt-2 font-semibold text-lg px-4">
                      {food.name}
                    </h1>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm px-4">
                      {food.description}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center w-full flex flex-row justify-between items-end px-4">
                  <p className="font-bold text-[#EA6D27] text-2xl">
                    {food.price.toLocaleString("vi-VN")}đ
                  </p>
                  <p className="text-sm px-2 py-1 rounded-full text-[#EA6D27] bg-[#ffe8db]">
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
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MenuList;
