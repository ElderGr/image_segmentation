import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.raycaster = undefined;
    this.mouse = undefined;
    this.instersectionPoint = undefined;
    this.planeNormal = undefined;
    this.plane = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 48;

    this.mouse = new THREE.Vector2();
    this.instersectionPoint = new THREE.Vector3();
    this.planeNormal = new THREE.Vector3();
    this.plane = new THREE.Plane();
    this.raycaster = new THREE.Raycaster();

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById('myThreeJsCanvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  animate() {
    // NOTE: Window is implied.
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
  }

  hoverEvent (event, ref) {
    ref.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    ref.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    ref.planeNormal.copy(ref.camera.position).normalize();
    ref.plane.setFromNormalAndCoplanarPoint(
      ref.planeNormal, 
      ref.scene.position
    )
    
    ref.raycaster.setFromCamera(ref.mouse, ref.camera)
    ref.raycaster.ray.intersectPlane(ref.plane, ref.instersectionPoint)
  }

  clickEvent (event, ref) {
    const sphereGeo = new THREE.SphereGeometry(0.3, 30, 30);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xFFEA00,
      metalness: 0,
      roughness: 0
    })

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    ref.scene.add(sphereMesh)
    console.log(ref.instersectionPoint)
    sphereMesh.position.copy(ref.instersectionPoint);
  }

  render() {
    // NOTE: Update uniform data on each render.
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}