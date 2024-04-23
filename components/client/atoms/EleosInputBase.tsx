import { EleosInputBaseProps } 
                from '@/lib/client/model/EleosMisc';
import React, { Component, ChangeEvent } 
                from 'react';


// Define the state interface
interface InputState {
    value: string;
    isValid: boolean;
  }

class EleosInputBase extends Component<EleosInputBaseProps, InputState> {
    protected inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: EleosInputBaseProps) {
        super(props);
        this.state = {
            value: props.value || '',
            isValid:  true
        };
        console.log('EleosInputBase props', props)
        this.inputRef = React.createRef();
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valid = this.validate(event.target.value);
        this.setState({ value: event.target.value, isValid: valid});
        this.props.onTextEntered(event.target.value, valid);
    }

    validate = (value: string) => {
        if (this.props.mustHave && value === '') {
            return false;
        } else {
            return true;
        }       
    }

    componentDidMount() {
        if (this.inputRef.current) {
            // Access the input element using the ref
            // console.log(this.inputRef.current);
        }
    }

    render() {
        // Define styles based on the input text length
        const inputStyle = {
            borderColor: !this.state.isValid ? 'red' : 'black',
            borderRadius: '5px', 
            padding: '5px',
            width: '75%', 
        };

        return (
            <div>
            <input
                name={this.props.name}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                style={{ ...inputStyle, }} 
                ref={this.inputRef} 
            />
            {!this.state.isValid && <span style={{color: 'red', marginLeft: 2} }>Invalid {this.props.name}</span>}
            </div>
        );
    }
}

export default EleosInputBase;
