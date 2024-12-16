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
  height: '270px',
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

const Carousel: React.FC<CarouselProps> = ({ dot = false, time = 4000, auto = false, sliders, ...props }) => {
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
          position: 'absolute',
          left: '10px',
          bottom: '0px',
          gap: '10px', // Tăng khoảng cách giữa các dots
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
                height: '270px',
                background: slider.background,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  padding: '20px 10px 0 50px',
                }}
              >
                <Box>
                  <Typography
                    sx={{ color: 'white', marginBottom: '20px', fontWeight: 'bold' }}
                    variant="h1"
                    component="h1"
                  >
                    {slider.title}
                  </Typography>
                  <Typography sx={{ lineHeight: '25px', fontSize: '16px' }} variant="body1">
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
                        padding: '3px 30px',
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
                  flex:0.9
                }}
              >
                <img src={slider.image} alt={slider.title} style={{ height: '100%', objectFit: 'contain' }} />
              </Box>
            </Box>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default Carousel;
