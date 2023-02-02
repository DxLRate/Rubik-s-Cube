import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import RotateFF from "./RotateFF";
import { Physics } from "@react-three/cannon";
import { useBox, usePlane } from "@react-three/cannon";

const RubikCube = ()=>{
    const Box = (props)=>{
  
        const thisRef = useRef();
        references[i] = thisRef;
        i++;
        
        return(
          <>
            <mesh  ref={el => references.current[i] = el} position={[0,0,0]} castShadow>
              <boxGeometry args={[0.94,0.94,0.94]} />
              
            <meshStandardMaterial attach="material-0" color="blue" /> 
            <meshStandardMaterial attach="material-1" color="green" />   
            <meshStandardMaterial attach="material-2" color="red" /> 
            <meshStandardMaterial attach="material-3" color="#ec4806" />    
            <meshStandardMaterial attach="material-4" color="white" />  
            <meshStandardMaterial attach="material-5" color="yellow" /> 
            
            </mesh>                   
          </>
        );
      }
    

      let items = [1,2,3];
      const cubes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
      const references = useRef([]);
      let i=1;
      let allCubes = new Map();        
        
        
        items.forEach((item1)=>{
        
            items.forEach((item2)=>{
                  
                items.forEach((item3)=>{
                    allCubes.set(i,[item1,item2,item3]);
                    i++;
                });    
            });
       });

       

       useEffect(() => {
        references.current = references.current.slice(0,cubes.length);
      }, [cubes]);

      const wholeCube = cubes.map((value,j) => {
        
        return (
            <mesh draggable="true" onDrag={dragHandler} ref={el => references.current[j] = el} position={[allCubes.get(value)[0],allCubes.get(value)[1],allCubes.get(value)[2]]} castShadow>
              <boxGeometry args={[0.94,0.94,0.94]} />
              
            <meshStandardMaterial attach="material-0" color="blue" /> 
            <meshStandardMaterial attach="material-1" color="green" />   
            <meshStandardMaterial attach="material-2" color="red" /> 
            <meshStandardMaterial attach="material-3" color="#ec4806" />    
            <meshStandardMaterial attach="material-4" color="white" />  
            <meshStandardMaterial attach="material-5" color="yellow" /> 
            
            </mesh>
        );
      });
      //  console.log(references.current[1]);
        
      function dragHandler(event){
        console.log(12442323);
      }
       //Animation
       
    

  return(
    <>
        <PerspectiveCamera makeDefault position={[1,5,10]} />
        <OrbitControls />
        
        <Physics  >
        
        {wholeCube}
        <RotateFF
          refs={references}
         />
        {/* <Plane 
            position={[0, -4, 0]}
        />
        <Cube /> */}
        
        </Physics>
        
        <ambientLight args={['#ffffff',0.25]} />
        <spotLight args={["#ffffff",1.5,15,(Math.PI/180*45),0.4]} position={[-3,7,0]} castShadow /> 
        

        <Environment background>
            <mesh>
                <sphereGeometry args={[50,100,100]} />
                <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
            </mesh>
            
        </Environment>
        
    </>
  );
}

export default RubikCube;