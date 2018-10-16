import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import ReactDOM from 'react-dom';
// import tree from '/Users/taroyamashita/Desktop/athesio/client/dummyTreeData.js'
import cx from 'classnames';

const tree = {
    module: 'react-ui-tree',
    children: [
      {
        module: 'dist',
        collapsed: true,
        children: [
          {
            module: 'node.js',
            leaf: true,
            path: 'react-ui-tree/dist/node.js'
          },
          {
            module: 'react-ui-tree.css',
            leaf: true
          },
          {
            module: 'react-ui-tree.js',
            leaf: true
          },
          {
            module: 'tree.js',
            leaf: true
          }
        ]
      },
      {
        module: 'example',
        children: [
          {
            module: 'app.js',
            leaf: true
          },
          {
            module: 'app.less',
            leaf: true
          },
          {
            module: 'index.html',
            leaf: true
          }
        ]
      },
      {
        module: 'lib',
        children: [
          {
            module: 'node.js',
            leaf: true
          },
          {
            module: 'react-ui-tree.js',
            leaf: true
          },
          {
            module: 'react-ui-tree.less',
            leaf: true
          },
          {
            module: 'tree.js',
            leaf: true
          }
        ]
      },
      {
        module: '.gitiignore',
        leaf: true
      },
      {
        module: 'index.js',
        leaf: true
      },
      {
        module: 'LICENSE',
        leaf: true
      },
      {
        module: 'Makefile',
        leaf: true
      },
      {
        module: 'package.json',
        leaf: true
      },
      {
        module: 'README.md',
        leaf: true
      },
      {
        module: 'webpack.config.js',
        leaf: true
      }
    ]
  };
  
//   class TreeMenu extends Component {
//     state = {
//       active: null,
//       tree: tree
//     };
  
//     renderNode = node => {
//       return (
//         <span
//           className={cx('node', {
//             'is-active': node === this.state.active
//           })}
//           onClick={this.onClickNode.bind(null, node)}
//         >
//           {node.module}
//         </span>
//       );
//     };
  
//     onClickNode = node => {
//       this.setState({
//         active: node
//       }, ()=>{console.log(node)});
//     };
  
//     render() {
//       return (
//         <div className="app">
//           <div className="tree">
//             <Tree
//               paddingLeft={20}
//               tree={this.state.tree}
//               onChange={this.handleChange}
//               isNodeCollapsed={this.isNodeCollapsed}
//               renderNode={this.renderNode}
//             />
//           </div>
//           <div className="inspector">
//             <h1>
//               {packageJSON.name} {packageJSON.version}
//             </h1>
//             <button onClick={this.updateTree}>update tree</button>
//             <pre>{JSON.stringify(this.state.tree, null, '  ')}</pre>
//           </div>
//         </div>
//       );
//     }
  
  
//     handleChange = tree => {
  
      
//       this.setState({
//         tree: tree
//       });
//     };
  
//     updateTree = () => {
//       const { tree } = this.state;
//       tree.children.push({ module: 'test' });
//       this.setState({
//         tree: tree
//       });
//     };
//   }
  

class TreeMenu extends Component{
    constructor(props){
        super(props);
         this.state ={
             active: {module: 'test', collapsed: false, leaf: true},
             tree: {
                module: 'react-ui-tree',
                children: [
                  {
                    module: 'dist',
                    collapsed: true,
                    children: [
                      {
                        module: 'node.js',
                        leaf: true,
                        path: 'react-ui-tree/dist/node.js'
                      },
                      {
                        module: 'react-ui-tree.css',
                        leaf: true
                      },
                      {
                        module: 'react-ui-tree.js',
                        leaf: true
                      },
                      {
                        module: 'tree.js',
                        leaf: true
                      }
                    ]
                  },
                  {
                    module: 'example',
                    children: [
                      {
                        module: 'app.js',
                        leaf: true
                      },
                      {
                        module: 'app.less',
                        leaf: true
                      },
                      {
                        module: 'index.html',
                        leaf: true
                      }
                    ]
                  },
                  {
                    module: 'lib',
                    children: [
                      {
                        module: 'node.js',
                        leaf: true
                      },
                      {
                        module: 'react-ui-tree.js',
                        leaf: true
                      },
                      {
                        module: 'react-ui-tree.less',
                        leaf: true
                      },
                      {
                        module: 'tree.js',
                        leaf: true
                      }
                    ]
                  },
                  {
                    module: '.gitiignore',
                    leaf: true
                  },
                  {
                    module: 'index.js',
                    leaf: true
                  },
                  {
                    module: 'LICENSE',
                    leaf: true
                  },
                  {
                    module: 'Makefile',
                    leaf: true
                  },
                  {
                    module: 'package.json',
                    leaf: true
                  },
                  {
                    module: 'README.md',
                    leaf: true
                  },
                  {
                    module: 'webpack.config.js',
                    leaf: true
                  }
                ]
              }
        }
        this.renderNode = this.renderNode.bind(this);
        this.onClickNode = this.onClickNode.bind(this);
    }

    renderNode(node){
        return (
          <span
            className={cx('node', {
              'is-active': node === this.state.active
            })}
            onClick={this.onClickNode.bind(null, node)}
          >
            {node.module}
          </span>
        );
      };
    
      onClickNode(node){
        this.setState({
          active: node
        }, ()=>{ console.log(this.state);})
      };
    

    handleChange(tree){
        this.setState({
          tree: tree
        });
      };
    
      updateTree(){
        const { tree } = this.state;
        tree.children.push({ module: 'test' });
        this.setState({
          tree: tree
        });
      };

    render() {
        return (
          <div className="app">
            <div className="tree">
              <Tree
                paddingLeft={20}
                tree={this.state.tree}
                // onChange={this.handleChange}
                isNodeCollapsed={this.isNodeCollapsed}
                renderNode={this.renderNode}
              />
            </div>
          </div>
        );
    }
}

export default TreeMenu

