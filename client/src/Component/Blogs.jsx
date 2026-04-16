import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:5000/blogs")
    fetch("https://jewelry-shop-xz6e.onrender.com/blogs")
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <Header/>
      <h1 className="text-3xl font-bold mb-6 text-black-500">
        Blog Trang Sức
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {blogs.map((b) => (
          <Link
            to={`/blog/${b.id}`}
            key={b.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={b.image}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">
                {b.title}
              </h2>

              <p className="text-gray-500 text-sm line-clamp-3">
                {b.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
<Footer/>
    </div>
    
  );
}