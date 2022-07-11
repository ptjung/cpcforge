import {useEffect, useState} from "react";

function usePageContext() {
    let [pageContext, setPageContext] = useState(undefined);
    useEffect(() => {
        let pageContext = document.getElementById('page-context').textContent;
        setPageContext(JSON.parse(pageContext));
    }, []);
    return pageContext;
}

export default usePageContext;