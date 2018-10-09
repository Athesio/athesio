import React from 'react';

class FloatingVideoDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      newX: 0,
      newY: 0
    };
    this.dragElement = this.dragElement.bind(this);
    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    let element = document.getElementById("floatingDivHeader");
    console.log(element);
  }

  componentDidMount() {
    this.dragElement(document.getElementById("floatingDiv"));
    
  }

  dragElement(element) {
    if (document.getElementById(element.id + "Header")) {
      from: 
        document.getElementById(element.id + "Header").onmousedown = this.dragMouseDown; 
    } else {
      element.onmousedown = this.dragMouseDown;
    }
  }

  dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    // get current position
    this.setState({ pos3 : e.clientX });
    this.setState({ pos4 : e.clientY });
    document.onmouseup = this.closeDragElement;
    document.onmousemove = this.elementDrag;
    this.props.deleted();
  }

  elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    this.setState({ pos1 : this.state.pos3 - e.clientX });
    this.setState({ pos2 : this.state.pos4 - e.clientY });
    this.setState({ pos3 : e.clientX });
    this.setState({ pos4 : e.clientY });
    let element = document.getElementById("floatingDivHeader");
    this.props.moved();
    this.setState({newX: element.offsetTop + this.state.pos2 });
    this.setState({newY: element.offsetLeft + this.state.pos1 });
    // console.log('x ', this.state.newX);
    // console.log('y ', this.state.newY);
    // console.log(element.offsetTop);
    // console.log(element.getBoundingClientRect());
    // element.style.top = (element.offsetTop - this.state.pos2) + "px";
    // element.style.left = (element.offsetLeft - this.state.pos1) + "px";
    // element.offsetTop = element.offsetTop - this.state.pos2 + "px";
    // element.offsetLeft = element.offsetLeft - this.state.pos1 + "px";
  }

  closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    this.props.deleted();
  }

  render() {
    return (
      <div id="floatingDiv" >
        <div id="floatingDivHeader" style={{ top: `${this.state.newX}px` , left: `${this.state.newY}px` }} >Video Chat</div>
        <div></div>
        <button className="btn" onClick={this.closeDragElement}>X</button>
      </div>
    )
  }
}

export default FloatingVideoDiv;