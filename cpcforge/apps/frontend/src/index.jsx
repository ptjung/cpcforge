import { declareHook, getPagePath } from "./utils";

declareHook("home", getPagePath("HomePage"));
declareHook("sign-up", getPagePath("SignUpPage"));
declareHook("sign-in", getPagePath("SignInPage"));
declareHook("platform-list", getPagePath("PlatformListPage"));
declareHook("platform-create", getPagePath("PlatformCreatePage"));
declareHook("platform-view", getPagePath("PlatformViewPage"));
declareHook("problem-create", getPagePath("ProblemCreatePage"));
declareHook("problem-view", getPagePath("ProblemViewPage"));

declareHook("app", import("./App"));