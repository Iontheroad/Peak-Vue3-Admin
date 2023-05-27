<template>
  <div id="three-box">
    <div class="three-box-body"></div>
    <div class="plantoperate">
      <div class="fangda" @click="amplify">
        <el-icon><ZoomIn /></el-icon>
      </div>
      <div class="fuwei" @click="reset">
        <el-icon><Aim /></el-icon>
      </div>
      <div class="suoxiao" @click="reduce">
        <el-icon><ZoomOut /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Three3D">
import { ZoomIn, Aim, ZoomOut } from "@element-plus/icons-vue";
import * as THREE from "three";

// import Stats from "three/addons/libs/stats.module.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { onMounted } from "vue";

let camera: any, scene: any, renderer: any, stats: any, controls: any;
onMounted(() => {
  init();
});

let initData = {
  showLoading: true,
  timer: null,
  number: 90,
  model: null as any,
  size: 0 as number,
};

let container: HTMLDivElement;
function init() {
  container = document.getElementsByClassName(
    "three-box-body"
  )[0] as HTMLDivElement;
  // 1.创建场景
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x22ff00, 0.1, 1000); //雾化场景
  // scene.background = new THREE.Color(0xf65144);

  // 2.创建透视摄像机
  camera = new THREE.PerspectiveCamera(
    90, // 摄像机视锥体垂直视野角度
    container.clientWidth / container.clientHeight, // 相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height
    // 近端渲染距离和远端距离：这两个是设置相机可以看到的场景内容的范围，只有离相机的距离大于near值，小于far值，且在相机的可视角度之内，才能被相机投影到。
    0.1, // 近截面（near）
    1000 // 远截面（far）
  );
  camera.position.set(0, -100, 20);
  camera.up.set(0, 1, 0); // 默认y轴朝上
  // camera.position.set(0, 100, 20); // 相机位置
  // camera.up.set(0, 0, 1); // z轴朝上
  // camera.lookAt(0, 0, 0); // 相机观察目标位置

  // 3.创建Three.JS渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
    logarithmicDepthBuffer: true,
  }); //alpha:true
  renderer.setSize(container.clientWidth, container.clientHeight); // 设置渲染器大小
  renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas。
  renderer.outputEncoding = THREE.sRGBEncoding; // 将纹理和颜色编码为sRGB的方法
  renderer.setClearColor(0xdadcde, 0); // 设置背景颜色，
  container.appendChild(renderer.domElement); // 把渲染器添加到页面

  // AxesHelper：辅助观察的坐标系
  // 坐标轴颜色红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上。
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);

  // 4.创建控制器对象 设置鼠标操作（控制器）
  // OrbitControls本质上就是改变相机的参数，比如相机的位置属性，改变相机位置也可以改变相机拍照场景中模型的角度，实现模型的360度旋转预览效果，改变透视投影相机距离模型的距离，就可以改变相机能看到的视野范围。
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); // 调整模型在网格上的位置
  controls.enablePan = false; // 是否开启右键拖拽
  controls.enableDamping = true; // 默认为false ，设置为true则启用阻尼(惯性)
  controls.enableZoom = true; // 是否启用缩放

  // 创建网格对象
  const mesh = new THREE.Mesh();

  // 预过滤的Mipmapped辐射环境贴图
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  //给场景添加环境光效果
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment()
    // 0.01 // 去掉光环境值
  ).texture;

  // 添加平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(0, 0, 100);
  directionalLight.castShadow = true;
  directionalLight.target = mesh;
  scene.add(directionalLight);

  // 设置点光源(就像灯泡)
  const light = new THREE.PointLight(0xffffff, 0.3);
  light.position.set(100, 200, -300); // 设置光源位置
  scene.add(light);

  // 设置半球光
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.2);
  hemiLight.position.set(20, -10, -10); //
  scene.add(hemiLight);

  // 设置环境光 (没有特定方向，只是整体改变场景的光照明暗。)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 设置颜色
  scene.add(ambientLight);

  //创建模型加载器
  const loader = new FBXLoader();
  loader.load(
    "http://119.91.22.164:8085/Model/BaiHuaDuJuan.fbx",
    function (model: any) {
      // console.log(model);
      initData.model = model;

      //动态设置模型大小
      const box = new THREE.Box3().setFromObject(model); // 计算模型的包围盒
      const center = box.getCenter(new THREE.Vector3()); // 获取包围盒中心点
      const size = box.getSize(new THREE.Vector3()); // 获取包围盒尺寸
      console.log(size.x, size.y, size.z, size.z.toFixed(2));
      // 计算缩放比例，保证模型大小相同
      const maxSize = Math.max(size.x, size.y, size.z);
      // TODO: 确定模型的中心点
      initData.size = maxSize;
      // 重新设置模型的位置和大小
      model.position.sub(center); // 将模型居中到原点
      model.scale.set(
        initData.number / maxSize,
        initData.number / maxSize,
        initData.number / maxSize
      ); // 缩放模型至目标大小
      // 遍历模型
      model.traverse(function (child: any) {
        if (child.isMesh) {
          //不让模型材料丢失
          child.material.side = THREE.DoubleSide;
          //模型贴图边缘透明
          child.material.alphaTest = 0.1;
        }
      });

      model.encoding = THREE.sRGBEncoding;
      // 设置模型旋转中心位置
      function changePivot(
        x: number,
        y: number,
        z: number,
        obj: THREE.Object3D<THREE.Event>
      ) {
        let wrapper = new THREE.Object3D();
        wrapper.position.set(x, y, z);
        wrapper.add(obj);
        obj.position.set(-x, -y, -z);
        return wrapper;
      }
      changePivot(0, 0, 32, model);
      if (
        Number(size.z.toFixed(2)) > 1.1 &&
        Number(size.z.toFixed(2)) < 1.3 &&
        Number(size.z.toFixed(3)) != 1.115 &&
        Number(size.z.toFixed(2)) != 1.21
      ) {
        changePivot(0, 0, size.z * 3, model);
      }
      // if (size.z.toFixed(3)==1.115) {
      //   changePivot(0,0,35,model)
      // }
      scene.add(model);
      animate();
    },
    //加载过程回调函数-可以获得加载进度
    function (e) {
      if ((e.loaded / e.total) * 100 == 100) {
        setTimeout(() => {
          initData.showLoading = false;
        }, 3000);
      }
      console.log("加载完成的百分比" + (e.loaded / e.total) * 100 + "%");
    },
    function (e) {
      console.error(e);
    }
  );

  //模型页面响应式
  window.addEventListener("resize", onWindowResize);
}

/**
 * 监听窗口
 */
function onWindowResize() {
  let width = container.clientWidth;
  let height = container.clientHeight;
  // if (window.innerWidth <= 1680) {
  //   width = window.innerWidth - 450;
  //   height = window.innerHeight - 53;
  // }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

//执行动画
function animate() {
  requestAnimationFrame(animate);
  // mesh.rotation.y += 0.01; //沿Y轴旋转
  controls.update(); //更新控制器
  renderer.render(scene, camera); // 执行渲染操作
}

// 放大
function amplify() {
  initData.number += 5;
  initData.model.scale.set(
    initData.number / initData.size,
    initData.number / initData.size,
    initData.number / initData.size
  );
}
// 复位
function reset() {
  initData.number = 90;
  initData.model.scale.set(
    initData.number / initData.size,
    initData.number / initData.size,
    initData.number / initData.size
  );
  controls.reset();
}
// 缩小
function reduce() {
  if (initData.number > 10) initData.number -= 5;
  initData.model.scale.set(
    initData.number / initData.size,
    initData.number / initData.size,
    initData.number / initData.size
  );
}
</script>

<style lang="scss" scoped>
#three-box {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 100%;
  padding: 50px;
  background-color: rgb(232, 236, 236);
  .three-box-body {
    flex: 1;
    // height: 100%;
  }

  .plantoperate {
    position: absolute;
    top: 85%;
    left: 50%;
    display: flex;
    transform: translateX(-50%);
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(5, 5, 5, 0.2);
      text-align: center;
      line-height: 48px;
      color: #fff;
      i {
        font-size: 20px;
      }
    }
    div + div {
      margin-left: 40px;
    }
  }
}
</style>
