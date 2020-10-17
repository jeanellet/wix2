import React, {useState} from 'react';

function Counting(props){

    const [fragile_count, setFragile] = useState(0);
    const [normal_count, setNormal] = useState(0);
    const [oversize_count, setOversize] = useState(0);

    function addFragile() {
        setFragile(fragile_count+1);
        props.completed(true);
        props.result({...props.result, choice:"Fragile", count: fragile_count+1, duration: Date.now() - props.time});
    }

    function emptyFragile(){
        setFragile(0);
        props.result({...props.result, count:0});
    }

    function addNormal() {
        setNormal(normal_count+1);
        props.completed(true);
        props.result({...props.result, choice:"Normal", count:normal_count+1, duration: Date.now() - props.time});
    }

    function emptyNormal() {
        setNormal(0);
        props.result({...props.result, count:0});
    }

    function addOversize() {
        setOversize(oversize_count+1);
        props.completed(true);
        props.result({...props.result, choice:"Oversize", count:oversize_count+1, duration: Date.now() - props.time});
    }

    function emptyOversize() {
        setOversize(0);
        props.result({...props.result, count:0});
    }

    return(
        <div className="counting_style">
        <h1>Fragile</h1>
        <h1>{fragile_count}</h1>
        <div className="count_btns">
        <button onClick={addFragile}><p>Add</p></button>
        <button onClick={emptyFragile}><p>New Bin</p></button>
        </div>
        <h1>Normal</h1>
        <h1>{normal_count}</h1>
        <button onClick={addNormal}><p>Add</p></button>
        <button onClick={emptyNormal}><p>New Bin</p></button>

        <h1>Oversize</h1>
        < h1>{oversize_count}</h1>
        <button onClick={addOversize}><p>Add</p></button>
        <button onClick={emptyOversize}><p>New Bin</p></button>
        </div>
    )
};


export default Counting;