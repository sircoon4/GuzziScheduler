import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';

import {Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
import ScheduleBuilder from '../rn_modules/ScheduleBuilder';

import Icon from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';

const testIDs = require('../testIDs');

export default class MainCalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      items: {},
    };
  }

  ProfileHeader() {
    const profilePath = require('../images/skyyy_round.png');
  
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 60, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Image
            style={{ width: 50, height: 50, marginLeft: 15, marginTop: 5 }}
            source={profilePath}
          />
        </View>
        <View style={{flex:3, justifyContent:'flex-end'}}>
          <Text style={{fontSize: 23, marginLeft: 10, marginBottom: 5}}>2021년 5월</Text>
        </View>
        <View style={{flex:1, justifyContent:'flex-end'}}>
          <TouchableOpacity
            onPress={() => auth().signOut()}
          >
            <Icon name = "search" size={30} style={{marginBottom: 10}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.ProfileHeader()}
        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
        />
        <View style={{height:60, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text> 광고 </Text>
          <TouchableOpacity onPress={()=>this.toggleModal()}>
              <Image style={{width: 60, height: 60}} source={require('../images/blue_plus_button.png')} />
          </TouchableOpacity>
        </View>
        <Modal 
          isVisible = {this.state.isModalVisible}
          onBackdropPress = {() => this.toggleModal()}
        >
          <ScheduleBuilder saveSchedule = {(data) => this.saveSchedule(data)}/>
        </Modal>
      </View>
    );
  }

  saveSchedule = (data) => {
    console.log(data);
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: 50
            });
          }
        }
      }

      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 5
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});