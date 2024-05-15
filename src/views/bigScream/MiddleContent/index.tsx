import { memo } from 'react';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export default memo(function MiddleContent() {
    const mount = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        //创建一个长方体几何对象Geometry
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        //创建一个材质对象Material
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, //0xff0000设置材质颜色为红色
        });
        // 两个参数分别为几何体geometry、材质material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(0, 10, 0);
        scene.add(mesh);
        // 实例化一个透视投影相机对象
        // 定义相机输出画布的尺寸(单位:像素px)
        const width = 3480; //宽度
        const height = 2160; //高度
        // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
        const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
        //相机在Three.js三维坐标系中的位置
        // 根据需要设置相机位置具体值
        camera.position.set(200, 200, 200);
        //相机观察目标指向Threejs 3D空间中某个位置
        camera.lookAt(0, 0, 0); //坐标原点
        // 相机位置xyz坐标：0,10,0
        mesh.position.set(0, 10, 0);
        // 相机位置xyz坐标：200, 200, 200
        camera.position.set(200, 200, 200);
        // 创建渲染器对象
        const renderer = new THREE.WebGLRenderer();
        // 定义threejs输出画布的尺寸(单位:像素px)
        renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
        renderer.render(scene, camera); //执行渲染操作
        document.body.appendChild(renderer.domElement);
        document.getElementById('webgl').appendChild(renderer.domElement);
    }, []);

    return (
        <>
            <div id='webgl'></div>
        </>
    );
});
