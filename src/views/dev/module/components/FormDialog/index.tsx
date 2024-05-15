// import { memo } from 'react';
import { Modal, Button, Select, Input, Form, Checkbox, Cascader, DatePicker, Radio, Switch } from 'antd';
import { ReactElement } from 'react';
interface FormDialogProps {
    title?: string;
    open?: boolean;
    onOk?: (e: any) => void;
    onCancel?: (e: any) => void;
    okButtonProps?: {
        disabled?: boolean;
    };
    cancelButtonProps?: {
        disabled?: boolean;
    };
    children?: ReactElement;
}

const FormDialog = (props: FormDialogProps) => {
    const modalChildren = props.children;
    return (
        <>
            <Modal {...props}>{modalChildren}</Modal>
        </>
    );
};
export default FormDialog;
