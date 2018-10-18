import React, { Component } from 'react';
import Draggable from 'react-draggable';
import {SketchField, Tools} from 'react-sketch';
import io from "socket.io-client";





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
      this.emit = this.emit.bind(this);

      //socket connections

      this.socket = io('/athesio').connect();

      this.socket.on('connect', () => {

        console.log('connected client side');
        this.socket.emit('room', this.state.roomId);
        this.socket.emit('retrieveChatHistory', this.state.roomId);
      });

      this.socket.on('updatedImage', (data)=>{
          console.log(data);
          this.setState({defaultImage: data});
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
        this.socket.emit('image', JSON.stringify(this.state.sketch), (err, data)=>{
            if(err) console.log(err);
            console.log('success');
        })
    }


    render(){
        return(
    

            <div style={{ backgroundColor: 'black'}}>
            <button onClick ={()=>{this.eraser();  console.log('clicked')}}>Eraser</button>
            <button onClick ={()=>{this.pen(); console.log('clicked')}}>Pen</button>
            <button onClick ={()=>{this.download(); console.log('clicked')}}>Save</button>
            <button onClick ={()=>{this.emit(); console.log('clicked')}}>Emit</button>
            <SketchField
                    ref={(c) => {
                     return this.state.sketch = c  
                  }}
                   tool={this.state.tool} 
                   lineColor={this.state.lineColor}
                   lineWidth={this.state.lineWidth}/>
            </div>
        )
    }
}

export default WhiteBoard