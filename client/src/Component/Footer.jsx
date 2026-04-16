export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Cột 1 */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">
            Jewelry Shop
          </h2>
          <p className="text-sm">
            Chuyên cung cấp trang sức cao cấp, thiết kế tinh xảo và sang trọng.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">
            Sản phẩm
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Nhẫn</li>
            <li className="hover:text-white cursor-pointer transition">Dây chuyền</li>
            <li className="hover:text-white cursor-pointer transition">Bông tai</li>
            <li className="hover:text-white cursor-pointer transition">Vòng tay</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">
            Hỗ trợ
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Chính sách bảo hành</li>
            <li className="hover:text-white cursor-pointer transition">Hướng dẫn mua hàng</li>
            <li className="hover:text-white cursor-pointer transition">Thanh toán</li>
            <li className="hover:text-white cursor-pointer transition">Vận chuyển</li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">
            Liên hệ
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">📍 TP.HCM</li>
            <li className="hover:text-white transition">📞 0123 456 789</li>
            <li className="hover:text-white transition">📧 support@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2026 Jewelry Shop. All rights reserved.
      </div>
    </footer>
  );
}