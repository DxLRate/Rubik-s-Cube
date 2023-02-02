import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useBox } from "@react-three/cannon";
function RotateFF(props){
    //frontFace = [{1,1,2}, {0,0,2}, {2,2,2}, {0,2,2}, {2,0,2}, {1,0,2}, {1,2,2}, {0,1,2}, {2,1,2}]
    function cubemotionM(keyid,dir,x1,y1){
        timeLine.to(keyid.position,{
            ease:dir,
            x: x1,
            duration:2,
            

        },0);
        timeLine.to(keyid.position,{
            ease:"none",
            y:y1,
            duration:2

        },"<");
    }
    function cubemotion(keyid, dir1, dir2, x1, y1, x2, y2){
        
        timeLine.to(keyid.position,{
            ease:(x1%1===0?"none" : dir1),
            x: x1,
            duration:1,
            

        },0);
        timeLine.to(keyid.position,{
            ease:y1%1===0?"none" : dir1,
            y:y1,
            duration:1

        },"<");

        timeLine.to(keyid.position,{
            ease:x1%1!==0?dir2:"none",
            x:x2,
            duration:1

        },">");
        timeLine.to(keyid.position,{
            ease:y1%1!==0?dir2 : "none",
            y:y2,
            duration:1

        },"<");
    }
       const timeLine = gsap.timeline();
       useEffect(() => {
        if(!!props.refs.current[8]){
            
            // cubemotion(props.refs.current[8], "circ.out", "circ.in", 2-Math.sqrt(2), 2, 1, 1);
            // cubemotion(props.refs.current[26], "circ.out", "circ.in", 2, 2+Math.sqrt(2), 1, 3);
            // cubemotion(props.refs.current[2], "circ.out", "circ.in", 2, 2-Math.sqrt(2), 3, 1);
            // cubemotion(props.refs.current[20], "circ.out", "circ.in", 2+Math.sqrt(2), 2, 3, 3);

            cubemotionM(props.refs.current[17], "circ.out", 1, 2);
            cubemotionM(props.refs.current[5], "circ.in", 2, 1);
            cubemotionM(props.refs.current[11], "circ.out", 3, 2);
            cubemotionM(props.refs.current[23], "circ.in", 2, 3);

        }
       },[props.refs.current[8]]);

    
    

    return;
        
    }
export default RotateFF;