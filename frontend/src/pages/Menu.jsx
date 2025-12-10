import { useEffect, useState, useContext } from "react";
import { API } from "../utils/api";
import { CartContext } from "../context/CartContext";

export default function Menu() {
  const [items, setItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/menu");
      setItems(res.data);
    };
    load();
  }, []);

  const categories = [...new Set(items.map((i) => i.category || "Others"))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Menu</h1>

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-yellow-300">{cat}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {items
              .filter((i) => (i.category || "Others") === cat)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-black/70 border border-yellow-500/40 rounded p-4 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-yellow-200">{item.name}</h3>
                    <p className="text-sm text-gray-300">
                      ₹{item.price}
                      {item.priceHalf && ` | Half: ₹${item.priceHalf}`}
                      {item.priceFull && ` | Full: ₹${item.priceFull}`}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
