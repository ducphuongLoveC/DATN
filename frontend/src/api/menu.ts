// import useSWR, { mutate } from 'swr';
// import { useMemo } from 'react';

// // Định nghĩa kiểu cho trạng thái menu
// interface MenuMasterState {
//     openedItem: string;
//     openedComponent: string;
//     openedHorizontalItem: string | null;
//     isDashboardDrawerOpened: boolean;
//     isComponentDrawerOpened: boolean;
// }

// // Trạng thái khởi đầu
// const initialState: MenuMasterState = {
//     openedItem: 'dashboard',
//     openedComponent: 'buttons',
//     openedHorizontalItem: null,
//     isDashboardDrawerOpened: false,
//     isComponentDrawerOpened: true,
// };

// // Endpoints API
// export const endpoints = {
//     key: 'api/menu',
//     master: 'master',
//     dashboard: '/dashboard', // server URL
// };

// // Hook để lấy trạng thái menu
// export function useGetMenuMaster() {
//     const { data, isLoading } = useSWR<MenuMasterState>(
//         endpoints.key + endpoints.master,
//         () => initialState,
//         {
//             revalidateIfStale: false,
//             revalidateOnFocus: false,
//             revalidateOnReconnect: false,
//         }
//     );

//     const memoizedValue = useMemo(
//         () => ({
//             menuMaster: data,
//             menuMasterLoading: isLoading,
//         }),
//         [data, isLoading]
//     );

//     return memoizedValue;
// }

// // Hàm để cập nhật trạng thái drawer
// export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
//     mutate<MenuMasterState>(
//         endpoints.key + endpoints.master,
//         (currentMenuMaster) => {
//             return { ...currentMenuMaster, isDashboardDrawerOpened };
//         },
//         false
//     );
// }

// // Hàm để cập nhật mục đang mở
// export function handlerActiveItem(openedItem: string) {
//     mutate<MenuMasterState>(
//         endpoints.key + endpoints.master,
//         (currentMenuMaster) => {
//             return { ...currentMenuMaster, openedItem };
//         },
//         false
//     );
// }
