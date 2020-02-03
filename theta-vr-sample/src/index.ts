import * as THREE from "three";
import "./HelioWebXRPolyfill.js";
import { VRButton } from "./VRButton.js";

var camera;
var renderer;
var scene;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  document.body.appendChild(
    VRButton.createButton(renderer, { referenceSpaceType: "local" })
  );

  //

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.layers.enable(1);

  // var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
  // geometry.scale(1, 1, -1);
  var geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

  // var textures = getTexturesFromAtlasFile(
  //   require("./images/sun_temple_stripe_stereo.jpg"),
  //   12
  // );

  // var materials = [];

  // for (var i = 0; i < 6; i++) {
  //   materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
  // }

  const texture = THREE.ImageUtils.loadTexture(
    require("./images/ricoh-theta-sample.jpg")
  );
  const material = new THREE.MeshBasicMaterial({ map: texture });

  var skyBox = new THREE.Mesh(geometry, material);
  skyBox.layers.set(1);
  scene.add(skyBox);

  // var materialsR = [];

  // for (var i = 6; i < 12; i++) {
  //   materialsR.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
  // }

  var skyBoxR = new THREE.Mesh(geometry, material);
  skyBoxR.layers.set(2);
  scene.add(skyBoxR);

  window.addEventListener("resize", onWindowResize, false);
}

function getTexturesFromAtlasFile(atlasImgUrl, tilesNum) {
  var textures = [];

  for (var i = 0; i < tilesNum; i++) {
    textures[i] = new THREE.Texture();
  }

  var loader = new THREE.ImageLoader();
  loader.load(atlasImgUrl, function(imageObj) {
    var canvas, context;
    var tileWidth = imageObj.height;

    for (var i = 0; i < textures.length; i++) {
      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.height = tileWidth;
      canvas.width = tileWidth;
      context.drawImage(
        imageObj,
        tileWidth * i,
        0,
        tileWidth,
        tileWidth,
        0,
        0,
        tileWidth,
        tileWidth
      );
      textures[i].image = canvas;
      textures[i].needsUpdate = true;
    }
  });

  return textures;
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
