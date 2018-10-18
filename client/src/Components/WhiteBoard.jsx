import React, { Component } from 'react';
import {SketchField, Tools} from 'react-sketch';
import { Button } from 'reactstrap';



class WhiteBoard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sketch: "",
        tool: Tools.Pencil,
        lineColor: 'white',
        lineWidth: 5,
        defaultImage: ""
      }
      this.download = this.download.bind(this);
      this.eraser = this.eraser.bind(this);

      //socket connection

      this.props.socket.on('updatedImage', (data)=>{
        this.setState({defaultImage: data.image});
      })
    }

 


    download(){
        console.log('converting image', this.state.sketch.toDataURL());
    }

    eraser(){
        this.setState({lineColor:'black', lineWidth:50});
    }

    pen(){
        this.setState({lineColor:'white', lineWidth:5});
    }

    emit(){
        this.props.sendNewImage(this.state.sketch);
    }



    render(){
        return(
    

            <div style={{ backgroundColor: 'black'}}>
             <Button onClick ={ ()=>{this.pen()} } outline color="secondary" type="button" size="lg" inline >Pen</Button> 
             <Button onClick ={ ()=>{this.eraser()} } outline color="secondary" type="button" size="lg" inline >Eraser</Button>     
             <Button onClick ={ ()=>{this.emit()} } outline color="secondary" type="button" size="lg" inline >Share</Button>         
            <SketchField
                    ref={(c) => {
                     return this.state.sketch = c  
                  }}
                   defaultValue={this.state.defaultImage}
                   value={this.state.defaultImage}
                   tool={this.state.tool} 
                   lineColor={this.state.lineColor}
                   lineWidth={this.state.lineWidth}/>
            </div>
        )
    }
}

export default WhiteBoard