import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base'
import axios from 'axios'

import { Bar } from 'react-native-pathjs-charts'

class BarChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      datas: []
    }
  }
  componentWillMount () {
    // let getData = [
    //   { name: 'Indomie Vegie', quantity: 14 },
    //   { name: 'Rainbow Sandwich', quantity: 3 },
    //   { name: 'Christmas Pie', quantity: 21 },
    //   { name: 'Pisang Vegie', quantity: 4 },
    //   { name: 'Bakar Sandwich', quantity: 23 },
    //   { name: 'Roti Pie', quantity: 11 },
    //   { name: 'jus Vegie', quantity: 4 },
    //   { name: 'Sate Sandwich', quantity: 3 }
    // ]
    axios.get('http://35.186.150.225:3000/api/order/dashboard-food/5ab7bce6f36d28275093857e')
      .then(({data}) => {
        let getData = data.data
        function compare(a, b) {
          let comparison = 0;
          if (a.quantity < b.quantity) {
            comparison = 1;
          } else if (a.quantity > b.quantity) {
            comparison = -1;
          }
          return comparison;
        }
    
        let dataSort = getData.sort(compare)
    
        //max 5 foods
        let dataFilter = []
        for (var i = 0; i < dataSort.length; i++) {
          if (i < 5) {
            dataFilter.push(dataSort[i])
          } else {
            break
          }
        }
    
        let datas = dataFilter.map(data => {
          return [{
            'name' : data.name,
            'total' : data.quantity
          }]
        })
        
        this.setState({
          datas
        })
      })
      .catch(err => console.log(err))
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const name = 'Summary'
    return {
      title: name,
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-stats" size={24} style={{ color: tintColor }} />
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
    let options = {
      width: 250,
      height: 300,
      margin: {
        top: 20,
        left: 25,
        bottom: 150,
        right: 20
      },
      color: '#e3af2f',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 12,
          fontWeight: true,
          fill: '#34495E',
          rotate: 45
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    if (this.state.datas.length > 0) {
      return (
        <View style={styles.container}>
          <Bar data={this.state.datas} options={options} accessorKey='total'/>
        </View>
      )
    } else {
      return <View></View>
    }
    
  }
}



const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

export default BarChart;