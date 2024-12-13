// assets
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import path from '@/constants/routes';
const icons = {
  ViewCarouselIcon,
};

const carousel = {
  id: 'carousel',
  title: 'Quản lí Carousel',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'carousel',
      title: 'Carousel',
      type: 'item',
      url: path.admin.carousel,
      icon: icons.ViewCarouselIcon,
      breadcrumbs: true,
    },
  ],
};

export default carousel;
