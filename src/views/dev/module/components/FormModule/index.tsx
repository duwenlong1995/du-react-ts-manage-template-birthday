import { Button, Select, Input, Form, Checkbox, Cascader, DatePicker, Radio, Switch } from 'antd';
import UtilsClass from '../../utils/UtilsClass';

const { RangePicker } = DatePicker;
type configProps = {
    type?: string;
    inputType?: string;
    label?: string;
    name?: string;
    rules?: [
        {
            required?: boolean;
            message?: string;
        }
    ];
    disabled?: boolean;
    groupOptions?: [];
    defaultValue?: string[];
    onChange?: () => void;
    option: any[];
    defaultKey: string[];
    htmlButtonType?: any;
    typeButton: any;
    content?: string;
    options?: Option[];
};
interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const FormModule = (props: any) => {
    const myInstance = new UtilsClass();
    const { formData } = props;

    const renderInput = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Input
                    type={config.inputType}
                    disabled={config.disabled}
                    onChange={config.onChange}
                    defaultValue={config.defaultValue}
                />
            </Form.Item>
        );
    };
    const renderSelect = (config: configProps) => {
        const option = config.option;
        const key = config.defaultKey;
        const Con = myInstance.useOption(key);

        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Select disabled={config.disabled} onChange={config.onChange} defaultValue={config.defaultValue}>
                    {Con(option)}
                </Select>
            </Form.Item>
        );
    };
    const renderCascader = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Cascader
                    disabled={config.disabled}
                    options={config.options}
                    onChange={config.onChange}
                    defaultValue={config.defaultValue}
                />
            </Form.Item>
        );
    };
    const renderDatePicker = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <DatePicker disabled={config.disabled} onChange={config.onChange} />
            </Form.Item>
        );
    };
    const renderRangePicker = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <RangePicker disabled={config.disabled} onChange={config.onChange} />
            </Form.Item>
        );
    };
    const renderCheckbox = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Checkbox disabled={config.disabled} onChange={config.onChange} />
            </Form.Item>
        );
    };
    const renderCheckboxGroup = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Checkbox.Group
                    options={config.groupOptions}
                    disabled={config.disabled}
                    defaultValue={config.defaultValue}
                    onChange={config.onChange}
                />
            </Form.Item>
        );
    };

    const renderRadio = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Radio.Group>
                    <Radio disabled={config.disabled} onChange={config.onChange} />
                </Radio.Group>
            </Form.Item>
        );
    };
    const renderSwitch = (config: configProps) => {
        return (
            <Form.Item label={config.label} name={config.name} rules={config.rules}>
                <Switch disabled={config.disabled} onChange={config.onChange} />
            </Form.Item>
        );
    };
    const renderButton = (config: configProps) => {
        return (
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type={config.typeButton} htmlType={config.htmlButtonType}>
                    {config.content}
                </Button>
            </Form.Item>
        );
    };
    const renderForm = () => {
        return formData.map((config: configProps) => {
            const { type } = config;
            if (type === 'input') {
                return renderInput(config);
            } else if (type === 'select') {
                return renderSelect(config);
            } else if (type === 'cascader') {
                return renderCascader(config);
            } else if (type === 'datePicker') {
                return renderDatePicker(config);
            } else if (type === 'rangePicker') {
                return renderRangePicker(config);
            } else if (type === 'radio') {
                return renderRadio(config);
            } else if (type === 'switch') {
                return renderSwitch(config);
            } else if (type === 'checkbox') {
                return renderCheckbox(config);
            } else if (type === 'checkboxGroup') {
                return renderCheckboxGroup(config);
            } else if (type === 'button') {
                return renderButton(config);
            }
            // 可以添加更多类型的字段，例如 select, textarea 等
        });
    };
    return (
        <>
            <Form {...props}>{renderForm()}</Form>
        </>
    );
};
export default FormModule;
