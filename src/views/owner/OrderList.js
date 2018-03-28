import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, Image, ScrollView } from 'react-native';
import { Card, CardItem, Body, Left, Right, Button, Icon } from 'native-base';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pusher from 'pusher-js/react-native'; // for using Pusher inside React Native

// import ButtonUpdate from './ButtonUpdate'

import { changeStatusAction, fetchOwner, update } from '../../store/actions'
class OrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefresh: false,
      isCustomer: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const name = 'Order List'
    return {
      title: name,
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-list" size={24} style={{ color: tintColor }} />
      ),
      headerLeft:
        <Icon
          style={{color: '#fff'}}
          ios='ios-menu' android="md-menu"
          size={35}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
    }
  }

  handleButton = (item) => {
    this.props.changeStatusAction(item, this.props.owner)
    let isRefresh = !this.state.isRefresh
    this.setState({
      isRefresh
    })
  }

  componentDidMount () {
    this.getPusherData()
  }

  handleUpdate = () => {
    this.props.update(this.props.owner)
    let isRefresh = !this.state.isRefresh
    this.setState({
      isRefresh
    })
  }

  render() {
    if (this.props.owner.length > 0) {
      return (
        <View>
          <ScrollView>
          <FlatList
            extraData={this.state.isRefresh}
            data={this.props.owner}
            renderItem={({item}) => (
              <Card>
              <CardItem style={{backgroundColor: item.isReady ? '#fff8a8' : 'white'}}>  
                  <Left style={style.leftList}>
                    <Text>Table: {item.table.name}</Text>
                    <Text>{item.menuList.name} </Text>
                    <Text>quantity: {item.quantity} </Text>
                  </Left>
                  <Right>
                    <Button 
                      style={style.submitButton} warning
                      onPress={() => this.handleButton(item)}
                      >
                      <Text style={{color: 'white'}}> V </Text>
                    </Button>
                  </Right>
              </CardItem>
            </Card>
            )}
          />
          <View>
            <Button full success
            onPress={() => this.handleUpdate()} >
              <Text style={{color : 'white', textAlign: 'center'}}> UPDATE </Text> 
            </Button>
          </View>
          </ScrollView>
        </View>
      );
    } else {
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={style.zeroList}>You don't have any order</Text>
        </View>
      )
    }
  }

  getPusherData () {
    var pusher = new Pusher('878d5b48666a27d89b79', {
      cluster: 'ap1',
      encrypted: true
    });

    var channel = pusher.subscribe('restaurant-channel');
    channel.bind('get-order-data', (data) => {
      let isRefresh = !this.state.isRefresh
      this.setState({
        isRefresh
      })
      console.log('ini state', this.state)
      console.log('get order list : ', data)
      console.log('ini props an yg keknya owner : ', this.props.owner)
      let menu = this.props.owner
      if (menu.length > 0) {
        let idx = menu.findIndex(m => m.menuList._id === data.menuList._id)
        if (idx === -1) {
          menu.push(data)
          this.props.fetchOwner(menu) 
        }
      } else {
        menu.push(data)
        this.props.fetchOwner(menu)
      }
    });
    channel.bind('restaurant-data-failed', (data) => {
      Alert.alert('Error connection, please try again')
    })
  }
}

const style = StyleSheet.create({
  leftList: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  submitButton: {
    width: 45,
    justifyContent: 'center'
  },
  zeroList: {
    textAlign: 'center',
    fontSize: 20
  }
})

const mapStateToProps = state => ({
  owner: state.owner
})

const mapDispatchToProps = dispatch => ({
  changeStatusAction,
  fetchOwner,
  update
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)