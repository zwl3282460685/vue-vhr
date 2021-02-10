//菜单栏工具类(用于路由转发)
import {getRequest} from './api'

export const initMenu = (router, store) => {
    if(store.state.routes.length > 0){
        return;
    }
    getRequest("/system/config/menu").then(data => {
        if(data){
            let fmRoutes = formatRoutes(data);//对返回的数据进行格式化
            router.addRoutes(fmRoutes);
            store.commit('initRoutes', fmRoutes);
            store.dispatch('connect');
        }
    })
}

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconcls,
            children
        } = router;
        if(children && children instanceof Array){
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconcls: iconcls,
            meta: meta,
            children: children,
            component(resolve){
                if(component.startsWith("Home")){
                    require(['../views/' + component + '.vue'], resolve);
                }else if(component.startsWith("Emp")){
                    require(['../views/emp/' + component + '.vue'], resolve);
                }else if (component.startsWith("Per")){
                    require(['../views/per/' + component + '.vue'], resolve);
                }else if(component.startsWith("Sal")){
                    require(['../views/sal/' + component + '.vue'], resolve);
                }else if(component.startsWith("Sys")){
                    require(['../views/sys/' + component + '.vue'], resolve);
                }else if(component.startsWith("Sta")){
                    require(['../views/sta/' + component + '.vue'], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);//放到数组中
    })
    return fmRoutes;
}
