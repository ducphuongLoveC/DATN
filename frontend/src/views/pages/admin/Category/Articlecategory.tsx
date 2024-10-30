const Articlecategory = () => {
  return (
    <>
     <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl shadow-lg">
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Tên danh mục
            </label>
            <input
              type="text"
              className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-500 transition duration-200"
              placeholder="Tên từ khóa danh mục"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Nhập nội dung của bạn ở đây"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:border-blue-400 transition duration-200"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Ảnh danh mục
            </label>
            <input
              type="file"
              className="border-solid border-2 border-gray-300 w-full py-2 bg-gray-50 rounded-lg px-3 focus:outline-none focus:border-blue-400 transition duration-200"
              placeholder="Thêm ảnh ở đây"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Thêm danh mục
            </button>
          </div>
        </form>
      </div>
  </>
  )
}

export default Articlecategory