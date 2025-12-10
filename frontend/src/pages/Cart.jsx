import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, updateQty, removeFromCart, total } = useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-200">
          Cart is empty.{" "}
          <Link to="/menu" className="text-yellow-300">
            Go to menu
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {items.map((it) => (
              <li
                key={it._id}
                className="bg-black/70 border border-yellow-500/40 rounded p-3 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-yellow-200">{it.name}</div>
                  <div className="text-sm text-gray-300">
                    ₹{it.price} x {it.qty} = ₹{it.price * it.qty}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(it._id, it.qty - 1)}
                    className="px-2 border border-yellow-600 rounded"
                  >
                    -
                  </button>
                  <span className="text-yellow-200">{it.qty}</span>
                  <button
                    onClick={() => updateQty(it._id, it.qty + 1)}
                    className="px-2 border border-yellow-600 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(it._id)}
                    className="text-red-400 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <div className="font-semibold text-yellow-300">Total: ₹{total}</div>
            <Link
              to="/table-booking"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            >
              Book Table via WhatsApp
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
