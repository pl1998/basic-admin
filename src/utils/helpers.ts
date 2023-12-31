
import { ref } from 'vue'

import type { TagProps } from 'element-plus'

type Item = { type: TagProps['type']; label: string }

/**
 * 过滤存在空值的对象并返回url拼接地址
 * @param params 
 * @returns 
 */
export function getFilterParmas(params: any | object): string {
    return (new URLSearchParams(filterNullAndEmptyValues(params))).toString()
}

/**
 * 过滤存在空值的对象并返回url拼接地址
 * @param params 
 * @returns 
 */
export function getFilterObject(obj: any): object {

    for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        } else if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
            delete obj[key];
        }
    }
    return obj;
}

/**
 * 过滤对象属性为空或者null
 * @param obj 
 * @returns 
 */
export function filterNullAndEmptyValues(obj: object) {
    const filteredObj = Object.entries(obj).reduce((acc: any, [key, value]) => {

        if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});

    return filteredObj;
}

export const methodArr = <string[]>["HEAD", "GET", "POST", "PUT", "PUTCH", "DELETE", "OPTIONS"];

export const methodColorArr = ref<Array<Item>>([
    { type: '', label: 'Tag 1' },
    { type: 'success', label: 'Tag 2' },
    { type: 'warning', label: 'Tag 3' },
    { type: 'warning', label: 'Tag 4' },
    { type: 'warning', label: 'Tag 5' },
    { type: 'danger', label: 'Tag 5' },
    { type: '', label: 'Tag 1' }
])


export function isNumber(value: any) {
    return typeof value === 'number' && isFinite(value);
}