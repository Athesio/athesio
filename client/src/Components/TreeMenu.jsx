import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import ReactDOM from 'react-dom';
import cx from 'classnames';

  

class TreeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: {module: 'test', collapsed: false, leaf: true},
          tree: null
        }
        this.renderNode = this.renderNode.bind(this);
        this.onClickNode = this.onClickNode.bind(this);
    }

    componentDidMount() {
        // console.log('something from treemenu');
        // console.log(this.props.data);
        this.setState({tree: this.props.data});
    }

    renderNode(node) {
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
    
      onClickNode(node) {
        this.setState({
          active: node
        }, () => { console.log(this.state) })
      };
    

    handleChange(tree) {
        this.setState({
          tree: tree
        });
      };
    
      updateTree() {
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

