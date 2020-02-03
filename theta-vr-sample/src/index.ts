import * as THREE from "three";
import "./HelioWebXRPolyfill.js";
import { VRButton } from "./VRButton.js";
import { PerspectiveCamera, WebGLRenderer, Scene } from "three";

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

init();
animate();

async function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // XRを有効にするボタン追加
  document.body.appendChild(
    VRButton.createButton(renderer, { referenceSpaceType: "local" })
  );

  // scebeの作成
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.layers.enable(1);

  // geometryの作成
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

  // materialの作成
  const texture = createVideoStreamTexture(await getWebCameraStream());
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // geometryとmaterialからmeshを作成
  const skyBox = new THREE.Mesh(geometry, material);
  skyBox.layers.set(1);
  scene.add(skyBox);

  const skyBoxR = new THREE.Mesh(geometry, material);
  skyBoxR.layers.set(2);
  scene.add(skyBoxR);

  window.addEventListener("resize", onWindowResize, false);
}

async function getWebCameraStream() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    return stream;
  }
  return null;
}

function createVideoStreamTexture(stream) {
  const video = document.createElement("video");
  try {
    video.src = window.URL.createObjectURL(stream);
  } catch (e) {
    video.srcObject = stream;
  }
  video.play();
  return new THREE.VideoTexture(video);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  renderer.render(scene, camera);
}
