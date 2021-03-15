import request from '@/api/request'

export function ordersendDone(data) {
    return request({
        url: '/api/leju/admin/order/sendDone',
        method: 'post',
        data
    })
}


export function ordercloseOrder(data) {
    return request({
        url: '/api/leju/admin/order/closeOrder',
        method: 'get',
        data
    })
}


export function orderByBack(data) {
    return request({
        url: '/api/leju/admin/order/closeOrderByBack',
        method: 'post',
        data
    })
}

export function orderDel(data) {
    return request({
        url: '/api/leju/admin/order/delFocus',
        method: 'get',
        data
    })
}

export function orderList(data) {
    return request({
        url: '/api/leju/admin/order/list',
        method: 'get',
        data
    })
}

export function userInfo(data) {
    return request({
        url: '/api/leju/admin/order/orderUserInfo',
        method: 'get',
        data
    })
}

export function orderDetail(data) {
    return request({
        url: '/api/leju/admin/order/detail',
        method: 'get',
        data
    })
}