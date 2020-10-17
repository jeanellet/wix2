import React, {useState} from 'react';

function Start(props){

    const [order, setOrder] = useState(1);

    const ObjImg = require.context('./Other_Imgs', true, /\.png$/);
    const objects = ObjImg.keys().map(path=>{return {path, file: ObjImg(path)}});

    const addImgs = require.context('./Additional_Screening', true, /\.jpg$/);
    const addimgs = addImgs.keys().map(path=>{return {path, file: addImgs(path)}});
  
    let pattern_index = Math.round(Math.random() * 4);
    let chosen_add = addimgs[pattern_index].file;
    let capacities = [0,0,0];
    for(var i=0;i<capacities.length;i++){
        let size = Math.round(Math.random()*3+2);
        capacities[i] = size;
    }
    let temp={
        pattern:chosen_add,
        Fragile:capacities[0],
        Normal:capacities[1],
        Oversize:capacities[2]
    };

    const [dummy, setDummy] = useState(temp);

    function click(){
        setOrder(order+1);
        console.log("DUMMY",dummy);
        if(order >= 3){
            props.setStart({...dummy});
            props.setTransition(true);
        }
    }

    function first(){
        console.log("on first");
        
        return(
            <div className="transition-style">
                <div>
                    <img src={objects[0].file}/>
                </div>
                <div>
                    <h1>You will participate in a task where you will determine if a baggage is safe by viewing an x-ray image of said baggage.</h1>
                    <button onClick={click}><h2>Continue</h2></button>
                </div>
            </div>
        )
    }

    function second(){
        //TODO randomly select pattern for additional screening and save for data
        console.log("on second");
        
        

        return(
            <div className="transition-style">
                <div>
                    <img src={dummy.pattern}/>
                </div>
                <div>
                    <h1>Some bags require additional screening. This image must be correctly identified to proceed.</h1>
                    <button onClick={click}><h2>Continue</h2></button>
                </div>
            </div>
        )
    }

    function third(){
        // TODO randomly assign capacities and save
        console.log("on third");
        
        return(
            <div className="transition-style">
                <div>
                    <img src={objects[0].file}/>
                </div>
                <div>
                    <h1>Fragile: {dummy.Fragile} bags</h1>
                    <h1>Normal: {dummy.Normal} bags</h1>
                    <h1>Oversize: {dummy.Oversize} bags</h1>
                    <button onClick={click}><h2>Continue</h2></button>
                </div>
            </div>
        )
    }

    function survey(){
        return(
            <div className="survey-style">
                <h1>You will begin a short survey regarding the task you just completed before going onto the next task. The proctor will give you instructions on completing the survey.</h1>
                <button onClick={click}><h2>I have completed the survey.</h2></button>
            </div>
        )
    }

    return(
        <div>
            {order == 1
                ? props.levelIndex == 0
                    ? first()
                    : survey()
                : order == 2
                    ? second()
                    : third()
            }
        </div>
    );
}

export default Start;