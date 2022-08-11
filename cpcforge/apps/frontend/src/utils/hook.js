import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspender, Redirector } from "../common";

function declareHook(id, importExpr) {
    /*
    This function mounts a component denoted by `importExpr` onto an element
    with parameter `id`. Expected to host components as pages.
    */
    const Content = React.lazy(() => importExpr);
    // const loc = useLocation();

    try {
        const mountableNode = document.getElementById(id);
        if (mountableNode) {
            ReactDOM.render(
                <BrowserRouter>
                    <Routes>
                        <Route path="/redirect" element={
                            <Navigate to="/" />
                        } /> 
                        <Route path="*" element={
                            <Suspense fallback={<Suspender />}>
                                <Content />
                            </Suspense>
                        } />
                    </Routes>
                </BrowserRouter>,
                mountableNode
            );
        };
    } catch (e) {
        console.error(e);
    }
}

export default declareHook;