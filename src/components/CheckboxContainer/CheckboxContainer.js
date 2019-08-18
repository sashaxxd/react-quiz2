import React from 'react';
// import PropTypes from 'prop-types';
import checkboxes from './checkboxes/checkboxes';
import Checkbox from './Checkbox/Checkbox';

class CheckboxContainer extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         checkedItems: new Map(),
    //     }
    //
    //     this.handleChange = this.handleChange.bind(this);
    // }



    render() {
        return (
            <div style={{backgroundColor: '#0166CA', height: 70}}>
                <div style={{fontSize: '30px', color: '#FFF'}}>{this.props.test} </div>
            <React.Fragment>
                {
                    checkboxes.map(item => (
                        <label key={item.key}>
                            {item.name}
                            <Checkbox name={item.name} checked={this.props.checkedItems.get(item.name)} onChange={this.props.handleCheckboxChange} />
                        </label>
                    ))
                }
            </React.Fragment>
            </div>
        );
    }
}

export default CheckboxContainer;