import request from '@/utils/request'

export function articleList(params) {
    return request({
        url: '/article/list',
        method: 'get',
        params
    })
}
export function articleDelete(params) {
    return request({
        url: '/article/delete',
        method: 'get',
        params
    })
}
export function articleDetail(params) {
    return request({
        url: '/article/detail',
        method: 'get',
        params
    })
}
export function articleAdd(data) {
    return request({
        url: '/article/add',
        method: 'post',
        data
    })
}
