import { Image } from 'antd';
import workbenchImage from '../../assets/img/base/workbench-o.png';

const Index = () => {
    return (
        <div className='w-full h-full flex items-center justify-center flex-wrap'>
            <div className='h-[360px] flex items-center justify-center flex-wrap'>
                <Image className='block' width={460} src={workbenchImage} />
                <div className='text-[#535965] tracking-[8px] font-bold w-full mt-[10px] text-[50px] text-center'>
                    WELCOME
                </div>
            </div>
        </div>
    );
};

export default Index;
