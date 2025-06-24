import React, { useRef, useState } from "react";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import modelurl from "../assets/yash_model/rubiks_cube.glb";
import { Suspense } from "react";
import { useEffect } from "react";

const initialPositions = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            initialPositions.push({
                id: `${x}-${y}-${z}`,
                position: [x, y, z],
                rotation: [0, 0, 0],
            });
        }
    }
}

const RubiksCube = ({ startRotation, setStartRotation }) => {
    const gltf = useLoader(GLTFLoader, modelurl);
    const [cubePositions, setCubePositions] = useState(initialPositions);
    const frontGroupZ = useRef(); // Ref to the group of cubes that will rotate
    const middleGroupZ = useRef(); // Ref to the group of cubes that will rotate
    const backGroupZ = useRef(); // Ref to the group of cubes that will rotate
    const frontGroupY = useRef(); // Ref to the group of cubes that will rotate
    const middleGroupY = useRef(); // Ref to the group of cubes that will rotate
    const backGroupY = useRef(); // Ref to the group of cubes that will rotate
    const frontGroupX = useRef(); // Ref to the group of cubes that will rotate
    const middleGroupX = useRef(); // Ref to the group of cubes that will rotate
    const backGroupX = useRef(); // Ref to the group of cubes that will rotate
    const idelState = useRef(); // Ref to the group of cubes that will rotate

    const groupRefs = {
        frontZ: frontGroupZ,
        middleZ: middleGroupZ,
        backZ: backGroupZ,
        frontY: frontGroupY,
        middleY: middleGroupY,
        backY: backGroupY,
        frontX: frontGroupX,
        middleX: middleGroupX,
        backX: backGroupX,
    };
    const [rotationAngle, setRotationAngle] = useState(0); // Track the rotation progress

    const centerOffset = new THREE.Vector3(-0.5, -0.5, 0.5);

    const Cubes = cubePositions.map((cube, index) => (
        <primitive key={index} object={gltf.scene.clone()} position={cube.position} rotation={[0, 0, 0]} />
    ));

    const [cubesGroup, setCubesGroup] = useState(() => {
        return cubePositions.map((cube, index) => (
            <primitive key={index} object={gltf.scene.clone()} position={[cube.position]} />
        ));
    });
    console.log(Cubes[8].props.rotation); // add rotation prop in cubePosition assign it to primitive ----------
    // useEffect(()=>{
    //     setCubesGroup(()=>{
    //         return cubePositions.map((cube, index) => (
    //             <primitive key={index} object={gltf.scene.clone()} position={cube.position} />
    //         ));
    //     })
    // },[cubePositions])

    useFrame((_dummy, delta) => {
        if (startRotation.frontZ.active && frontGroupZ.current) {
            // console.log(frontGroupZ?.current);
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                frontGroupZ.current.rotation.z += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);

                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                frontGroupZ.current.rotation.set(0, 0, 0);
                setStartRotation({ ...startRotation, frontZ: { axis: "z", distFromOrigin: 1, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.frontZ.distFromOrigin, startRotation.frontZ.axis, "clockwise")
                );
            }
        }
        if (startRotation.middleZ.active && middleGroupZ.current) {
            // console.log(rotationAngle);
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                middleGroupZ.current.rotation.z += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                middleGroupZ.current.rotation.set(0, 0, 0);
                setStartRotation({ ...startRotation, middleZ: { axis: "z", distFromOrigin: 0, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.middleZ.distFromOrigin, startRotation.middleZ.axis, "clockwise")
                );
            }
        }
        if (startRotation.backZ.active && backGroupZ.current) {
            // console.log(rotationAngle);
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                backGroupZ.current.rotation.z += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, backZ: { axis: "z", distFromOrigin: -1, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.backZ.distFromOrigin, startRotation.backZ.axis, "clockwise")
                );
            }
        }
        if (startRotation.frontY.active && frontGroupY?.current) {
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                frontGroupY.current.rotation.y += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, frontY: { axis: "y", distFromOrigin: 1, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.frontY.distFromOrigin, startRotation.frontY.axis, "clockwise")
                );
            }
        }
        if (startRotation.middleY.active && middleGroupY?.current) {
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                middleGroupY.current.rotation.y += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, middleY: { axis: "y", distFromOrigin: 0, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.middleY.distFromOrigin, startRotation.middleY.axis, "clockwise")
                );
            }
        }
        if (startRotation.backY.active && backGroupY?.current) {
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                backGroupY.current.rotation.y += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, backY: { axis: "y", distFromOrigin: -1, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.backY.distFromOrigin, startRotation.backY.axis, "clockwise")
                );
            }
        }
        if (startRotation.frontX.active && frontGroupX?.current) {
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                frontGroupX.current.rotation.x += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, frontX: { axis: "x", distFromOrigin: 1, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.frontX.distFromOrigin, startRotation.frontX.axis, "clockwise")
                );
            }
        }
        if (startRotation.middleX.active && middleGroupX?.current) {
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                middleGroupX.current.rotation.x += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, middleX: { axis: "x", distFromOrigin: 0, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.middleX.distFromOrigin, startRotation.middleX.axis, "clockwise")
                );
            }
        }
        if (startRotation.backX.active && backGroupX?.current) {
            const step = (Math.PI / 180) * 2; // 2 degrees per frame
            if (rotationAngle < Math.PI / 2) {
                backGroupX.current.rotation.x += step; // Rotate around Z-axis
                setRotationAngle(rotationAngle + step);
                // setTranslationVector([translationVector[0] + 0.01, translationVector[1] + 0.01]);
            } else {
                // Stop the rotation when 90 degrees is reached
                setStartRotation({ ...startRotation, backX: { axis: "x", distFromOrigin: -1, active: false } });
                setRotationAngle(0);
                setCubePositions(
                    rotateGroup(startRotation.backX.distFromOrigin, startRotation.backX.axis, "clockwise")
                );
            }
        }
    });

    const [activeGroup, setActiveGroup] = useState(idelState);

    useEffect(() => {
        let temp = Object.entries(startRotation).find(([key, value]) => value.active === true);
        if (temp) {
            setActiveGroup(null);
        } else {
            setActiveGroup(idelState);
        }
        console.log(cubePositions[8]);
    }, [startRotation]);
    // console.log(activeGroup);

    // useEffect(() => {
    //     // console.log(activeGroup);
    //     // console.log(Cubes);

    //     // setCubesGroup(() => {
    //     //     return Cubes.map((cube, index) => {
    //     //         let activeGroup = Object.entries(startRotation).find(([key, value]) => value.active === true);
    //     //         activeGroup = activeGroup ? activeGroup : ["null", { axis: null }];
    //     //         let shouldRender;
    //     //         switch (activeGroup[1].axis) {
    //     //             case "z":
    //     //                 shouldRender = cube.props.position[2] === activeGroup[1].distFromOrigin;
    //     //                 break;
    //     //             case "y":
    //     //                 shouldRender = cube.props.position[1] === activeGroup[1].distFromOrigin;
    //     //                 break;
    //     //             case "x":
    //     //                 shouldRender = cube.props.position[0] === activeGroup[1].distFromOrigin;
    //     //                 break;
    //     //             default:
    //     //                 shouldRender = false;
    //     //         }
    //     //         return shouldRender && cube;
    //     //     });
    //     // });
    //     // setCubesGroup(() => {
    //     //     return Cubes.map((cube, index) => {
    //     //         let activeGroup = Object.entries(startRotation).find(([key, value]) => value.active === true);
    //     //         activeGroup = activeGroup ? activeGroup : ["null", { axis: null }];
    //     //         let shouldRender;
    //     //         switch (activeGroup[1].axis) {
    //     //             case "z":
    //     //                 shouldRender = cube.props.position[2] === activeGroup[1].distFromOrigin;
    //     //                 break;
    //     //             case "y":
    //     //                 shouldRender = cube.props.position[1] === activeGroup[1].distFromOrigin;
    //     //                 break;
    //     //             case "x":
    //     //                 shouldRender = cube.props.position[0] === activeGroup[1].distFromOrigin;
    //     //                 break;
    //     //             default:
    //     //                 shouldRender = false;
    //     //         }
    //     //         return shouldRender && cube;
    //     //     });
    //     // });
    // }, [activeGroup]);

    const rotateGroup = (distFromOrigin, axis, direction) => {
        const angle = direction === "clockwise" ? Math.PI / 2 : -Math.PI / 2;

        // Rotate each cube in the group and update its position
        return cubePositions.map((cube, index) => {
            let [x, y, z] = cube.position;
            let shouldRender;
            switch (axis) {
                case "z":
                    if (cube.position[2] === distFromOrigin) {
                        const newX = Math.round(Math.cos(angle) * x - Math.sin(angle) * y);
                        const newY = Math.round(Math.sin(angle) * x + Math.cos(angle) * y);
                        return { ...cube, position: [newX, newY, z] };
                    }
                    break;
                case "y":
                    if (cube.position[1] === distFromOrigin) {
                        const newX = Math.round(Math.cos(angle) * x - Math.sin(angle) * z);
                        const newZ = Math.round(-Math.sin(angle) * x + Math.cos(angle) * z);
                        return { ...cube, position: [newX, y, newZ] };
                    }
                    break;
                case "x":
                    if (cube.position[0] === distFromOrigin) {
                        const newY = Math.round(Math.cos(angle) * y + Math.sin(angle) * z);
                        const newZ = Math.round(Math.sin(angle) * y - Math.cos(angle) * z);
                        return { ...cube, position: [x, newY, newZ] };
                    }
                    break;
                default:
                    shouldRender = false;
            }
            return cube;
        });
    };

    // Function to get cubes on the front face (z === 1)
    const getFaceAlongZaxis = (zValue) => {
        return cubePositions.filter((cube) => cube.position[2] === zValue); // Front face: z === 1
    };

    const getFaceAlongYaxis = (yValue) => {
        return cubePositions.filter((cube) => cube.position[1] === yValue); // Front face: y === 1
    };

    const getFaceAlongXaxis = (xValue) => {
        return cubePositions.filter((cube) => cube.position[0] === xValue); // Front face: x === 1
    };
    return (
        <>
            <group ref={activeGroup} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset} >
                    {/* {cubesGroup} */}
                    {/* {Cubes.map((cube, index) => {
                        let activeGroup = Object.entries(startRotation).find(([key, value]) => value.active === true);
                        activeGroup = activeGroup ? activeGroup : ["null", { axis: null }];
                        let shouldRender;
                        switch (activeGroup[1].axis) {
                            case "z":
                                shouldRender = cube.props.position[2] !== activeGroup[1].distFromOrigin;
                                break;
                            case "y":
                                shouldRender = cube.props.position[1] !== activeGroup[1].distFromOrigin;
                                break;
                            case "x":
                                shouldRender = cube.props.position[0] !== activeGroup[1].distFromOrigin;
                                break;
                            default:
                                shouldRender = true;
                        }
                        return shouldRender && cube;
                    })} */}
                    {Cubes.map((cube, index) => {
                        let activeGroup = Object.entries(startRotation).find(([key, value]) => value.active === true);
                        activeGroup = activeGroup ? activeGroup : ["null", { axis: null }];
                        let shouldRender = false;
                        if (cube.props.position === cubePositions[8].position) shouldRender = true;
                        return shouldRender && cube;
                    })}
                </group>
            </group>

            {/* {cubesGroup} */}

            {/* <group ref={frontGroupZ} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let activeGroup = Object.entries(startRotation).find(([key, value]) => value.active === true);
                        activeGroup = activeGroup ? activeGroup : ["null", { axis: null }];
                        let shouldRender;
                        switch (activeGroup[1].axis) {
                            case "z":
                                shouldRender = cube.props.position[2] === activeGroup[1].distFromOrigin;
                                break;
                            case "y":
                                shouldRender = cube.props.position[1] === activeGroup[1].distFromOrigin;
                                break;
                            case "x":
                                shouldRender = cube.props.position[0] === activeGroup[1].distFromOrigin;
                                break;
                            default:
                                shouldRender = false;
                        }
                        return shouldRender && cube;
                    })}
                </group>
            </group> */}

            {/* groups along z-zxis */}
            <group ref={frontGroupZ} position={[0.5, 0.5, 0.5]} rotation={[1,0,0]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.frontZ.active) shouldRender = cube.props.position[2] === 1;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
            <group ref={middleGroupZ} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.middleZ.active) shouldRender = cube.props.position[2] === 0;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
            <group ref={backGroupZ} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.backZ.active) shouldRender = cube.props.position[2] === -1;
                        return shouldRender && cube;
                    })}
                </group>
            </group>

            {/*  groups along y-zxis */}
            <group ref={frontGroupY} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.frontY.active) shouldRender = cube.props.position[1] === 1;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
            <group ref={middleGroupY} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.middleY.active) shouldRender = cube.props.position[1] === 0;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
            <group ref={backGroupY} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.backY.active) shouldRender = cube.props.position[1] === -1;
                        return shouldRender && cube;
                    })}
                </group>
            </group>

            {/* groups along x-zxis */}
            <group ref={frontGroupX} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.frontX.active) shouldRender = cube.props.position[0] === 1;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
            <group ref={middleGroupX} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.middleX.active) shouldRender = cube.props.position[0] === 0;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
            <group ref={backGroupX} position={[0.5, 0.5, 0.5]}>
                <group position={centerOffset}>
                    {Cubes.map((cube, index) => {
                        let shouldRender = false;
                        if (startRotation.backX.active) shouldRender = cube.props.position[0] === -1;
                        return shouldRender && cube;
                    })}
                </group>
            </group>
        </>
    );
};

export default RubiksCube;
