
import { Link } from 'react-router-dom';
const Category = () => {
  return (
    <>
  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 px-4 py-8">
  <div className="bg-white border  shadow-lg px-8 py-6 max-w-2xl w-full">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Danh mục khóa học</h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Danh mục khoá học: Đây là danh mục chứa các khóa học được phân loại theo các lĩnh vực hoặc chuyên đề khác nhau. Ví dụ, một danh mục khóa học có thể bao gồm các lĩnh vực như lập trình, thiết kế, kinh doanh, hoặc kỹ năng mềm. Điều này giúp người học dễ dàng tìm kiếm và chọn lựa khóa học theo sở thích hoặc nhu cầu học tập của họ.
    </p>
    <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold  px-4 py-2 transition duration-200">
      Xem thêm
    </button>
  </div>
  <div className="bg-white border  shadow-lg px-8 py-6 max-w-2xl w-full">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Danh mục bài viết</h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Danh mục bài viết: Đây là danh mục bao gồm các chủ đề hoặc chuyên mục khác nhau mà bài viết trên một trang web hoặc blog thuộc về. Các bài viết có thể được phân loại theo chủ đề cụ thể như tin tức, hướng dẫn, đánh giá sản phẩm, hoặc các bài viết thuộc các lĩnh vực khác nhau như công nghệ, giáo dục, sức khỏe, v.v.
    </p>
    <Link to="/categorys/article" type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold  px-4 py-2 transition duration-200">
      Xem thêm
    </Link>
  </div>
</div>

    </>   
   
  )
}

export default Category