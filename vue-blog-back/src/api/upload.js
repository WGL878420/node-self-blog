import request from '@/utils/request'

export function Upload(data) {
    return request({
        url: '/upload',
        method: 'post',
        data
    })
}
