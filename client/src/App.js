import './App.scss';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div>
            {/* //Ajouter un layout ici (navbar etc.) */}
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AppLayout>
                <Outlet />
            </AppLayout>
        ),
        children: [
            {
                // Code d'exemple
                // path: '/',
                // element: <div>Home</div>,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
