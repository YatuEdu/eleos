import React, { Component, ChangeEvent } from 'react';

interface EleosInputBaseProps {
    name: string;
    value: string;
    mustHave?: boolean;
    onTextEntered: (value: string) => void;
   
}

// Define the state interface
interface InputState {
    value: string;
  }

class EleosInputBase extends Component<EleosInputBaseProps, InputState> {
  constructor(props: EleosInputBaseProps) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
    this.props.onTextEntered(event.target.value);
  }

  render() {
    // Define styles based on the input text length
    const inputStyle = {
      borderColor: this.props.mustHave && this.state.value.length === 0 ? 'red' : 'black'
    };

    return (
      <div>
        <input
          name={this.props.name}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <p>Text length: {this.state.value.length}</p>
      </div>
    );
  }
}

export default EleosInputBase;
