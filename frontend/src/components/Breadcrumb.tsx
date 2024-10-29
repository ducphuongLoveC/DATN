import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

import { useLocation, Link as RouterLink } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter((x) => x); 

  return (
    <Breadcrumbs 
    sx={{mb:1}}
      aria-label="breadcrumb"
      separator={'/'}
    >
  
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={to} color="text.primary">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link key={to} underline="hover" color="inherit" component={RouterLink} to={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
