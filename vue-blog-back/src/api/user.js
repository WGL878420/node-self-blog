import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
export function register(data) {
    return request({
        url: '/register',
        method: 'get',
        params: { data }
    })
}

export function getInfo(token) {
    return request({
        url: '/userInfo',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

