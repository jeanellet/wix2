import React from 'react';
import {writeM} from './LogData';


class Monitoring extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            select: false,
            button0: false,
            button1: false,
            button2: false,
            button3: false,
            button4: false
        }
    }
    
    clicked(number){
        this.setState({select:true});
        switch(number){
            case 0:
                this.setState({button0:true});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                this.props.result({count:0});
                break;
            case 1:
                this.setState({button0:false});
                this.setState({button1:true});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                this.props.result({count:1});
                break;
            case 2:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:true});
                this.setState({button3:false});
                this.setState({button4:false});
                this.props.result({count:2});
                break;
            case 3:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:true});
                this.setState({button4:false});
                this.props.result({count:3});
                break;
            case 4:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:true});
                this.props.result({count:4});
                break;
            default:
                break;
        }
        console.log("clicked " + number);
        this.props.completed(true);
    }

    isClicked(count, btn){
        if (this.props.weaponCount == count && !this.state.select && this.props.highlightOk){
            return "highlightRed";
        }
        return btn ? "clickedBtn" : "unclickedBtn";
    }

    render(){
        return(
            <div className="monitoring_style">
                <button className={this.isClicked(0, this.state.button0)} onClick={() => this.clicked(0)}>0</button>
                <button className={this.isClicked(1, this.state.button1)} onClick={() => this.clicked(1)}>1</button>
                <button className={this.isClicked(2, this.state.button2)} onClick={() => this.clicked(2)}>2</button>
                <button className={this.isClicked(3, this.state.button3)} onClick={() => this.clicked(3)}>3</button>
                <button className={this.isClicked(4, this.state.button4)} onClick={() => this.clicked(4)}>4</button>
            </div>
        )
    }
};


export default Monitoring;