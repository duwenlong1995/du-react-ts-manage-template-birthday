import { ReactNode } from 'react';

type IconItem = {
    name?: string;
    DOM?: (size: { width: string; height: string }, color: string) => ReactNode;
};

export const computedIconShow = (
    value?: IconItem[],
    name?: string,
    size?: { width?: string; height?: string },
    color?: string
): ReactNode[] => {
    let iconComp = value?.map((item, index) => {
        switch (item.name) {
            case name:
                return <div key={index}>{item.DOM(size, color)}</div>;
            default:
                return null; // 不匹配时返回 null，不渲染任何内容
        }
    });
    return iconComp;
};

/**
 * watch_icon
 * arrow_down
 * arrow_up
 * setting
 * close
 * search
 * modify
 * delete
 * choose
 * edit
 * info
 * upload_success
 * upload_defeat
 */
export const iconData = [
    {
        name: 'watch_icon',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716613862777'
                    viewBox='0 0 1588 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='3449'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M787.11979166 90.125c232.875 0 445.078125 123.440625 636.778125 370.321875a84.375 84.375 0 0 1 0 103.10625C1232.19791666 810.434375 1019.99479166 933.875 787.11979166 933.875S342.04166666 810.434375 150.34166666 563.553125a84.375 84.375 0 0 1 0-103.10625C342.04166666 213.565625 554.24479166 90.125 787.11979166 90.125z m0 84.375C582.93229166 174.5 393.93229166 284.440625 217.16666666 512.253125l18.815625 23.540625C401.10416666 739.475 576.68854166 841.7375 765.35104166 849.078125L787.11979166 849.5c197.015625 0 379.771875-102.2625 550.96875-313.790625l18.9-23.878125-18.73125-23.625c-165.0375-203.68125-340.621875-305.94375-529.284375-313.284375L787.11979166 174.5z'
                        p-id='3450'
                    ></path>
                    <path
                        d='M787.11979166 258.875a253.125 253.125 0 1 1 0 506.25 253.125 253.125 0 0 1 0-506.25z m0 84.375a168.75 168.75 0 1 0 0 337.5 168.75 168.75 0 0 0 0-337.5z'
                        p-id='3451'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'arrow_down',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716616534495'
                    viewBox='0 0 1843 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='3592'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M200.23228105 114.89886368a84.32794528 84.32794528 0 0 1 119.40837012 0L934.56002589 729.98689448 1549.4794006 114.89886368A84.32794528 84.32794528 0 0 1 1657.08185841 105.45413382l11.80591232 9.61338593a84.32794528 84.32794528 0 0 1 0 119.40837011l-674.62355978 674.62355979a84.32794528 84.32794528 0 0 1-119.40837012 0l-674.62355978-674.62355979a84.32794528 84.32794528 0 0 1 0-119.40837011z'
                        p-id='3593'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'arrow_up',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626317007'
                    viewBox='0 0 1843 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4589'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M1634.43438549 909.10113631a84.32794528 84.32794528 0 0 1-119.40837012 1e-8L900.10664065 294.01310552 285.18726594 909.10113631A84.32794528 84.32794528 0 0 1 177.58480813 918.54586617l-11.80591232-9.61338592a84.32794528 84.32794528 0 0 1 0-119.40837011l674.62355978-674.62355979a84.32794528 84.32794528 0 0 1 119.40837012 0l674.62355978 674.62355979a84.32794528 84.32794528 0 0 1 0 119.40837011z'
                        p-id='4590'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'setting',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716625774919'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='3734'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M502.464 384.256A128.64 128.64 0 0 0 384 512c0 70.4 57.664 128.128 128 128.128S640 582.4 640 512c0-70.4-57.664-128.128-128-128.128l-9.536 0.384z m20.8-64A192.64 192.64 0 0 1 704 512a192.512 192.512 0 0 1-192 192.128c-105.664 0-192-86.4-192-192.128a192.512 192.512 0 0 1 192-192.128l11.264 0.32z'
                        p-id='3735'
                    ></path>
                    <path
                        d='M603.52 32c29.12 0 53.12 20.544 57.408 48.832l14.592 98.56c17.088 7.744 34.24 17.152 50.56 28.352l96.704-37.76a58.624 58.624 0 0 1 70.208 25.728l90.88 153.408c14.528 25.728 8.512 55.68-13.76 72.896l-81.344 61.696c0.832 8.576 1.728 17.984 1.728 28.288 0 10.24-0.896 19.712-1.728 28.288l81.344 61.696a55.808 55.808 0 0 1 14.592 72l-91.648 155.136c-9.408 18.048-29.12 28.288-49.664 28.288a57.6 57.6 0 0 1-20.608-3.392l-96.768-37.76a374.08 374.08 0 0 1-50.56 28.288l-14.528 99.456a57.408 57.408 0 0 1-57.408 48H420.224c-29.12 0-53.952-21.44-57.344-48.832l-14.592-98.56a328.448 328.448 0 0 1-50.56-28.352l-96.768 37.76a58.624 58.624 0 0 1-70.208-25.728L39.936 674.88c-14.528-25.728-8.576-55.68 13.696-72.896l81.408-61.696c-1.728-10.24-1.728-19.712-1.728-28.288s0.832-17.984 1.728-28.288L53.632 422.016a55.936 55.936 0 0 1-13.696-72.896l91.648-154.24c9.408-18.048 29.12-28.288 49.664-28.288a57.6 57.6 0 0 1 20.544 3.392l96.832 37.76c17.088-11.2 33.408-20.608 50.56-28.288L362.88 80A57.408 57.408 0 0 1 420.224 32H603.52z m-5.056 64H425.216l-17.472 127.232-32.32 14.528c-12.8 5.76-25.92 13.184-41.92 23.616l-27.52 17.92-121.92-47.552L98.56 375.68l103.168 78.272-4.352 54.208 0.192 16.448a50.56 50.56 0 0 0 0.576 5.12l6.4 38.208-106.048 80.32 85.12 143.744 122.432-47.616 27.84 19.072c12.672 8.64 26.368 16.32 40.704 22.784l31.872 14.336 18.816 127.424h173.248l18.688-127.36 32-14.4c12.8-5.76 25.92-13.184 41.92-23.616l27.52-17.92 121.792 47.488 84.992-143.744L821.504 569.6l3.584-35.648c0.768-7.552 1.152-12.672 1.28-17.344L826.56 512c0-4.544-0.256-8.96-0.768-15.168l-4.224-42.432 103.68-78.656-85.056-143.808-122.368 47.68-27.904-19.072a264.32 264.32 0 0 0-40.64-22.784l-31.936-14.336L598.464 96z'
                        p-id='3736'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'close',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716625868653'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='3877'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M201.99666446 151.66888528A35.64585879 35.64585879 0 0 0 151.61986588 201.99540798l310.00333555 310.00333481-310.00333555 310.00333555a35.69613469 35.69613469 0 0 0 50.37679858 50.37679928l310.00333554-310.00333553 310.00333554 310.00333554a35.64585879 35.64585879 0 0 0 50.37679858-50.37679929L562.37679857 511.99874279l310.00333555-310.00333481A35.69613469 35.69613469 0 0 0 822.00333554 151.66888528L512 461.62194422 201.99666446 151.66888528z'
                        p-id='3878'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'search',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716625925332'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4019'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M179.28621494 178.90136035a397.71160313 397.71160313 0 0 1 584.96748311 538.03751309l188.44901367 188.5152999a33.14263359 33.14263359 0 0 1-46.86368379 46.86368379l-188.44901455-188.44901455a397.71160313 397.71160313 0 0 1-538.10379844-584.96748222z m46.86368379 46.86368379a331.42633594 331.42633594 0 1 0 468.76940947 468.76940859 331.42633594 331.42633594 0 0 0-468.76940947-468.76940859z'
                        p-id='4020'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'modify',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626001376'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4161'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M103.39455253 899.1125h817.20000001V962H103.39455253zM674.89455254 62l196.87499999 184.33125-562.21874999 563.5125H107.95080254v-174.99375L674.89455254 62zM551.08830254 276.425l-380.25 384.1875v86.34375h112.725l368.775-369.61875-101.25-100.9125z m125.55-126.7875l-81.28125 82.125 101.3625 101.025 84.7125-84.9375-104.79375-98.2125z'
                        p-id='4162'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'delete',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626059946'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4303'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M905.54567188 204.41433974a34.43524629 34.43524629 0 0 1 0 68.87049258H118.45432812a34.43524629 34.43524629 0 0 1 0-68.87049258h787.09134376z'
                        p-id='4304'
                    ></path>
                    <path
                        d='M634.98302246 62a83.62845528 83.62845528 0 0 1 83.62845527 83.62845528v93.22113076h-68.87049257V145.62845527a14.75796269 14.75796269 0 0 0-14.75796269-14.75796269h-245.96604493a14.75796269 14.75796269 0 0 0-14.7579627 14.7579627v94.25418837H305.38852227V145.62845527A83.62845528 83.62845528 0 0 1 389.01697754 62h245.96604492zM822.99946748 327.39736221a34.43524629 34.43524629 0 0 1 34.43524629 34.43524628v516.52869434a83.62845528 83.62845528 0 0 1-83.62845528 83.62845527H252.45662979a83.62845528 83.62845528 0 0 1-83.62845528-83.62845527v-516.52869434a34.43524629 34.43524629 0 1 1 68.87049258 0v516.52869434a14.75796269 14.75796269 0 0 0 14.7579627 14.7579627h521.3496287a14.75796269 14.75796269 0 0 0 14.7579627-14.7579627v-516.52869434a34.43524629 34.43524629 0 0 1 34.43524629-34.43524628z'
                        p-id='4305'
                    ></path>
                    <path
                        d='M389.01697754 401.18717568a34.43524629 34.43524629 0 0 1 34.43524629 34.43524629v295.15925391a34.43524629 34.43524629 0 1 1-68.87049258 0v-295.15925391a34.43524629 34.43524629 0 0 1 34.43524629-34.43524629zM634.98302246 401.18717568a34.43524629 34.43524629 0 0 1 34.43524629 34.43524629v295.15925391a34.43524629 34.43524629 0 1 1-68.87049258 0v-295.15925391a34.43524629 34.43524629 0 0 1 34.4352463-34.43524629z'
                        p-id='4306'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'choose',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626120496'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4447'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M864.768 287.872a44.8 44.8 0 0 1 62.464 64.256l-460.928 448a44.8 44.8 0 0 1-62.464 0L96.768 501.632a44.8 44.8 0 0 1 62.464-64.192l275.84 268.096 429.696-417.664z'
                        p-id='4448'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'edit',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626409915'
                    viewBox='0 0 1141 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4731'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M874.06896553 62a87.93103447 87.93103447 0 0 1 87.93103447 87.93103447v21.36206865a36.20689628 36.20689628 0 0 1-72.41379346 0V149.93103447a15.51724102 15.51724102 0 0 0-15.51724102-15.51724101h-724.13793105a15.51724102 15.51724102 0 0 0-15.51724101 15.51724102v724.13793105a15.51724102 15.51724102 0 0 0 15.51724101 15.51724101h724.13793105a15.51724102 15.51724102 0 0 0 15.51724102-15.51724101v-150.51724102a36.20689628 36.20689628 0 0 1 72.41379346 0v150.51724102a87.93103447 87.93103447 0 0 1-87.93103448 87.93103447h-724.13793105A87.93103447 87.93103447 0 0 1 62 874.06896553v-724.13793106A87.93103447 87.93103447 0 0 1 149.93103447 62h724.13793106z m70.13793075 177.00000029l90 51.98275811a62.06896582 62.06896582 0 0 1 22.75862081 84.77586211l-229.65517266 397.7586211a46.55172393 46.55172393 0 0 1-22.5 19.75862021l-117.25861992 48.62069033a46.55172393 46.55172393 0 0 1-64.39655214-42.98275899v-115.4999997a46.55172393 46.55172393 0 0 1 6.20689657-23.2758624l230.06896523-398.43103448a62.06896582 62.06896582 0 0 1 84.77586211-22.7586208z m-87.20689657 171.72413789l-161.37931026 279.56896524-0.05172363 69.82758632 73.44827578-30.41379316 160.03448262-277.2413789-72.05172451-41.79310401zM409.94827578 478.58620713a36.20689628 36.20689628 0 1 1 0 72.41379258H256.43103417a36.20689628 36.20689628 0 1 1 1e-8-72.41379258h153.5172416z m506.99999971-171.7758624l-23.74137861 41.12068974 72.05172363 41.74137949 23.793104-41.22413789-72.10344902-41.63793135z m-350.17241309-35.17241397a36.20689628 36.20689628 0 1 1 0 72.41379346h-310.34482822a36.20689628 36.20689628 0 1 1 0-72.41379346h310.34482822z'
                        p-id='4732'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'info',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626450511'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='4873'
                    width={size.width}
                    style={{ fill: color }}
                    height={size.height}
                >
                    <path
                        d='M512 62a450 450 0 1 1 0 900A450 450 0 0 1 512 62z m50.0000001 349.9999998H461.9999999v349.99999981h100.0000002V411.9999998z m0-149.99999941H461.9999999v99.99999932h100.0000002V262.00000039z'
                        p-id='4874'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'upload_success',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626473185'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='5015'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M512 62a450 450 0 1 1 0 900A450 450 0 0 1 512 62z m173.75625 281.25l-226.6875 226.63125-128.8125-128.8125-59.68125 59.625 158.625 158.7375 29.86875 29.8125 286.3125-286.3125L685.8125 343.25z'
                        p-id='5016'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'upload_defeat',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716626528773'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='5157'
                    width={size.width}
                    style={{ fill: color }}
                    height={size.height}
                >
                    <path
                        d='M512 62a450 450 0 1 1 0 900A450 450 0 0 1 512 62z m186.13125 250.9875a42.1875 42.1875 0 0 0-59.625 0.84375L505.925 450.29375 373.5125 313.83125a42.1875 42.1875 0 0 0-59.625-0.84375l-4.1625 4.66875a42.1875 42.1875 0 0 0 3.2625 55.0125l134.2125 138.15-134.2125 138.20625a42.1875 42.1875 0 0 0 0.84375 59.625l4.8375 4.05a42.1875 42.1875 0 0 0 54.84375-4.89375l132.46875-136.4625 132.46875 136.4625a42.1875 42.1875 0 0 0 59.625 0.84375l4.21875-4.66875a42.1875 42.1875 0 0 0-3.31875-54.95625L564.7625 510.81875l134.2125-138.15a42.1875 42.1875 0 0 0-0.84375-59.68125z'
                        p-id='5158'
                    ></path>
                </svg>
            );
        },
    },
    {
        name: 'run_able',
        DOM: (size: { width: string; height: string }, color: string) => {
            return (
                <svg
                    t='1716627729098'
                    viewBox='0 0 1024 1024'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    p-id='5299'
                    width={size.width}
                    height={size.height}
                    style={{ fill: color }}
                >
                    <path
                        d='M564.59030029 311.59999971l179.21999971 179.16000029 0.9 0.96000029 1.55999971 1.85999942-2.45999971-2.81999971a30.12000029 30.12000029 0 0 1 8.75999971 21.24v1.19999971a30.17999971 30.17999971 0 0 1-0.29999971 3.12000029l0.29999971-4.32a30.12000029 30.12000029 0 0 1-8.75999971 21.24L564.59030029 712.40000029a29.99999971 29.99999971 0 1 1-42.42000058-42.42000058L650.15029971 541.99999971H422.57030029a29.99999971 29.99999971 0 1 1 0-59.99999942H650.15029971L522.17029971 354.02000029a29.99999971 29.99999971 0 0 1-3.42-38.28000058l3.42-4.14a29.99999971 29.99999971 0 0 1 42.42000058 0z'
                        p-id='5300'
                    ></path>
                    <path
                        d='M301.97030029 469.99999971a42.00000029 42.00000029 0 1 1 0 84.00000058 42.00000029 42.00000029 0 0 1 0-84.00000058z'
                        p-id='5301'
                    ></path>
                    <path
                        d='M924.3503 563.95999971l5.4 0.60000029a29.99999971 29.99999971 0 0 1 23.64000029 35.21999971A450.60000029 450.60000029 0 0 1 511.9703 962 450.60000029 450.60000029 0 0 1 70.55029971 599.77999971a29.99999971 29.99999971 0 1 1 58.80000058-11.63999971A390.6 390.6 0 0 0 511.9703 901.99999971a390.6 390.6 0 0 0 382.56000029-313.79999942 29.99999971 29.99999971 0 0 1 35.33999942-23.58l-5.4-0.60000029zM512.03030029 62a450.60000029 450.60000029 0 0 1 441.41999942 362.22000029 29.99999971 29.99999971 0 1 1-58.79999971 11.63999971A390.6 390.6 0 0 0 511.9703 122.00000029 390.6 390.6 0 0 0 129.35030029 435.79999971a29.99999971 29.99999971 0 0 1-58.92000029-11.63999971A450.60000029 450.60000029 0 0 1 511.9703 62z'
                        p-id='5302'
                    ></path>
                </svg>
            );
        },
    },
];
