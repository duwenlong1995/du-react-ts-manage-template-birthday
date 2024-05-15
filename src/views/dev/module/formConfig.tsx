interface FormFieldConfig {
    type: string;
    inputType?: string;
    label?: string;
    name?: string;
    rules?: ValidationRule[];
    groupOptions?: groupOptions[];
    disabled?: boolean;
    defaultValue?: string[];
    onChange?: (val: any) => void;
    option?: any[];
    defaultKey?: string[];
    buttonType?: string;
    htmlButtonType?: string;
    typeButton?: string | undefined;
    content?: string;
    options?: Option[];
    span?: number;
}
interface ValidationRule {
    required?: boolean;
    message?: string;
}
interface groupOptions {
    label?: string;
    value?: string;
}
interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}
export const formConfig: FormFieldConfig[] = [
    {
        type: 'input',
        inputType: 'text',
        label: 'Input',
        name: 'Input',
        rules: [{ required: true, message: 'Please input!' }],
        defaultValue: ['Apple'],
        onChange: (val) => {
            console.log(val.target.value);
        },
        span: 24
    },
    {
        type: 'select',
        label: 'Select',
        name: 'Select',
        option: [
            { label: 'xiaodu', id: 0 },
            { label: 'wang', id: 1 },
            { label: 'li', id: 2 },
            { label: 'laowang', id: 3 }
        ],
        defaultKey: ['label', 'id'],
        defaultValue: ['0'],
        onChange: (val) => {
            // console.log(val);
        }
    },
    {
        type: 'cascader',
        label: 'Cascader',
        name: 'Cascader',
        options: [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake'
                            }
                        ]
                    }
                ]
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: 'datePicker',
        label: 'DatePicker',
        name: 'DatePicker'
    },
    {
        type: 'rangePicker',
        label: 'RangePicker',
        name: 'RangePicker'
    },
    {
        type: 'checkbox',
        label: 'Checkbox',
        name: 'Checkbox'
        // disabled: true
    },
    {
        type: 'checkboxGroup',
        label: 'CheckboxGroup',
        name: 'CheckboxGroup',
        groupOptions: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange' }
        ],
        defaultValue: ['Apple', 'Pear'],
        onChange: (val) => {
            // console.log(val);
        }
    },
    {
        type: 'radio',
        label: 'Radio',
        name: 'Radio'
        // disabled: true
    },
    {
        type: 'switch',
        label: 'Switch',
        name: 'Switch'
        // disabled: true
    }

    // {
    //     type: 'button',
    //     typeButton: 'primary',
    //     htmlButtonType: 'submit',
    //     content: '提交'
    // }
];
