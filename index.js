import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect } from 'react-select';

// specify props.allowSelectAll = true to enable!
const ExtendedMultiSelect = props => {
  let thisOptions = [];
  if (props.allowSelectAll) {
    if (props.hasGroups && thisOptions.length === 0) {
      const propValues = props.value.map(v => v.value);
      props.options.forEach(element => {
        if (element.options) {
          const options = element.options.map(e => e.value);
          const containsAll =
            options.length === 0 ? false : options.every(o => propValues.includes(o));
          if (!containsAll) {
            thisOptions.push({
              label: `Select All ${element.label}`,
              value: element.options,
              group: element.group,
            });
          }
        }
      });
      props.options.forEach(element => {
        thisOptions.push(element);
      });
    }

    if (props.hasGroups) {
      if (props.value.length === props.options.length) {
        return (
          <ReactSelect
            {...props}
            onChange={(selected, e) => props.onChange(selected.slice(1), e)}
          />
        );
      }

      return (
        <ReactSelect
          {...props}
          options={thisOptions}
          onChange={(selected, e) => {
            if (selected && selected.length > 0 && selected[selected.length - 1].group) {
              const groupSelector = selected[selected.length - 1];

              const concat = groupSelector.value.filter(function(objFromA) {
                return !selected.find(function(objFromB) {
                  return objFromA.value === objFromB.value;
                });
              });

              const newItems = selected.slice(0, selected.length - 1).concat(concat);

              return props.onChange(newItems, e);
            }
            return props.onChange(selected, e);
          }}
        />
      );
    }

    if (props.value.length === props.options.length) {
      return (
        <ReactSelect {...props} onChange={(selected, e) => props.onChange(selected.slice(1), e)} />
      );
    }

    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={(selected, e) => {
          if (
            selected.length > 0 &&
            selected[selected.length - 1].value === props.allOption.value
          ) {
            return props.onChange(props.options, e);
          }
          return props.onChange(selected, e);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

ExtendedMultiSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

ExtendedMultiSelect.defaultProps = {
  allOption: {
    label: 'Select all',
    value: '*',
  },
};

export default ExtendedMultiSelect;
