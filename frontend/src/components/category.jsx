import car from "../assets/image/car.jpg";
import house from "../assets/image/house.jpg";
import construction from "../assets/image/construction.jpg";

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      title: "Cars",
      description: "Find the best cars for your needs. Explore a wide range of options tailored just for you.",
      image: car,
      link: "#cars",
    },
    {
      id: 2,
      title: "House",
      description: "Find your dream home or sell your property with ease. Trusted and transparent options available.",
      image: house,
      link: "#house",
    },
    {
      id: 3,
      title: "Construction Vehicles",
      description: "Access reliable construction vehicles for your projects. Explore top-quality services.",
      image: construction,
      link: "#construction-vehicles",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Explore Our Categories
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold mb-2">
                  {category.title}
                </h3>
                <p className="mb-4 text-gray-100">{category.description}</p>
                <a
                  href={category.link}
                  className="text-indigo-400 font-medium hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;