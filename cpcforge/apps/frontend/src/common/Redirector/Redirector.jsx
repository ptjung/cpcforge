import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  
function Redirector() {
    const navigate = useNavigate();
    
    return (<div onClick={() => { navigate(useQuery().get("next")) }}>beans</div>);
}

export default Redirector;