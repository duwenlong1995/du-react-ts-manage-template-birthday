// 复制到剪切板的插件
import { useNavigate } from 'react-router-dom';
import CopyToClipboard from './components/CopyToClipboard';
import { Button, Divider } from 'antd';
import Tabs from '@/resources/components/Tabs';
import TabPanel from '@/resources/components/TabPanel';
const DevPlugin = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full'>
            <p className='text-[30px]'>全局插件总览</p>
            <Divider plain></Divider>
            <div>
                <Button
                    onClick={() => {
                        navigate('/BigScream');
                    }}
                >
                    去往大屏页
                </Button>
                <div className='text-[24px]'>复制到剪切板</div>
                <div className='mt-[24px]'>
                    <CopyToClipboard />
                    <Tabs location='middle' defaultTabKey='tab1'>
                        <TabPanel tabKey='tab1' label='基础页'>
                            基础页
                        </TabPanel>
                        <TabPanel tabKey='tab2' label='增强页'>
                            增强页
                        </TabPanel>
                        <TabPanel tabKey='tab3' label='扩展页'>
                            扩展页
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default DevPlugin;
