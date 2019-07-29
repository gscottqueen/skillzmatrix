import React, { Component } from 'react'

export class SearchFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }

    this.getCurrentValue = this.getCurrentValue.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCurrentValue(e) {
    // Variable to hold the original version of the list
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <input type="text" className="input" placeholder="Search..." value="" onChange={this.getCurrentValue} />
      </div>
    )
  }
}

export default SearchFilter
