/**
 *自定义option字段，处理多个option数组组成的数据，根据所需过滤出来
 */
import { ReactElement } from 'react';
import { Select } from 'antd';

//使用索引签名来定义Template，这允许任何字符串作为键名
interface Item {
    [key: string]: string; // 这里假设每个键的值都是字符串
}

export default function useOption(template: string[]) {
    const Con = (value: Item[]): ReactElement => {
        // 由于template的确切键是不确定的，这里我们通过Object.values获取所有的值，然后按顺序使用
        const templateKeys = Object.values(template);

        if (templateKeys.length !== 2) {
            throw new Error('Template should have exactly two keys: one for display text and one for value.');
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
