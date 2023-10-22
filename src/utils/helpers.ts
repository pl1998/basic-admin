
/**
 * 过滤存在空值的对象并返回url拼接地址
 * @param params 
 * @returns 
 */
export function getFilterParmas(params: any | object): string {
    return (new URLSearchParams(filterNullAndEmptyValues(params))).toString()
}


/**
 * 过滤对象属性为空或者null
 * @param obj 
 * @returns 
 */
export function filterNullAndEmptyValues(obj: object) {
    const filteredObj = Object.entries(obj).reduce((acc, [key, value]) => {

        if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});

    return filteredObj;
}

export const methodArr = ["HEAD","GET","POST","PUT","PUTCH","DELETE","OPTIONS"];
export const methodColorArr = ["","success","warning","warning","warning","danger",""];

export function isNumber(value:any) {
    return typeof value === 'number' && isFinite(value);
}