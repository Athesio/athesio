import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class GistModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.status,
      gistDescription: '',
      gistName: '',
    }
    this.updateField = this.updateField.bind(this);
  }

  updateField(e) {
    console.log(e.target.name);
    this.setState({ [`${e.target.name}`]: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.props.toggle} className="text-center" >
          <ModalHeader toggle={this.toggle} > Create Gist </ModalHeader>
          <ModalBody >
            Gist Name  <input type="text" name="gistName" onChange={this.updateField} /><br/>
            Description <input type="text" name="gistDescription" onChange={this.updateField}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.props.saveGist(this.state.gistName, this.state.gistDescription)} >Create</Button>
            <Button onClick={this.props.toggle} >Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default GistModal;