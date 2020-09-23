import React from "react";

class ShowImage extends React.Component {
  constructor(props) {
    super(props);
    this.switchImage = this.switchImage.bind(this);
    this.state = {
      currentImage: 0,
      seconds: 0
    };
  }

  switchImage() {
    if (this.state.currentImage < this.props.images.length - 1) {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    } else {
      this.setState({
        currentImage: 0
      });
    }
    this.setState({seconds: this.state.seconds + 1});
    if(this.state.seconds > 7){
        clearInterval(this.timer);
    }
    return this.currentImage;
  }

  componentDidMount() {
        this.timer = setInterval(this.switchImage, 2000);     
  }

  render() {
    return (
      <div className="image_style">
        <img className="image_style"
          src={this.props.images[this.state.currentImage]}
          alt="cleaning images"
        />
      </div>
    );
  }
}
export default ShowImage;
