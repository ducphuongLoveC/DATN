import React from 'react'

const Article = () => {
  return (
   <>
   <div className="max-w-7xl mx-auto my-8 px-2">

<div className="flex">

  <div className="flex">

  <div className="w-3/10  p-6 space-y-6">
  
    <div className="bg-black text-white p-4 rounded-md">
      <h2 className="text-2xl text-center">DevsHunt360</h2>
    </div>

 
    <ul className="space-y-4">
      <li> 
        <a href="" className="text-black-600 hover:underline">Ưu đãi khuyến mãi</a>
      </li>
      <li> 
        <a href="" className="text-black-600 hover:underline">News</a>
      </li>
      <li> 
        <a href="" className="text-black-600 hover:underline">Mua khóa học</a>
      </li>
      <li> 
        <a href="" className="text-black-600 hover:underline">Chi tiết lộ trình</a>
      </li>
    </ul>

    {/* Hình ảnh minh họa */}
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

  <div className="w-7/10  p-4">
  <div className="flex m-3 text-2xl md:text-3xl font-bold">
    Bài viết
</div>
 <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 p-2 xl:p-5">
    <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-teal-400">

        <a className="relative" href="">
            <img className="rounded relative w-full object-cover aspect-video"
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" />
        </a>
        <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
            <a href=""
                className="flex justify-center items-center text-xl font-semibold text-black-700 hover:text-teal-800 two-lines text-ellipsis">
                <h5>Mình đã làm thế nào để hoàn thành một website chỉ trong 15 ngày</h5>
               
            </a>
            <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                <li title="Pricing type"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

                    <span>10/10/2024</span>
                </li>

                <li title="Support for API"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>

                    <span>Chat</span>
                </li>
            </ul>
            <p className="text-gray-600 two-lines">
            Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng và bắt đầu thực hiện luôn, quá trình này.
            </p>
        </div>

    </li>
   
    <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-teal-400">

        <a className="relative" href="">
            <img className="rounded relative w-full object-cover aspect-video"
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" />
        </a>
        <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
            <a href=""
                className="flex justify-center items-center text-xl font-semibold text-black-700 hover:text-teal-800 two-lines text-ellipsis">
                <h5>Mình đã làm thế nào để hoàn thành một website chỉ trong 15 ngày</h5>
               
            </a>
            <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                <li title="Pricing type"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

                    <span>10/10/2024</span>
                </li>

                <li title="Support for API"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>

                    <span>Chat</span>
                </li>
            </ul>
            <p className="text-gray-600 two-lines">
            Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng và bắt đầu thực hiện luôn, quá trình này.
            </p>
        </div>

    </li>
   
    <li className="relative bg-white flex flex-col justify-between border rounded shadow-md hover:shadow-teal-400">

        <a className="relative" href="">
            <img className="rounded relative w-full object-cover aspect-video"
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" />
        </a>
        <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
            <a href=""
                className="flex justify-center items-center text-xl font-semibold text-black-700 hover:text-teal-800 two-lines text-ellipsis">
                <h5>Mình đã làm thế nào để hoàn thành một website chỉ trong 15 ngày</h5>
               
            </a>
            <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                <li title="Pricing type"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>

                    <span>10/10/2024</span>
                </li>

                <li title="Support for API"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>

                    <span>Chat</span>
                </li>
            </ul>
            <p className="text-gray-600 two-lines">
            Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng và bắt đầu thực hiện luôn, quá trình này.
            </p>
        </div>

    </li>
   

   

</ul>
  </div>
</div>


</div>
   </>
  )
}

export default Article