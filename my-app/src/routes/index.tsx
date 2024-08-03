import { createBrowserRouter } from 'react-router-dom';
import Default from '../layouts/default.tsx';
import Learning from '../pages/Learning/index.tsx';
const routes = [
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/',
                element: <h1></h1>,
            }, {
                path: 'learning/',
                element: <Learning />,
            }
            , {
                path: 'learn/:id',
                element: <h3 ></h3>,
            }
        ]
    }
]
const router = createBrowserRouter(routes);
export default router;