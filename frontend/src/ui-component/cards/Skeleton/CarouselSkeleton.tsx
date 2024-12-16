import { Skeleton } from '@mui/material';

export default function CarouselSkeleton() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-white">
      {/* Navigation Arrows */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <Skeleton variant="circular" width={24} height={24} />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <Skeleton variant="circular" width={24} height={24} />
      </button>

      <div className="flex items-center h-full px-16">
        {/* Left Content */}
        <div className="w-1/2 space-y-6">
          {/* Title */}
          <Skeleton variant="text" width={200} height={60} />

          {/* Description */}
          <Skeleton variant="text" width="90%" height={100} />

          {/* Button */}
          <Skeleton variant="rectangular" width={150} height={45} sx={{ borderRadius: '25px' }} />

          {/* Dots */}
          <div className="flex gap-2 pt-4">
            <Skeleton variant="circular" width={10} height={10} />
            <Skeleton variant="circular" width={10} height={10} />
          </div>
        </div>

        {/* Right Content - Logo and Text */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Skeleton variant="circular" width={120} height={120} />
            <Skeleton variant="text" width={250} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
