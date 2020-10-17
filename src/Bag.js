import React, { useEffect, useState } from 'react';

function Bag(){
    const [rand_bag, setBag] = useState("");

    function getRandomBag(){
        const types = ["Fragile", "Normal", "Oversize"];
        const rand = Math.round(Math.random() * 2);
        console.log(rand);
        while(rand_bag == types[rand]){
            rand = Math.round(Math.random() * 2);
        }
        setBag(types[rand])
        return types[rand];
    }

    //return (<h3 className="bag_style">{getRandomBag()}</h3>);
}

export default Bag;