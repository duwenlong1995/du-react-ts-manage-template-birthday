/**
 * 按照一维数组顺序给二维数组排序
 */
type Item = {};
export default function useSort(array: Item[], arraySort: string[], key: { label: string }) {
    // 创建一个映射，用于存储每个名称的索引，提高查找效率
    const indexMap = new Map<string, number>();
    arraySort.forEach((item, index) => {
        indexMap.set(item, index);
    });
    let keyIndex = key.label;
    array.sort((a: any, b: any) => {
        const aIndex = indexMap.get(a[keyIndex]) ?? Infinity; // 如果找不到，则赋值为Infinity
        const bIndex = indexMap.get(b[keyIndex]) ?? Infinity;
        return aIndex - bIndex;
    });
    return [array];
}
