import PropTypes from 'prop-types'
import React from 'react'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import { setIfMissing } from 'part:@sanity/form-builder/patch-event'
// FormBuilderInput automatically generates fields from a schema
import { FormBuilderInput } from 'part:@sanity/form-builder'
// a Higher Order Component that passes document values as props
import { withDocument } from 'part:@sanity/form-builder'

class CustomObjectInput extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string
    }),
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  firstFieldInput = React.createRef()

  handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type } = this.props

    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({ _type: type.name })))
  }

  focus() {
    this.firstFieldInput.current.focus()
  }

  render() {
    const { document, type, value, level, onFocus, onBlur } = this.props

    const condition =
      value !== undefined && value.hasOwnProperty('condition') ? value.condition : false

    return (
      <Fieldset level={level} legend={type.title} description={type.description}>
        <div>
          {type.fields
            .filter(field => (field.name === 'video' ? condition : true))
            .filter(field => (field.name === 'image' ? !condition : true))
            .map((field, i) => (
              // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
              // for the given field type
              <FormBuilderInput
                level={level + 1}
                ref={i === 0 ? this.firstFieldInput : null}
                key={field.name}
                type={field.type}
                value={field.name === 'condition' ? condition : value && value[field.name]}
                onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
                path={[field.name]}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            ))}
        </div>
      </Fieldset>
    )
  }
}

export default withDocument(CustomObjectInput)
