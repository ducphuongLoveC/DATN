import { useTheme } from '@emotion/react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import s from './Carousel.module.scss';

const Container = styled('div')(({ theme }) => ({
    marginTop: '10px',
    marginBottom: '10px',
    padding: 0,
    overflow: 'hidden',
    borderRadius: '10px',
    height: '250px',
    // width: '90vw',
}));

const Sliders = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    transition: 'transform 0.7s ease',
    marginBottom: '10px',
    height: '100%',
}));

const Slider = styled(Link)(({ theme }) => ({
    padding: '20px 10px 0 50px',
    flex: '0 0 100%',
}));

const Dots = styled('div')(({ theme }) => ({
    display: 'flex',
    marginBottom: '50px',
}));

const Dot = styled('button')(({ theme }) => ({
    borderRadius: '10px',
    width: '50px',
    height: '8px',
    marginRight: '7px',
    backgroundColor: 'var(--white-primary)',
}));

const NavSlider = styled('button')(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    top: '50%',
    transform: 'translateY(-50%)',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

interface slider {
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
    sliders: slider[];
}
const Carousel: React.FC<CarouselProps> = ({
    dot = false,
    time = 4000,
    auto = false,
    sliders,
    ...props
}) => {
    const theme: any = useTheme();

    const refSliders = useRef<HTMLDivElement>(null);
    const refDots = useRef<HTMLButtonElement[]>([]);
    const totalSlides = sliders.length;

    const currentSlider = useRef(0);
    const preSlider = useRef(0);

    const handleBack = async () => {
        currentSlider.current =
            (currentSlider.current - 1 + totalSlides) % totalSlides;
        dotNavigation(currentSlider.current);
    };
    const handleForward = async () => {
        currentSlider.current = (currentSlider.current + 1) % totalSlides;
        dotNavigation(currentSlider.current);
    };

    const dotReset = () => {
        refDots.current[preSlider.current]!.style.background =
            'var(--white-primary)';
    };

    const dotNavigation = (index: number) => {
        dotReset();
        currentSlider.current = index;
        handlerCarousel();
    };

    const handlerCarousel = () => {
        refSliders.current!.style.transform = `translateX(-${currentSlider.current * 100}%)`;

        if (dot) {
            dotReset();
            refDots.current[currentSlider.current]!.style.background =
                sliders[currentSlider.current].background;
            preSlider.current = currentSlider.current;
        }
    };

    const coreCarousel = () => {
        dotNavigation(0);

        refDots.current.forEach((dot, index) => {
            if (dot) {
                dot.addEventListener('click', () => dotNavigation(index));
            }
        });

        if (auto) {
            const handler = setInterval(() => {
                handleForward();
            }, time);

            return () => {
                clearInterval(handler);
            };
        }
    };

    useEffect(coreCarousel, [dot, time, auto, sliders]);

    console.log('check');

    return (
        <>
            <Container
                {...props}
                sx={{
                    position: 'relative',
                }}
            >
                <Sliders ref={refSliders}>
                    {sliders.map((slider) => (
                        <>
                            <Slider
                                key={slider._id}
                                style={{ background: slider.background }}
                                to={slider.path}
                            >
                                <Box sx={{ display: 'flex', height: '100%' }}>
                                    <Box sx={{ flex: 1, color: 'white' }}>
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                marginBottom: '10px',
                                            }}
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

                                    <Box
                                        sx={{
                                            display: { xs: 'none', sm: 'flex' },
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flex: 2,
                                            padding: '10px',
                                        }}
                                    >
                                        <img
                                            src={slider.image}
                                            alt={slider.title}
                                            style={{
                                                height: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Slider>
                        </>
                    ))}
                </Sliders>

                <NavSlider
                    onClick={handleBack}
                    className={clsx(s['icon--left'])}
                    theme={theme}
                >
                    <ArrowBackIos className={clsx(s['icon'])} />
                </NavSlider>

                <NavSlider
                    onClick={handleForward}
                    className={clsx(s['icon--right'])}
                    theme={theme}
                >
                    <ArrowForwardIos className={clsx(s['icon'])} />
                </NavSlider>
            </Container>
            {dot && (
                <Dots>
                    {Array(totalSlides)
                        .fill('')
                        .map((_, index: number) => (
                            <Dot
                                ref={(el) => {
                                    if (el) refDots.current[index] = el;
                                }}
                                key={index}
                            ></Dot>
                        ))}
                </Dots>
            )}
        </>
    );
};

export default Carousel;
