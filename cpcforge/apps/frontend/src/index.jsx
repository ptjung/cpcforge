import declareHook from "./utils/hook";
import getPagePath from "./utils/path";

declareHook("home", getPagePath("HomePage"));
declareHook("signup", getPagePath("SignUpPage"));
declareHook("app", import("./App"));