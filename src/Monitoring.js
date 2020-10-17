import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class Monitoring extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            select: false,
            button0: false,
            button1: false,
            button2: false,
            button3: false,
            button4: false,
            isAddScreen: false
        }
    }
    
    clicked(number){
        this.setState({select:true});
        const duration = Date.now() - this.props.time;
        this.props.setMTime(Date.now())
        switch(number){
            case 0:
                this.setState({button0:true});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                this.props.result({count:0, duration: duration});
                break;
            case 1:
                this.setState({button0:false});
                this.setState({button1:true});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                this.props.result({count:1, duration: duration});
                break;
            case 2:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:true});
                this.setState({button3:false});
                this.setState({button4:false});
                this.props.result({count:2, duration: duration});
                break;
            case 3:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:true});
                this.setState({button4:false});
                this.props.result({count:3, duration: duration});
                break;
            case 4:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:true});
                this.props.result({count:4, duration: duration});
                break;
            default:
                break;
        }
        console.log("clicked " + number);

        //additional screening
        if(this.props.trials%4 == 0){
            console.log("!!!!!!!!!!!!!!additional screening time", this.props.trials);
            this.setState({isAddScreen:true});
        }

        this.props.completed(true);
    }

    isClicked(count, btn){
        if (this.props.weaponCount == count && !this.state.select && this.props.highlightOk){
            return "highlightRed";
        }
        return btn ? "clickedBtn" : "unclickedBtn";
    }

    closePopup(){
        this.setState({isAddScreen:false});
    }

    render(){
        return(
            <div className="monitoring_style">
            <h2>Select number of weapons:</h2>
                <div style={{margin: 'auto'}}>
                    <button className={this.isClicked(0, this.state.button0)} onClick={() => this.clicked(0)}>0</button>
                    <button className={this.isClicked(1, this.state.button1)} onClick={() => this.clicked(1)}>1</button>
                    <button className={this.isClicked(2, this.state.button2)} onClick={() => this.clicked(2)}>2</button>
                    <button className={this.isClicked(3, this.state.button3)} onClick={() => this.clicked(3)}>3</button>
                    <button className={this.isClicked(4, this.state.button4)} onClick={() => this.clicked(4)}>4</button>
                </div>
                    
                <Popup open={this.state.isAddScreen} modal>
                    <div className="modal">
                        <h2>Additional Screening</h2>
                    </div>
                </Popup>
            </div>
            
        )
    }
};


export default Monitoring;