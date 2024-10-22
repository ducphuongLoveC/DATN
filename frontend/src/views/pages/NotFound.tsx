import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleExplode = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 1000);
  };

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-900 tw-via-purple-900 tw-to-pink-800 tw-flex tw-items-center tw-justify-center tw-px-4 tw-sm:px-6 tw-lg:px-8 tw-overflow-hidden">
      <div className="tw-max-w-4xl tw-w-full tw-space-y-8 tw-text-center tw-relative">
        <div className="tw-relative tw-z-10">
          <h2 className="tw-text-9xl tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-pink-500 tw-via-purple-500 tw-to-blue-500 tw-animate-pulse">
            404
          </h2>
          <h3 className="tw-mt-2 tw-text-4xl tw-font-bold tw-text-white tw-drop-shadow-lg">
            Không tìm thấy trang
          </h3>
          <p className="tw-mt-4 tw-text-xl tw-text-pink-200">
            Oops! Có vẻ như bạn đã lạc vào vũ trụ song song.
          </p>
        </div>

        <div
          onClick={() => window.history.back()}
          className="tw-mt-12 tw-relative"
        >
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-pink-500 tw-via-purple-500 tw-to-blue-500 tw-blur-3xl tw-opacity-30"></div>
          <img
            className={`tw-relative tw-mx-auto tw-h-80 tw-w-auto tw-transform hover:tw-scale-110 tw-transition-all tw-duration-300 ${isExploding ? 'tw-animate-spin' : 'tw-animate-float'}`}
            src="/images/Astronaut.png"
            alt="Lost Astronaut"
            onClick={handleExplode}
          />
        </div>

        <div className="tw-mt-12 tw-space-y-4 tw-relative tw-z-10">
          <Link
            to="/"
            className="tw-block tw-w-full tw-px-8 tw-py-4 tw-text-lg tw-font-semibold tw-text-white tw-bg-gradient-to-r tw-from-pink-500 tw-to-purple-600 tw-rounded-full hover:tw-from-pink-600 hover:tw-to-purple-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-purple-500 tw-transition tw-duration-300 tw-ease-in-out tw-transform hover:tw-scale-105 hover:tw-shadow-lg"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>

      {window.innerWidth > 768 && (
        <div
          className="tw-fixed tw-w-6 tw-h-6 tw-rounded-full tw-bg-gradient-to-r tw-from-pink-500 tw-to-purple-500 tw-mix-blend-screen tw-pointer-events-none tw-transition-all tw-duration-500 tw-ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            boxShadow: '0 0 20px 10px rgba(236, 72, 153, 0.3)',
          }}
        ></div>
      )}

      {/* Starry background */}
      <div className="tw-fixed tw-inset-0 tw-pointer-events-none">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="tw-absolute tw-bg-white tw-rounded-full tw-opacity-30 tw-animate-twinkle"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
