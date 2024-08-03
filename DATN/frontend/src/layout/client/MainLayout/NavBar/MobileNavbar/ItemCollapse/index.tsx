import { Link } from "react-router-dom";
import s from './ItemCollapse.module.scss';
import { useTheme } from "@mui/material";
import { useState } from "react";
import Item from "../Item";


export interface ItemCollapseProps {
    item: {
        icon?:any,
        title: string,
        url: string,
        target: boolean,
        children: any[]
    }
}

const ItemCollapse: React.FC<ItemCollapseProps> = ({ item }) => {

    const [isShowChildren, setIsShowChildren] = useState<boolean>(false);

    const handleShowChildren = () => {
        setIsShowChildren(true);
    }


    const theme = useTheme();
    return (
        <li
            onClick={handleShowChildren}
            className="tw-transition tw-p-3 tw-cursor-pointer hover:tw-opacity-80"
            style={{
                borderColor: theme.palette.divider // Áp dụng màu border từ theme
            }}
        >
            <Link
                target={item.target ? '_blank' : '_self'}
                to={item.url ? item.url : '#'}
                style={{
                    color: theme.palette.text.primary
                }}>
                <i className="fa-solid fa-chevron-right tw-text-xs tw-mr-2"></i> {item.title}
            </Link>

            {isShowChildren && item?.children && item.children.map((i, index) => {

                if(!i?.children?.length) return <Item item={i}/>
                return(<ItemCollapse item={i} key={index} />)
                
            })}


        </li>
    )
}
export default ItemCollapse;