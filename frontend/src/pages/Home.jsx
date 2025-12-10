export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <section className="bg-black/70 border border-yellow-500/40 rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-yellow-400">
          Welcome to Hotel Chandra Bharti
        </h1>
        <p className="text-gray-200">
          Enjoy delicious veg and non-veg dishes, tandoor, South Indian and more in a
          premium ambience.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="bg-black/70 border border-yellow-500/40 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-yellow-300">Chef&apos;s Specials</h2>
          <p className="text-gray-200 text-sm">
            Paneer Butter Masala, Chicken Tikka, Hyderabadi Biryani and signature desserts.
          </p>
        </div>
        <div className="bg-black/70 border border-yellow-500/40 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-yellow-300">Family Friendly</h2>
          <p className="text-gray-200 text-sm">
            Perfect place for family dinners, parties and celebrations.
          </p>
        </div>
        <div className="bg-black/70 border border-yellow-500/40 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-yellow-300">Easy Reservation</h2>
          <p className="text-gray-200 text-sm">
            Browse the menu, add to cart and send your table booking directly on WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
