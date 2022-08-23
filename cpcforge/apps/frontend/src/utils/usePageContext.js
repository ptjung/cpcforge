import {useEffect, useState} from "react";

function usePageContext() {
    let [pageContext, setPageContext] = useState({});
    useEffect(() => {
        const pageContextNode = document.getElementById("page-context");
        setPageContext(JSON.parse(pageContextNode.textContent));
    }, []);
    return pageContext;
}

export default usePageContext;