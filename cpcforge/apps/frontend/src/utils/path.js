function getPagePath( module_name) {
    return import(`../pages/${module_name}/${module_name}`);
}

export default getPagePath;