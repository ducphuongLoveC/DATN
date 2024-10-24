// import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// import { styled, useTheme } from '@mui/material/styles';
// import { useEffect, useRef, useState } from 'react';
// import clsx from 'clsx';
// import { Link } from 'react-router-dom';
// import { Box, Typography, Button } from '@mui/material';

// import s from './Carousel.module.scss';

// const Container = styled('div')(({ theme }) => ({
//   marginTop: '10px',
//   marginBottom: '10px',
//   padding: 0,
//   overflow: 'hidden',
//   borderRadius: 'var(--main-border-radius)',
//   height: '250px',
// }));

// const Sliders = styled('div')(({ theme }) => ({
//   position: 'relative',
//   display: 'flex',
//   transition: 'transform 0.7s ease',
//   marginBottom: '10px',
//   height: '100%',
// }));

// const Slider = styled(Box)(({ theme }) => ({
//   padding: '20px 10px 0 50px',
//   flex: '0 0 100%',
// }));

// const Dots = styled('div')(({ theme }) => ({
//   display: 'flex',
//   marginBottom: '50px',
// }));

// const Dot = styled('button')(({ theme }) => ({
//   borderRadius: '10px',
//   width: '50px',
//   height: '8px',
//   marginRight: '7px',
//   backgroundColor: 'var(--white-primary)',
// }));

// const NavSlider = styled('button')(({ theme }) => ({
//   position: 'absolute',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width: '30px',
//   height: '30px',
//   borderRadius: '50%',
//   top: '50%',
//   transform: 'translateY(-50%)',
//   background: theme.palette.background.paper,
//   color: theme.palette.text.primary,
// }));

// interface slider {
//   _id: string;
//   title: string;
//   description: string;
//   image: string;
//   path: string;
//   background: string;
// }

// interface CarouselProps {
//   time?: number;
//   dot?: boolean;
//   auto?: boolean;
//   sliders: slider[];
// }
// const Carousel: React.FC<CarouselProps> = ({
//   dot = false,
//   time = 4000,
//   auto = false,
//   sliders,
//   ...props
// }) => {
//   const theme: any = useTheme();

//   const refSliders = useRef<HTMLDivElement>(null);
//   const refDots = useRef<HTMLButtonElement[]>([]);
//   const totalSlides = sliders.length;

//   const currentSlider = useRef(0);
//   const preSlider = useRef(0);

//   const handleBack = async () => {
//     currentSlider.current =
//       (currentSlider.current - 1 + totalSlides) % totalSlides;
//     navigation();
//   };
//   const handleForward = async () => {
//     currentSlider.current = (currentSlider.current + 1) % totalSlides;
//     navigation();
//   };

//   const dotReset = () => {
//     refDots.current[preSlider.current]!.style.background =
//       'var(--white-primary)';
//   };

//   const navigation = () => {
//     handlerCarousel();
//   };

//   const dotNavigation = (index: number) => {
//     currentSlider.current = index;
//     handlerCarousel();
//   };

//   const handlerCarousel = () => {
//     refSliders.current!.style.transform = `translateX(-${currentSlider.current * 100}%)`;

//     if (dot) {
//       dotReset();
//       refDots.current[currentSlider.current]!.style.background =
//         sliders[currentSlider.current].background;
//       preSlider.current = currentSlider.current;
//     }
//   };

//   const coreCarousel = () => {
//     dotNavigation(0);

//     refDots.current.forEach((dot, index) => {
//       if (dot) {
//         dot.addEventListener('click', () => dotNavigation(index));
//       }
//     });

//     if (auto) {
//       const handler = setInterval(() => {
//         handleForward();
//       }, time);

//       return () => {
//         clearInterval(handler);
//       };
//     }
//   };

//   useEffect(coreCarousel, [dot, time, auto, sliders]);

//   return (
//     <>
//       <Container
//         {...props}
//         sx={{
//           position: 'relative',
//         }}
//       >
//         <Sliders ref={refSliders}>
//           {sliders.map((slider) => (
//             <>
//               <Slider
//                 key={slider._id}
//                 style={{ background: slider.background }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     height: '100%',
//                     justifyContent: 'space-between',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       flex: 1,
//                       color: 'white',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       flexDirection: 'column',
//                     }}
//                   >
//                     <Box>
//                       <Typography
//                         sx={{
//                           color: 'white',
//                           marginBottom: '10px',
//                         }}
//                         variant="h1"
//                         component="h1"
//                       >
//                         {slider.title}
//                       </Typography>
//                       <Typography
//                         sx={{ lineHeight: '25px' }}
//                         variant="body1"
//                         component="p"
//                       >
//                         {slider.description}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Link to={slider.path}>
//                         <Button
//                           sx={{
//                             backgroundColor: 'transparent',
//                             color: theme.palette.background.paper,
//                             border: `2px solid ${theme.palette.background.paper}`,
//                             marginBottom: '35px',
//                             padding: '3px 20px',
//                             borderRadius: 'var(--main-border-radius)',
//                             fontWeight: '600',
//                             transition: 'background-color 0.3s, color 0.3s',
//                             '&:hover': {
//                               backgroundColor: theme.palette.background.paper,
//                               color: theme.palette.text.primary,
//                             },
//                           }}
//                         >
//                           Học ngay nào
//                         </Button>
//                       </Link>
//                     </Box>
//                   </Box>

//                   <Box
//                     sx={{
//                       display: { xs: 'none', sm: 'flex' },
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       flex: 1,
//                       padding: '10px',
//                     }}
//                   >
//                     <img
//                       src={slider.image}
//                       alt={slider.title}
//                       style={{
//                         height: '100%',
//                         objectFit: 'contain',
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Slider>
//             </>
//           ))}
//         </Sliders>

//         <NavSlider
//           onClick={handleBack}
//           className={clsx(s['icon--left'])}
//           theme={theme}
//         >
//           <ArrowBackIos className={clsx(s['icon'])} />
//         </NavSlider>

//         <NavSlider
//           onClick={handleForward}
//           className={clsx(s['icon--right'])}
//           theme={theme}
//         >
//           <ArrowForwardIos className={clsx(s['icon'])} />
//         </NavSlider>
//       </Container>
//       {dot && (
//         <Dots>
//           {Array(totalSlides)
//             .fill('')
//             .map((_, index: number) => (
//               <Dot
//                 ref={(el) => {
//                   if (el) refDots.current[index] = el;
//                 }}
//                 key={index}
//               ></Dot>
//             ))}
//         </Dots>
//       )}
//     </>
//   );
// };

// export default Carousel;

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Slider from 'react-slick';

interface SliderProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  background: string;
}

interface CarouselProps {
  time?: number;
  dot?: boolean;
  auto?: boolean;
  sliders: SliderProps[];
}
const Container = styled('div')(() => ({
  marginTop: '10px',
  marginBottom: '10px',
  overflow: 'hidden',
  borderRadius: 'var(--main-border-radius)',
  height: '250px',
  position: 'relative',
}));

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        cursor: 'pointer',
      }}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        cursor: 'pointer',
      }}
    />
  );
};

const Carousel: React.FC<CarouselProps> = ({
  dot = false,
  time = 4000,
  auto = false,
  sliders,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: dot,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: auto,
    autoplaySpeed: time,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i: number) => {
      return (
        <div
          onClick={() => setActiveIndex(i)}
          style={{
            borderRadius: 'var(--main-border-radius)',
            width: '30px',
            height: '5px',
            background: i === activeIndex ? '#d3d3d3' : 'white',
            transition: 'background-color 0.3s',
            cursor: 'pointer',
          }}
        />
      );
    },
    beforeChange: (_: number, next: number) => {
      setActiveIndex(next);
    },
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          width: '400px',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          left: '10px',
          bottom: '0px',
        }}
      >
        {dots}
      </div>
    ),
  };

  return (
    <Container {...props}>
      <Slider {...settings}>
        {sliders.map((slider) => (
          <div key={slider._id}>
            <Box
              sx={{
                height: '250px',
                background: slider.background,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px 10px 0 50px',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                <Box>
                  <Typography
                    sx={{ color: 'white', marginBottom: '10px' }}
                    variant="h1"
                    component="h1"
                  >
                    {slider.title}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: '25px' }}
                    variant="body1"
                    component="p"
                  >
                    {slider.description}
                  </Typography>
                </Box>
                <Box>
                  <Link to={slider.path}>
                    <Button
                      sx={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: `2px solid white`,
                        marginBottom: '35px',
                        padding: '3px 20px',
                        borderRadius: 'var(--main-border-radius)',
                        fontWeight: '600',
                        transition: 'background-color 0.3s, color 0.3s',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'black',
                        },
                      }}
                    >
                      Học ngay nào
                    </Button>
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: '10px',
                }}
              >
                <img
                  src={slider.image}
                  alt={slider.title}
                  style={{ height: '100%', objectFit: 'contain' }}
                />
              </Box>
            </Box>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default Carousel;
