import {useEffect, useState} from "react";

function usePageContext() {
    let [pageContext, setPageContext] = useState({});
    useEffect(() => {
        const pageContextNode = document.getElementById("page-context");
        const textContent = pageContextNode.textContent;
        pageContextNode.remove();
        setPageContext(JSON.parse(textContent));
    }, []);
    return pageContext;
}

export default usePageContext;