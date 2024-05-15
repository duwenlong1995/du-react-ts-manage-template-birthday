// import { memo } from 'react';
import { Modal } from 'antd';
import { ReactElement, useContext } from 'react';
import context from '../../utils/context';

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
    width?: number;
}

const FormDialog = (props: FormDialogProps) => {
    let obj = useContext(context);
    const modalChildren = props.children;
    return (
        <>
            <Modal {...props}>{modalChildren}</Modal>
        </>
    );
};
export default FormDialog;
