import { useEffect, useState } from 'react'
// import img from '/public/camisa_manga_gola.jpg'

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import SceneInit from './SceneInit'

function App() { 
  const [ points, setPoints ] = useState([])
  const test = new SceneInit()

  useEffect(() => {
    
  }, [points])

  useEffect(() => {
    test.initialize();
    test.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('public/models/shiba/scene.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      console.log(gltfScene)
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene.add(gltfScene.scene);
      window.addEventListener('mousemove', (event) => test.hoverEvent(event, test));
      window.addEventListener('dblclick', (event) => test.clickEvent(event, test));
      // window.addEventListener('mousemove', (event) => {
      //   test.hoverEvent(event, test)
      // });
  
      // window.addEventListener('dblclick', (event) => {
      //   test.clickEvent(event, gltfScene)
      //   // setPoints([
      //   //   ...points,
      //   //   test.mouse
      //   // ])
      // });
    })
  }, [])

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  )
}

export default App
