import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base'
import axios from 'axios'

import { Pie } from 'react-native-pathjs-charts'
import TablePie from './TablePie'

class PieChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data : []
    }
  }
  componentWillMount () {
    this.getData()
  }

  getData = async () => {
    try {
      let {data} = await axios.get('http://35.186.150.225:3000/api/order/dashboard-category/5ab7bce6f36d28275093857e')
      console.log('axios data : ', data)
      this.setState({
        data: data.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount () {
    console.log('state data : ',this.state.data)
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const name = 'Order Proportion'
    return {
      title: name,
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-pie" size={24} style={{ color: tintColor }} />
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

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Pie data={this.state.data}
            accessorKey="quantity"
            margin={{ top: 30, bottom: 20 }}
            pallete={
              [
                { 'r': 25, 'g': 99, 'b': 201 },
                { 'r': 24, 'g': 175, 'b': 35 },
                { 'r': 190, 'g': 31, 'b': 69 },
                { 'r': 100, 'g': 36, 'b': 199 },
                { 'r': 214, 'g': 207, 'b': 32 },
                { 'r': 198, 'g': 84, 'b': 45 }
              ]
            }
            r={30}
            R={150}
            label={{
              fontFamily: 'Arial',
              fontSize: 14,
              fontWeight: true,
              color: '#ECF0F1'
            }}
            height={350}
          />
        </View>
        <View>
          <TablePie data={this.state.data}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'center'
  },
});

export default PieChart