import { Component } from "react";

class Video extends Component {
  componentDidMount() {
    this.video.addEventListener('loadedmetadata', (e) => {
      this.video.play();
    });
  }

  render() {
    return (
      <video ref={(ele) => { this.video = ele; }}>
        <source src={this.props.source}></source>
      </video>
    );
  }
}

export default Video;