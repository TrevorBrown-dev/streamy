import React from 'react';
import { Field, reduxForm } from 'redux-form';

const normalizeLetters = (value, prevValue) => {
    if(value.match('^[a-z A-Z]+$') || !value ) return value;
    else return prevValue;
}

class StreamForm extends React.Component {
    renderError = ({error, touched}) => {
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : null}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/> 
                <div>{this.renderError(meta)}</div>
            </div>
        );

    }
   
   onSubmit = (formValues) => {
       this.props.onSubmit(formValues);
   }

    render() {
       return (
           <div>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
              <Field name="streamTitle" component={this.renderInput} normalize={normalizeLetters} label="Enter Title" />
              <Field name="streamDescription" component={this.renderInput} label="Enter Description" />
              <button className="ui button primary">Submit</button>
          </form>
           </div>
       )
   }
}

const validate = ({streamTitle, streamDescription}) => {
    const errors = {};
    if(!streamTitle) {
        errors.streamTitle = 'You must enter a title!'
    }

    if(!streamDescription) {
        errors.streamDescription = 'You must enter a description!'
    }
    return errors;
}

export default reduxForm({ form: 'StreamForm', validate })(StreamForm);
