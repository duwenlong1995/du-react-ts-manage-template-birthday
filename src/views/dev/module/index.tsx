import { Button, Select, Row } from 'antd';
import CircleProgress from './components/CircleProgress';
import useSort from './hooks/useSort';
// import useOption from './hooks/useOption';
import UtilsClass from './utils/UtilsClass';
import context from './utils/context';
import { useState } from 'react';
import FormDialog from './components/FormDialog';
import FormModule from './components/FormModule';
import { formConfig } from './formConfig';

function DevInfo() {
    const myInstance = new UtilsClass();
    // 按照已有的数组，给乱序的数组排序
    const data: any = [
        { name: '狗牙', age: 3, sex: '女', hobby: '踢足球' },
        { name: 'Silly', age: 2, sex: '女', hobby: '打篮球' },
        { name: '狗老大', age: 2, sex: '女', hobby: '打篮球' },
        { name: 'Tom', age: 2, sex: '女', hobby: '打篮球' },
        { name: 'Lily', age: 2, sex: '女', hobby: '打篮球' }
    ];
    const arraySort: any = ['狗老大', '狗牙', 'Lily', 'Tom', 'Silly'];

    const [array] = useSort(data, arraySort, { label: 'name' });
    const onChange = (val: any) => {
        console.log(val);
    };
    let am: any = [
        { label: 'xiaodu', id: 0 },
        { label: 'wang', id: 1 },
        { label: 'li', id: 2 },
        { label: 'laowang', id: 3 }
    ];
    const defaultValue = { label: 'xiaodu', id: 0 };
    /**
     * 1.dataOption需要排序的option二维数组
     * 2.'lily'是过滤出数组里的key
     * 3.['label', 'id']必传
     */
    // const Con = useOption(['label', 'id']);
    const dataOption: any = [
        {
            name: [
                { name: 'jack', id: 0 },
                { name: 'lucy', id: 1 },
                { name: 'Yiminghe', id: 2 },
                { name: 'disabled', id: 3 }
            ]
        },
        {
            lily: [
                { name: 'tom', id: 0 },
                { name: 'sam', id: 1 },
                { name: 'gouya', id: 2 },
                { name: 'goulaoda', id: 3 }
            ]
        },
        {
            sam: [
                { name: 'xiaodu', id: 0 },
                { name: 'wang', id: 1 },
                { name: 'li', id: 2 },
                { name: 'laowang', id: 3 }
            ]
        }
    ];
    let res1 = myInstance.useSelectArray(dataOption, 'lily');
    let res2 = myInstance.useSort(data, arraySort, { label: 'name' });
    const Con = myInstance.useOption(['label', 'id']);
    // 弹窗
    const [visible, setVisible] = useState(false);
    const showFormDialog = () => {
        setVisible(true);
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setVisible(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setVisible(false);
    };
    // 表单方法
    const onFinish = (val: any) => {
        // console.log(val);
    };
    const getFormData = (val: any) => {
        console.log(val);
    };
    // const getFormData2=(val: any) =>{

    // }
    // 使用示例
    const formItemLayout = {
        labelCol: {
            xs: { span: 0 },
            sm: { span: 8 }
        }
    };
    return (
        <div className='w-[80%] text-[18px]'>
            <context.Provider value={{ name: 1 }}>
                <CircleProgress percent={40} color='#4CAF50' trackColor='#EEEEEE' size='120px' thickness={8} dur={0.1}>
                    <h1>80分</h1>
                </CircleProgress>
                <Button onClick={showFormDialog}>表单弹窗</Button>
                <Select onChange={onChange} value={defaultValue}>
                    {Con(am)}
                </Select>
                <FormDialog
                    title='表单弹窗'
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                    width={1000}
                >
                    <Row>
                        <FormModule
                            {...formItemLayout}
                            onFinish={onFinish}
                            formData={formConfig}
                            getForm={getFormData}
                        ></FormModule>
                        <FormModule
                            {...formItemLayout}
                            onFinish={onFinish}
                            formData={formConfig}
                            getForm={getFormData}
                        ></FormModule>
                    </Row>
                </FormDialog>
            </context.Provider>
        </div>
    );
}

export default DevInfo;
