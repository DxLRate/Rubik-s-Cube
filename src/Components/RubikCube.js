import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import RotateFF from "./RotateFF";
import { Physics } from "@react-three/cannon";
import { useBox, usePlane } from "@react-three/cannon";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import modelurl from "../assets/yash_model/rubiks_cube.glb";
import RubiksCube from "./RubiksCube";

const RubikCube = () => {
    const gltf = useLoader(GLTFLoader, modelurl);
    const gltf2 = useLoader(GLTFLoader, modelurl);
    // const loader = new GLTFLoader();

    // loader.load(
    //     "../../assets/Rubiks_cube_model/scene.gltf",
    //     function (gltf) {
    //         // scene.add(gltf.scene);
    //     },
    //     undefined,
    //     function (error) {
    //         console.error(error);
    //     }
    // );

    const Box = (props) => {
        const thisRef = useRef();
        references[i] = thisRef;
        i++;

        return (
            <>
                <mesh ref={(el) => (references.current[i] = el)} position={[0, 0, 0]} castShadow>
                    <boxGeometry args={[0.94, 0.94, 0.94]} />

                    <meshStandardMaterial attach="material-0" color="blue" />
                    <meshStandardMaterial attach="material-1" color="green" />
                    <meshStandardMaterial attach="material-2" color="red" />
                    <meshStandardMaterial attach="material-3" color="#ec4806" />
                    <meshStandardMaterial attach="material-4" color="white" />
                    <meshStandardMaterial attach="material-5" color="yellow" />
                </mesh>
            </>
        );
    };

    let items = [1, 2, 3];
    const cubes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    const references = useRef([]);
    let i = 1;
    let allCubes = new Map();

    items.forEach((item1) => {
        items.forEach((item2) => {
            items.forEach((item3) => {
                allCubes.set(i, [item1, item2, item3]);
                i++;
            });
        });
    });

    useEffect(() => {
        references.current = references.current.slice(0, cubes.length);
    }, [cubes]);

    const wholeCube = cubes.map((value, j) => {
        // console.log(allCubes.get(value));

        return (
            <primitive
                key={value}
                object={gltf.scene.clone()}
                position={[allCubes.get(value)[0], allCubes.get(value)[1], allCubes.get(value)[2]]}
                children-0-castShadow
            />
        );
    });

    function dragHandler(event) {
        console.log(12442323);
    }

    //Animation

    const [rotationActive, setRotationActive] = useState(false);

    let speed = 1.0;
    let init_rot;
    let init_pos = [];
    useFrame((state, delta) => {
        if (rotationActive && cubeRef.current) {
            cubeRef.current.rotation.z += delta * speed;
            // cubeRef.current.position.x +=
            if (Math.abs(cubeRef.current.rotation.z - init_rot) >= Math.PI / 2) {
                setRotationActive(false);
            }
        }
    });

    const cubeRef = useRef();

    const handleRotationToggle = () => {
        setRotationActive(!rotationActive);
        init_rot = cubeRef.current.rotation.z;
        init_pos[0] = cubeRef.current.position.x;
    };

    const [rotateGroups, setRotateGroups] = useState({
      frontZ: {axis: 'z', distFromOrigin: 1, active: false}, 
      middleZ: {axis: 'z', distFromOrigin: 0, active: false}, 
      backZ: {axis: 'z', distFromOrigin: -1, active: false},
      frontY: {axis: 'y', distFromOrigin: 1, active: false}, 
      middleY: {axis: 'y', distFromOrigin: 0, active: false}, 
      backY: {axis: 'y', distFromOrigin: -1, active: false},
      frontX: {axis: 'x', distFromOrigin: 1, active: false}, 
      middleX: {axis: 'x', distFromOrigin: 0, active: false}, 
      backX: {axis: 'x', distFromOrigin: -1, active: false},
    }); // State to control rotation

    const handleFaceRotate = (groupName) => {
        setRotateGroups({...rotateGroups, frontZ: {axis:'z', distFromOrigin: 1, active: true} }); // Trigger rotation
        // setTimeout(() => setRotateGroups(false), 100); // Reset the rotation trigger
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[10, 10, 10]} />
            <OrbitControls />
            <RubiksCube startRotation={rotateGroups} setStartRotation={setRotateGroups} /> 
            
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, frontZ: {axis: 'z', distFromOrigin: 1, active: true} })}}
                object={gltf.scene.clone()}
                position={[-5, 2, 4]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, middleZ: {axis: 'z', distFromOrigin: 0, active: true} })}}
                object={gltf.scene.clone()}
                position={[-4, 1, 4]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, backZ: {axis: 'z', distFromOrigin: -1, active: true} })}}
                object={gltf.scene.clone()}
                position={[-3, 0, 4]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, frontY: {axis: 'y', distFromOrigin: 1, active: true} })}}
                object={gltf.scene.clone()}
                position={[-5, 2, 6]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, middleY: {axis: 'y', distFromOrigin: 0, active: true} })}}
                object={gltf.scene.clone()}
                position={[-4, 1, 6]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, backY: {axis: 'y', distFromOrigin: -1, active: true} })}}
                object={gltf.scene.clone()}
                position={[-3, 0, 6]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, frontX: {axis: 'x', distFromOrigin: 1, active: true} })}}
                object={gltf.scene.clone()}
                position={[-5, 2, 8]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, middleX: {axis: 'x', distFromOrigin: 0, active: true} })}}
                object={gltf.scene.clone()}
                position={[-4, 1, 8]}
                children-0-castShadow
            />
            <primitive
                // ref={cubeRef}
                onClick={()=>{setRotateGroups({...rotateGroups, backX: {axis: 'x', distFromOrigin: -1, active: true} })}}
                object={gltf.scene.clone()}
                position={[-3, 0, 8]}
                children-0-castShadow
            />

            <ambientLight args={["#ffffff", 0.25]} />
            <spotLight args={["#ffffff", 1.5, 15, (Math.PI / 180) * 45, 0.4]} position={[-3, 7, 0]} castShadow />
            {/* Axes Helper for displaying the origin axes */}
        <axesHelper args={[5]} />

{/* Grid Helper for context */}
<gridHelper args={[10, 10, 10]} />
            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    );
};

export default RubikCube;
