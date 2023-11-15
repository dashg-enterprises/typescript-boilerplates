import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { App } from "./pages/App";

export function AppRouter() {
    const router = createBrowserRouter(createRoutesFromElements(<>
        <Route element={<App/>} path="/"/>
    </>));

    return <RouterProvider router={router}/>;
}

