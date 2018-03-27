import React, { Component } from 'react';
import {  View, Text } from 'react-native';
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateAction } from '../../store/actions'

class ButtonUpdate extends Component {
  render() {
    if (this.props.orderLists && this.props.orderLists.length > 0) {
      return (
        <View>
          <Button onPress={() => this.props.updateAction(this.props.orderLists)} full success>
            <Text style={{color : 'white', textAlign: 'center'}}> UPDATE </Text> 
          </Button>
        </View>
      );
    } else {
      return <View>
        <Text>You don't have any order</Text>
      </View>
    }
  }
}

const mapStateToProps = state => ({
  orderLists: this.props.orderLists
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAction
}, dispatch)

export default connect(null, mapDispatchToProps)(ButtonUpdate)
