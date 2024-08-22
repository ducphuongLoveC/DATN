import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    Box,
    useTheme,
} from '@mui/material';

import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import s from './Card.module.scss';
interface Icons {
    title: string;
    icon: React.ReactNode;
}

interface CardMainProps {
    width?: string;
    title: string;
    img: string;
    footerIcon: Icons[];
}

const CustomCard = styled(Card)<{ width?: string; theme: any }>(
    ({ width, theme }) => ({
        margin: '10px',
        backgroundColor: theme.palette.background.paper2,
        borderRadius: '15px',
        overflow: 'hidden',
        position: 'relative',
        transition: '.15s ease-in',
        width: '90%',
        '&:hover, &:focus-within': {
            transform: 'translateY(-5px)',
        },
    })
);

const CustomCardMedia = styled(CardMedia)({
    height: '160px',
    overflow: 'hidden',
    objectFit: 'cover',
});

const CustomIconButton = styled(IconButton)({
    border: 0,
    backgroundColor: '#fff',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    fontSize: '1.25rem',
    transition: '.25s ease',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 3px 8px 0 rgba(0, 0, 0, 0.15)',
    zIndex: 1,
    cursor: 'pointer',
    color: '#565656',
    '&:hover, &:focus': {
        backgroundColor: '#EC4646',
        color: '#FFF',
    },
});

const CustomTypography = styled(Link)({
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});

const CustomCardFooter = styled(Box)({
    marginTop: '1rem',
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
});

const CustomCardMeta = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    color: '#787878',
    margin: '3px',
    '&:first-of-type::after': {
        display: 'block',
        content: '""',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: 'currentColor',
        marginLeft: '.75rem',
        marginRight: '.75rem',
    },
    svg: {
        flexShrink: 0,
        width: '1em',
        height: '1em',
        marginRight: '.25em',
    },
});

const CardMain: React.FC<CardMainProps> = ({
    width,
    title,
    img,
    footerIcon,
}) => {
    const theme = useTheme();
    return (
        <CustomCard className={clsx(s['card'])} width={width} theme={theme}>
            <CustomCardMedia image={img} />
            <CardContent>
                <Box>
                    <CustomTypography to={'/'}>{title}</CustomTypography>
                </Box>
                <CustomCardFooter>
                    {footerIcon.map((data: Icons, index: number) => (
                        <CustomCardMeta key={index}>
                            {data.icon}
                            <Typography variant="body2" color="text.secondary">
                                {data.title}
                            </Typography>
                        </CustomCardMeta>
                    ))}
                </CustomCardFooter>
            </CardContent>
        </CustomCard>
    );
};

export default CardMain;
