import request from '@/utils/request'

export function categoryList(params) {
    return request({
        url: '/category/list',
        method: 'get',
        params
    })
}
export function categoryAdd(data) {
    return request({
        url: '/category/add',
        method: 'post',
        data
    })
}
