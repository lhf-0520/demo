import request from '@/api/request'

export function productList(data) {
    return request({
        url: '/api/leju/admin/product/list',
        method: 'get',
        data
    })
}

export function delList(data) {
    return request({
        url: '/api/leju/admin/product/delete',
        method: 'get',
        data
    })
}
export function seriesList(data) {
    return request({
        url: '/api/leju/admin/series/list', // 相对路径
        method: 'get',
        data
    })
}
export function productDetail(data) {
    return request({
        url: '/api/leju/admin/product/detail',
        method: 'get',
        data
    })
}

export function productUpdate(data) {
    return request({
        url: '/api/leju/admin/product/updateProduct',
        method: 'post',
        data
    })
}

export function productSave(data) {
    return request({
        url: '/api/leju/admin/product/saveOrUpdate',
        method: 'post',
        data
    })
}

export function switchCode(data) {
    return request({
        url: '/api/leju/admin/product/switchCode',
        method: 'post',
        data
    })
}