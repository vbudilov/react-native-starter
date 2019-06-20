import React from 'react';
import {Icon} from 'native-base';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Icon
                name={this.props.name}
                style={{
                    fontSize: 20,
                    color: this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
                    marginBottom: -3
                }}
            />
        );
    }
}
