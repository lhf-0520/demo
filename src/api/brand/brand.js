import request from '@/api/request'



export function brandList(data) {
    return request({
        url: '/api/leju/admin/brand/list',
        method: 'get',
        data
    })
}