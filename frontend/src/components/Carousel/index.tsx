import { useTheme } from '@emotion/react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import s from './Carousel.module.scss';
import { Link } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
    maxWidth: '1600px',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    padding: 0,
    overflow: 'hidden',
    borderRadius: '10px',
    height: '300px',
}));

const Sliders = styled('div')(({ theme }) => ({
    display: 'flex',
    transition: 'transform 0.5s ease',
    marginBottom: '10px',
    height: '300px',
}));

const Slider = styled(Link)(({ theme }) => ({
    flex: '0 0 100%',
}));

const Dots = styled('div')(({ theme }) => ({
    display: 'flex',
    marginBottom: '50px'
}))

const Dot = styled('button')(({ theme }) => ({
    borderRadius: '10px',
    width: '50px',
    height: '8px',
    marginRight: '7px',
    backgroundColor: 'var(--white-primary)'
}))

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
    color: theme.palette.text.primary
}))

interface slider {
    image: string,
    path: string
}

interface CarouselProps {
    time?: number
    dot?: boolean
    auto?: boolean
    sliders: slider[]
}
const Carousel: React.FC<CarouselProps> = ({
    dot = false,
    time = 4000,
    auto = true,
    sliders
}) => {

    const theme: any = useTheme();

    const refSliders = useRef<HTMLDivElement>(null);
    const refDots = useRef<(HTMLButtonElement)[]>([]);
    const totalSlides = sliders.length;

    let currentSlider = 0;

    let preSlider = 0;

    const handleBack = () => {
        currentSlider = (currentSlider - 1 + totalSlides) % totalSlides;
        dotNavigation(currentSlider);
    }
    const handleForward = () => {
        currentSlider = (currentSlider + 1) % totalSlides;
        dotNavigation(currentSlider);
    };

    const dotReset = () => {
        refDots.current[preSlider]!.style.background = 'var(--white-primary)';
    }

    const dotNavigation = (index: number) => {
        dotReset();
        currentSlider = index;
        handlerCarousel();
    }

    const handlerCarousel = () => {

        refSliders.current!.style.transform = `translateX(-${currentSlider * 100}%)`;

        if (dot) {
            dotReset();
            refDots.current[currentSlider]!.style.background = 'var(--gray-primary)';
            preSlider = currentSlider;
        }
    }

    const coreCarousel = () => {

        dotNavigation(0);

        refDots.current.forEach((dot, index) => {
            if (dot) {
                dot.addEventListener('click', () => dotNavigation(index));
            }
        });

        if (auto) {

            const handler = setInterval(() => {
                currentSlider = (currentSlider + 1) % totalSlides;
                handlerCarousel();
            }, time);

            return () => {
                clearInterval(handler);
            };
        }
    }

    useEffect(coreCarousel, []);

    return (
        <>
            <Container sx={{
                position: 'relative'
            }}>
                <Sliders ref={refSliders}>
                    {
                        sliders.map(({ path, image }) => (

                            <Slider style={{ background: 'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))' }} to={path}>

                            </Slider>
                        ))
                    }
                </Sliders>


                <NavSlider onClick={handleBack} className={clsx(s['icon--left'])} theme={theme}>
                    <ArrowBackIos className={clsx(s['icon'])} />
                </NavSlider>

                <NavSlider onClick={handleForward} className={clsx(s['icon--right'])} theme={theme}>
                    <ArrowForwardIos className={clsx(s['icon'])} />
                </NavSlider>
            </Container>
            {dot &&
                <Dots>
                    {
                        Array(totalSlides)
                            .fill('').map((_, index: number) => (
                                <Dot
                                    ref={(el) => {
                                        if (el) (refDots.current[index] = el)
                                    }}
                                    key={index}>
                                </Dot>
                            ))
                    }
                </Dots>
            }
        </>
    );
};

export default Carousel;
