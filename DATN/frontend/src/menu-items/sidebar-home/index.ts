
import { BiSolidHome, BiNews, BiLogoTelegram } from "react-icons/bi";

export interface Props {
    icon: React.ReactNode | Function,
    title: string,
    url: string,
    target: boolean,
}

const menus: Props[] = [
    {
        icon: BiSolidHome,
        title: 'Trang chủ',
        url: '/',
        target: false
    },
    {
        icon: BiNews,
        title: 'Bài viết',
        url: '/news',
        target: false
    },
    {
        icon: BiLogoTelegram,
        title: 'Liên hệ',
        url: '/contact',
        target: false
    },

]
export default menus;