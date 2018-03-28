import React from 'react';
import { Provider } from 'react-redux'
import store from './src/store'

import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'

import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';

import SplashScreen from './src/views/SplashScreen'
import OrderList from './src/views/owner/OrderList'
import PieChart from './src/views/owner/PieChart'
import BarChart from './src/views/owner/BarChart'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      isSplash: true
    }
  }

  onChangeState = () => {
    setTimeout(() => {
      this.setState({ isSplash: false })
    }, 0)
  }

  render() {
    if (this.state.isSplash) {
      return <SplashScreen onChangeState={this.onChangeState} />
    } else {
      return (
        <Provider store={store}>
          <Container>
            <RootStack />
          </Container>
        </Provider>
      );
    }
  }
}

const sharedNavigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#4CAF50',
    paddingLeft: 12
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
})


const Stack = {
  OrderList: {
    screen: OrderList
  },
  PieChart: {
    screen: PieChart
  },
  BarChart: {
    screen: BarChart
  }
}


const DrawerRoutes = {
  OrderListStack: {
    name: 'OrderListViewStack',
    screen: StackNavigator(Stack, { 
      initialRouteName: 'OrderList', 
      navigationOptions: sharedNavigationOptions
    })
  },
  PieChartStack: {
    name: 'PieChartViewStack',
    screen: StackNavigator(Stack, { 
      initialRouteName: 'PieChart', 
      navigationOptions: sharedNavigationOptions
    })
  },
  BarChartStack: {
    name: 'BarChartViewStack',
    screen: StackNavigator(Stack, { 
      initialRouteName: 'BarChart', 
      navigationOptions: sharedNavigationOptions
    })
  }
}

const RootStack =
  StackNavigator({
    Drawer: {
      name: 'Drawer',
      screen: DrawerNavigator(
        DrawerRoutes,
        {
          contentComponent: (props) => (
            <ScrollView>
              <Container style={styles.navigationBackground}>
                <Container style={styles.navigationImage}>
                  <Image 
                    source={require('./src/res/background.jpg')} 
                    style={styles.itemImage}/>
                </Container>
                <Container style={styles.itemBackground}>
                  <Image source={require('./src/res/logo.png')} style={styles.itemName} />
                </Container>
              </Container>
              <DrawerItems {...props} activeTintColor='#2196f3' padding='16' />
            </ScrollView>
          ),
        }
      )
    },
    ...Stack
  },
  {
    headerMode: 'none'
  }
)

const styles = StyleSheet.create({
  navigationBackground: {
    flex: 1,
    height: 160,
  },
  navigationImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  itemImage: {
    flex: 1, 
    resizeMode: 'center',
    width: '100%',
    height: '100%'
  },
  itemBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  itemName: {
    height: 72,
    width: 72,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }
})

