import request from '@/api/request'



export function kindList(data) {
    return request({
        url: '/api/leju/admin/kind/list',
        method: 'get',
        data
    })
}