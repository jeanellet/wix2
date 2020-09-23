import React, { useEffect, useState } from 'react';

function Bag(){
    const [rand_bag, setBag] = useState("");

    function getRandomBag(){
        const types = ["Fragile", "Normal", "Oversize"];
        const rand = Math.round(Math.random() * 2);
        console.log(rand);
        return <h2 className="bag_style">{types[rand]}</h2>
    }

    return (<h3 className="bag_style">{getRandomBag()}</h3>);
}

export default Bag;