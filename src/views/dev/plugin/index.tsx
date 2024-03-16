// 复制到剪切板的插件
import CopyToClipboard from './components/CopyToClipboard';
import { Divider } from 'antd';
import Tabs from './components/Tabs';
import TabPanel from './components/TabPanel';
const DevPlugin = () => {
    return (
        <div className='w-full h-full'>
            <p className='text-[30px]'>全局插件总览</p>
            <Divider plain></Divider>
            <div>
                <div className='text-[24px]'>复制到剪切板</div>
                <div className='mt-[24px]'>
                    <CopyToClipboard />
                    <Tabs defaultTabKey='tab1'>
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
