import React from 'react';
import BannerArtile from './BannerArtile';

const DetailArticle = () => {
  return (
    <>
      <BannerArtile />
      <div className="max-w-7xl mx-auto my-8 px-2">
        <div className="flex">
          <div className="flex">
            <div className="w-3/10  p-6 space-y-6">
              <div className="bg-black text-white p-4 rounded-md">
                <h2 className="text-2xl text-center">DevsHunt360</h2>
              </div>

              <ul className="space-y-4">
                <li>
                  <a href="" className="text-black-600 hover:underline">
                    Ưu đãi khuyến mãi
                  </a>
                </li>
                <li>
                  <a href="" className="text-black-600 hover:underline">
                    News
                  </a>
                </li>
                <li>
                  <a href="" className="text-black-600 hover:underline">
                    Mua khóa học
                  </a>
                </li>
                <li>
                  <a href="" className="text-black-600 hover:underline">
                    Chi tiết lộ trình
                  </a>
                </li>
              </ul>

              <div className="space-y-4">
                <a className="relative" href="">
                  <img
                    className="rounded-md mb-4 h-auto w-full object-cover aspect-video"
                    src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt=""
                  />
                </a>

                <a className="relative" href="">
                  <img
                    className="rounded-md w-full object-cover aspect-video"
                    src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="w-7/10   p-4">
            <div className="flex m-3 text-2xl md:text-3xl font-bold">
              Mình đã làm thế nào để hoàn thành một website chỉ trong 15 ngày
            </div>
            <div className="flex flex-wrap items-center justify-start text-sm gap-2">
              <li
                title="Pricing type"
                className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                <span>10/10/2024</span>
              </li>

              <li
                title="Support for API"
                className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
                <span>Chat</span>
              </li>
              <p className="text-gray-600 ">
                Bài viết này sẽ bao gồm các phần như sau: <br />1 - Tại sao mình
                lại làm một dự án trong một thời gian ngắn như vậy? 2 - Lúc mất
                dữ liệu mình ra sao? 3 - Cách mình đã làm để hoàn thành dự án
                chỉ trong 15 ngày. 1. Tại sao mình lại làm một dự án trong một
                thời gian ngắn như vậy?  Lí do mình làm một dự án trong thời
                gian ngắn như vậy là gì một số lỗi trong quá trình xây dựng mà
                gần đến ngày dự thi. Laptop của mình vào một ngày đẹp trời thì
                bị hỏng (mình không dùng github) nên tất cả code cũng bay theo
                hư vô khi laptop được sửa và trở lại bình thường mặc dù đã ra
                sức khôi phục dữ liệu. 2. Lúc mất dữ liệu mình ra sao?  Lúc mất
                dữ liệu là mình đã sắp hoàn thành dự án rồi (chỉ còn phần tin
                tức nữa là xong). Nên là mình bị suy sụp và buồn trong một
                khoảng thời gian 2 ngày. Mình định bỏ cuộc nhưng lý trí không
                cho và bắt buộc mình phải ngồi lại chiếc bàn học cùng với chiếc
                laptop và bàn phím bắt đầu code một trang web mới giống với cái
                cũ. 3. Cách mình đã làm để hoàn thành dự án chỉ trong 15 ngày.
                3.1. Lên kế hoạch, thiết kế logo, thiết kế layout, chuẩn bị nội
                dung cho dự án (5 ngày)  Mình đã lên kế hoạch cho dự án, phác
                thảo một khung sườn website cơ bản và ghi chú những mục nào có
                trên thanh menu. Thiết kế logo cho trang web bằng canva. Sau đó
                vẽ ra layout cho từng trang để dựa vào đó và code. Quá trình
                chuẩn bị nội dung là lâu nhất, mình đã chuẩn bị toàn bộ nội dung
                Ngữ văn 9 để vào file word. 3.2 Code giao diện cho từng trang (2
                ngày)  Từ những gì đã vạch ra mình bắt đầu code giao diện cho
                từng trang trên thanh menu như Trang chủ, Giới thiệu, Học văn,
                Soạn văn, Tài liệu,... 3.3 Đưa nội dung lên website (5 ngày)  Từ
                những nội dung có sẵn trong file word mình bắt đầu copy và dán
                vào giao diện đã tạo trước đó. Vì số lượng khá nhiều nên quá
                trình này phải mất đến 7 ngày để đưa toàn bộ nội dung lên
                website. 3.4 Phát sinh thêm một số tính năng do quá trình thực
                hiện nảy sinh ra ý tưởng mới (1 ngày)  Trong quá trình mình code
                thì mình đã nảy sinh ra những ý tưởng và bắt đầu thực hiện luôn,
                quá trình này mình làm rất nhanh chỉ 1 ngày là hoàn thành (mình
                làm từ 6:00 sáng cho đến 0:00 tối). 3.5 Đưa website lên hosting
                (1 ngày)  Sau khi đã hoàn thành hết mọi công việc thì mình bắt
                đầu đẩy hết code lên hosting. Vì hosting miễn phí nên không gian
                lưu trữ không đủ mình phải tạo nhiều kho lưu trữ khác và chia ra
                để lưu trữ nên quá trình upload code lên hosting mình làm tận 1
                ngày. 3.6 Sửa lỗi xảy ra sau khi upload code và chạy thử nghiệm
                (1 ngày)  Mọi chuyện không bao giờ đơn giản như chúng ta nghĩ,
                khi upload lên hosting chạy thử nghiệm thì trang web bị lỗi ở
                một số chỗ nên mình phải sửa lại. Sau khi hoàn thành mình đăng
                công khai và share web trên trang cá nhân để mọi người đều thấy
                và truy cập web. Cảm ơn mọi người đã đọc!
              </p>
            </div>
          </div>
        </div>
        <div className="flex m-3 text-2xl md:text-3xl font-bold">
          <h3 className="">Bài viết nổi bật </h3>
        </div>
        <ul className="grid gap-8 sm:grid-cols-3 lg:grid-cols-3 p-2 xl:p-5">
          <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-teal-400">
            <a className="relative" href="">
              <img
                className="rounded relative w-full object-cover aspect-video"
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt=""
              />
            </a>
            <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
              <a
                href=""
                className="flex justify-center items-center text-xl font-semibold text-black-700 hover:text-teal-800 two-lines text-ellipsis"
              >
                <h5>
                  Mình đã làm thế nào để hoàn thành một website chỉ trong 15
                  ngày
                </h5>
              </a>
              <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                <li
                  title="Pricing type"
                  className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <span>10/10/2024</span>
                </li>

                <li
                  title="Support for API"
                  className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>

                  <span>Chat</span>
                </li>
              </ul>
              <p className="text-gray-600 two-lines">
                Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng
                và bắt đầu thực hiện luôn, quá trình này.
              </p>
            </div>
          </li>

          <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-teal-400">
            <a className="relative" href="">
              <img
                className="rounded relative w-full object-cover aspect-video"
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt=""
              />
            </a>
            <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
              <a
                href=""
                className="flex justify-center items-center text-xl font-semibold text-black-700 hover:text-teal-800 two-lines text-ellipsis"
              >
                <h5>
                  Mình đã làm thế nào để hoàn thành một website chỉ trong 15
                  ngày
                </h5>
              </a>
              <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                <li
                  title="Pricing type"
                  className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <span>10/10/2024</span>
                </li>

                <li
                  title="Support for API"
                  className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>

                  <span>Chat</span>
                </li>
              </ul>
              <p className="text-gray-600 two-lines">
                Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng
                và bắt đầu thực hiện luôn, quá trình này.
              </p>
            </div>
          </li>

          <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-teal-400">
            <a className="relative" href="">
              <img
                className="rounded relative w-full object-cover aspect-video"
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt=""
              />
            </a>
            <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
              <a
                href=""
                className="flex justify-center items-center text-xl font-semibold text-black-700 hover:text-teal-800 two-lines text-ellipsis"
              >
                <h5>
                  Mình đã làm thế nào để hoàn thành một website chỉ trong 15
                  ngày
                </h5>
              </a>
              <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                <li
                  title="Pricing type"
                  className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <span>10/10/2024</span>
                </li>

                <li
                  title="Support for API"
                  className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>

                  <span>Chat</span>
                </li>
              </ul>
              <p className="text-gray-600 two-lines">
                Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng
                và bắt đầu thực hiện luôn, quá trình này.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DetailArticle;
