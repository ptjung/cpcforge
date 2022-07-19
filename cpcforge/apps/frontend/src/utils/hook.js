import React, { Suspense } from "react";
import { Suspender } from "../common";
import ReactDOM from "react-dom";

function declareHook(id, importExpr) {
    /*
    This function mounts a component denoted by `importExpr` onto an element
    with parameter `id`. Expected to host components as pages.
    */
    const Content = React.lazy(() => importExpr);

    try {
        const mountableNode = document.getElementById(id);
        if (mountableNode) {
            ReactDOM.render(
                <Suspense fallback={<Suspender />}>
                    <Content />
                </Suspense>,
                mountableNode
            );
        };
    } catch (e) {
        console.error(e);
    }
}

export default declareHook;