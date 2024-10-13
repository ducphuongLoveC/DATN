import React from 'react'

const BannerArtile = () => {
  return (
    <div>
        <section className="px-4">
        <div
    className="p-6 sm:p-10 rounded-2xl w-full text-white flex items-center justify-between max-w-2xl mx-auto mt-20 h-[180px] min-w-[1000px] bg-cover bg-center"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxrZXlib2FyZHxlbnwwfDB8fHwxNjk5NTI1MDAzfDA&ixlib=rb-4.0.3&q=80&w=1080')" }}>
    <div className="flex flex-col gap-6">
        <div className="">
            <span className="text-gray-200 tw-justify-between text-4xl text-white font-semibold">Bài viết</span>
        </div>
    </div>
</div>

</section>
    </div>
  )
}

export default BannerArtile