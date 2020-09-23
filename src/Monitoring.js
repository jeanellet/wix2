import React from 'react';


class Monitoring extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            button0: false,
            button1: false,
            button2: false,
            button3: false,
            button4: false
        }
    }
    
    clicked(number){
        switch(number){
            case 0:
                this.setState({button0:true});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                break;
            case 1:
                this.setState({button0:false});
                this.setState({button1:true});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                break;
            case 2:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:true});
                this.setState({button3:false});
                this.setState({button4:false});
                break;
            case 3:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:true});
                this.setState({button4:false});
                break;
            case 4:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:true});
                break;
        }
        console.log(number);
    }

    render(){
        return(
            <div className="monitoring_style">
                <button className={this.state.button0 ? "clickedBtn" : "unclickedBtn"} onClick={() => this.clicked(0)}>0</button>
                <button className={this.state.button1 ? "clickedBtn" : "unclickedBtn"} onClick={() => this.clicked(1)}>1</button>
                <button className={this.state.button2 ? "clickedBtn" : "unclickedBtn"} onClick={() => this.clicked(2)}>2</button>
                <button className={this.state.button3 ? "clickedBtn" : "unclickedBtn"} onClick={() => this.clicked(3)}>3</button>
                <button className={this.state.button4 ? "clickedBtn" : "unclickedBtn"} onClick={() => this.clicked(4)}>4</button>
            </div>
        )
        }
    
};


export default Monitoring;