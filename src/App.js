import './styles/App.css';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Stars} from "@react-three/drei";
import RubikCube from './Components/RubikCube.js';
import { Suspense } from 'react';
function App() {

  return (
    
    <Canvas id="three-canvas" shadows>
      <Suspense fallback={null}>
        <RubikCube />
      </Suspense>
    </Canvas>
    
    
  );
  
}

export default App;
