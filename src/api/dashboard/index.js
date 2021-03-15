import request from '@/api/request'



export function dashboard(data) {
    return request({
        url: '/api/leju/admin/dashboard/baseInfo',
        method: 'get',
        data
    })
}