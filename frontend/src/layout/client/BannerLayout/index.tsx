import { useTheme, Theme, useMediaQuery, Box } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

import SideBar from '../MainLayout/SideBar';
import Carousel from '@/components/Carousel';
import Header from '../MainLayout/Header';
import Footer from '../MainLayout/Footer';
import Layout from '../Layout.scss.module.scss';
import axiosInstance from '@/api/axiosInstance';

interface BannerLayoutProp {
  children: React.ReactNode;
}

interface CarouselItem {
  _id: string;
  path: string;
  image: string;
  background: string;
  title: string;
  description: string;
}

const BannerLayout: React.FC<BannerLayoutProp> = ({ children }) => {
  const theme: Theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [carousels, setCarousels] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Call API to fetch carousels
    const fetchCarousels = async () => {
      try {
        const response = await axiosInstance.get('/api/carousel');
        setCarousels(response.data.data); // Assume API returns { success, data }
      } catch (error) {
        console.error('Failed to fetch carousels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div
      style={{
        background: theme.palette.background.paper,
      }}
    >
      <Header />
      <div
        style={{
          background: theme.palette.background.paper,
        }}
        className="tw-flex"
      >
        <SideBar />
        <div className={clsx(Layout['content-main'], downMD ? 'tw-px-2' : '')}>
          <Carousel dot auto time={4000} sliders={carousels} />
          <Box mt='var(--large-space)'>{children}</Box>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BannerLayout;
