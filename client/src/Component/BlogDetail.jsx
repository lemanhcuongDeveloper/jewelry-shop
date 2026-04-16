import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => b.id == id);
        setBlog(found);
      });
  }, [id]);

  if (!blog) return <p className="p-6">Đang tải...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
<Header/>
      <img
        src={blog.image}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
<Footer/>
    </div>
  );
}