import React, { useEffect, useRef } from "react";

const Box = (props) => {
    const thisRef = useRef();
    function handler() {
        props.onChange(thisRef);
    }

    // console.log(thisRef);
    return (
        <>
            <mesh
                onUpdate={handler}
                ref={thisRef}
                position={[props.x, props.y, props.z]}
                castShadow
            >
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

export default Box;

// material 0  -  right
// material 1  -  left
// material 2  -  top
// material 3  -  bottom
// material 4  -  front
// material 5  -  back

// middle = [{1,1,0}, {1,2,1}, {0,1,1}, {2,1,1},
//           {1,1,2}, {1,0,1} ]

//corners = [{0,0,0}, {2,0,0}, {0,2,0}, {0,0,2},
//           {2,2,2}, {2,2,0}, {0,2,2}, {2,0,2}]

//edgeMiddle = [{1,0,0}, {1,2,0}, {0,0,1}, {0,2,1},
//               {1,0,2}, {1,2,2}, {2,0,1}, {2,2,1},
//               {0,1,0}, {0,1,2}, {2,1,0}, {2,1,2}]

//frontFace = [{1,1,2}, {0,0,2}, {2,2,2}, {0,2,2}, {2,0,2}, {1,0,2}, {1,2,2}, {0,1,2}, {2,1,2}]

//backFace = [{1,1,0}, {0,0,0}, {2,0,0}, {0,2,0}, {2,2,0}, {1,0,0}, {1,2,0}, {0,1,0}, {2,1,0}]

//leftFace = [{0,1,1}, {0,0,0}, {0,2,0}, {0,0,2}, {0,2,2}, {0,0,1}, {0,2,1}, {0,1,0}, {0,1,2}]

//rightFace = [{2,1,1}, {2,0,0}, {2,2,0}, {2,0,2}, {2,2,2}, {2,0,1}, {2,2,1}, {2,1,0}, {2,1,2}]

//topFace = [{1,2,1}, {0,2,0}, {2,2,0}, {0,2,2}, {2,2,2}, {1,2,0}, {0,2,1}, {1,2,2}, {2,2,1}]

//bottomFace = [{1,0,1}, {0,0,0}, {2,0,0}, {0,0,2}, {2,0,2}, {1,0,0}, {0,0,1}, {1,0,2}, {2,0,1}]

//frontMiddle = [{}]

//rightMiddle = [{}]
