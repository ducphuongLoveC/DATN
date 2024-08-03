
import { useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import s from './Item.module.scss';

import { ItemCollapseProps } from "../ItemCollapse";
const Item: React.FC<ItemCollapseProps> = ({ item }) => {

    const theme = useTheme();
    const Icon = item.icon;

    return (
        <li
            className="w-100 tw-transition tw-p-3 tw-cursor-pointer hover:tw-opacity-80 tw-border-b"
            style={{
                borderColor: theme.palette.divider // Áp dụng màu border từ theme
            }}
        >
            <Link
                className="tw-ml-5"
                to={item.url} target={item.target ? '_blank' : '_self'}
                style={{
                    color: theme.palette.text.primary
                }}>
                {item.title}

            </Link>
        </li>
    )
}
export default Item;