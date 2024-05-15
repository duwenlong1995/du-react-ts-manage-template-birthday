import { ReactElement, useContext } from 'react';
import { Select } from 'antd';
// 定义一个类
//使用索引签名来定义Template，这允许任何字符串作为键名
interface Item {
    [key: string]: any; // 这里假设每个键的值都是字符串
}
export default class UtilsClass {
    // 类的构造函数
    constructor() {}
    /**
     *
     * @param array 需要处理的数组
     * @param key 需要挑出来的数组指定的key
     * @returns
     */
    public useSelectArray(array: Item[], key: string): any {
        let selectOptionData = array.filter((item) => {
            return Object.keys(item).toString() === key;
        });
        return selectOptionData;
    }
    /**
     *
     * @param array 需要被排序的二维数组
     * @param arraySort 根据一维数组顺序排序且一位数组里的每个元素都属于array里的value
     * @param key 被排序数组里的key
     * @returns
     */
    public useSort(array: Item[], arraySort: string[], key: { label: string }) {
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
    /**
     *
     * @param template 给option组件指定key
     * @returns 返回一个Con函数 在  <Select onChange={onChange}>{Con(am)}</Select>组件里调用
     */
    public useOption(template: string[]) {
        const Con = (value: Item[]): ReactElement => {
            // 由于template的确切键是不确定的，这里我们通过Object.values获取所有的值，然后按顺序使用
            const templateKeys = Object.values(template);

            if (templateKeys.length !== 2) {
                throw new Error('useOption需要传一个数组且里面包含两个key');
            }
            return (
                <>
                    {value.map((item, index) => {
                        return (
                            <Select.Option key={index} value={item[templateKeys[1]]}>
                                {item[templateKeys[0]]}
                            </Select.Option>
                        );
                    })}
                </>
            );
        };
        return Con;
    }
}
//     /**
//      * react跨级组件间传值
//      * @param context context对象，保证多次调用拿到同一个对象
//      * @param type 每次调用时的组件类型（父组件｜｜子组件）
//      * @param initValue 祖先组件要传的值，必须是数组类型
//      * @param component 祖先组件返回来的ReactElement
//      * @returns
//      */

//     public useSendParams(
//         context: React.Context<null>,
//         type?: { type: string },
//         initValue?: any[],
//         component?: ReactElement
//     ) {
//         switch (type && type.type) {
//             case 'father':
//                 return <context.Provider value={initValue}>{component}</context.Provider>;
//                 break;
//             case 'son':
//                 let obj = useContext(context);
//                 return obj;
//                 break;
//         }
//     }
// }
