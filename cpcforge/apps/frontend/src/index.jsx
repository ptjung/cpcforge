import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { declareHook, getPagePath } from "./utils";

// declareHook("home", getPagePath("HomePage"));
// declareHook("sign-up", getPagePath("SignUpPage"));
// declareHook("sign-in", getPagePath("SignInPage"));
// declareHook("platform-list", getPagePath("PlatformListPage"));
// declareHook("platform-create", getPagePath("PlatformCreatePage"));
// declareHook("platform-view", getPagePath("PlatformViewPage"));
// declareHook("problem-create", getPagePath("ProblemCreatePage"));
// declareHook("problem-view", getPagePath("ProblemViewPage"));


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

export default App;