import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, Image, Button, KeyboardAvoidingView} from 'react-native';

import {Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
import ScheduleBuilder from '../rn_modules/ScheduleBuilder';
import dateFormat from 'dateformat';
import Icon from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import * as dbAct from '../utils/dbAct.js';

import NotifService from '../utils/NotifService';

const testIDs = require('../testIDs');

export default class MainCalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      items: {},
      marked: {},
      selectedTime: this.timeToString(new Date()),
      editSign: false,
      editItem: null
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
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
            //onPress={() => auth().signOut()}
            onPress={() => this.notif.localNotif()}
          >
            <Icon name = "search" size={30} style={{marginBottom: 10}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'white'}}
        behavior = "padding"
        enable = {true}
      >
        {this.ProfileHeader()}
        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.state.selectedTime}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
            backgroundColor: '#FEFEFE',
            // calendarBackground: 'white',
            // agendaDayTextColor: 'yellow',
            // agendaDayNumColor: 'green',
            // agendaTodayColor: 'red',
            // agendaKnobColor: 'blue'
          }}
          markingType={'multi-dot'}
          markedDates={this.state.marked}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
        />
        <View style={{height:60, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text> 광고 </Text>
          <TouchableOpacity onPress={()=>this.openCreateModal()}>
              <Image style={{width: 60, height: 60}} source={require('../images/blue_plus_button.png')} />
          </TouchableOpacity>
        </View>
        <Modal
          isVisible = {this.state.isModalVisible}
          //onBackdropPress = {() => this.toggleModal()}
          avoidKeyboard = {true}
        >
          <ScheduleBuilder
            modalHandler = {() => this.toggleModal()}
            saveSchedule = {(data) => this.saveSchedule(data)}
            deleteSchedule = {(key) => this.deleteSchedule(key)}
            editSign = {this.state.editSign}
            editItem = {this.state.editItem}
          />
        </Modal>
      </KeyboardAvoidingView>
    );
  }

  openCreateModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      editSign: false,
      editItem: null,
    });
  }

  openUpdateModal = async (key) => {
    var editItemWithKey = await dbAct.getSchedule(key.split('s')[1]);
    editItemWithKey.key = key;
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      editSign: true,
      editItem: editItemWithKey
    });
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  saveSchedule = async (data) => {
    const dateData = data;

    if(dateData != null && data.key == 'new'){
      delete dateData['key'];

      var skey = await dbAct.createSchedule(dateData);
      var dateStr = dateData.start_datetime.split('T')[0];
      var isDotExist = false;
      if(this.state.items[dateStr] == undefined){
        this.state.items[dateStr] = [];
        this.state.marked[dateStr] = {};
        this.state.marked[dateStr].dots = [];
      }
      else{
        const dotArr = this.state.marked[dateStr].dots;
        dotArr.forEach((val)=>{
          if(val.color == dateData.color)
            isDotExist = true;
        })
        if(!isDotExist){
          this.state.marked[dateStr].dots.push({color: dateData.color});
        }
      }
      var newItem = {};
      newItem.key = skey;
      var date_time = dateData.start_datetime.split('T')[1];
      date_time = date_time.split(':')[0] + ':' + date_time.split(':')[1];
      newItem.startTime = date_time;
      date_time = dateData.end_datetime.split('T')[1];
      date_time = date_time.split(':')[0] + ':' + date_time.split(':')[1];
      newItem.endTime = date_time;
      newItem.title = dateData.title;
      newItem.color = dateData.color;
      if(!isDotExist){
        this.state.marked[dateStr].dots.push({color: dateData.color});
      }
      this.state.items[dateStr].push(newItem);
    }

    setTimeout(()=>{
      this.toggleModal();
    }, 300);
  }

  deleteSchedule = (key) => {
    dbAct.deleteSchedule(key.split('s')[1]);
    Object.keys(this.state.items).forEach(dkey => {
      const arr = this.state.items[dkey];
      for(var i=0;i<arr.length;i++){
        if(arr[i].key == key){
          this.state.items[dkey].splice(i, 1);
        }
      }
    });

    setTimeout(()=>{
      this.toggleModal();
    }, 300);
  }

  async loadItems(day) {
    const schedules = await dbAct.getAllSchedule();
    setTimeout(() => {
      var newItems = {};
      var newDots = {};
      Object.keys(schedules).forEach(key => {
        const item = schedules[key];
        var dateStr = item.start_datetime.split('T')[0];
        var isDotExist = false;
        if(newItems[dateStr] == undefined){
          newItems[dateStr] = [];
          newDots[dateStr] = {};
          newDots[dateStr].dots = [];
        }
        else{
          const dotArr = newDots[dateStr].dots;
          dotArr.forEach((val)=>{
            if(val.color == item.color)
              isDotExist = true;
          })
        }
        var newItem = {};
        newItem.key = key;
        var date_time = item.start_datetime.split('T')[1];
        date_time = date_time.split(':')[0] + ':' + date_time.split(':')[1];
        newItem.startTime = date_time;
        date_time = item.end_datetime.split('T')[1];
        date_time = date_time.split(':')[0] + ':' + date_time.split(':')[1];
        newItem.endTime = date_time;
        newItem.title = item.title;
        newItem.color = item.color;
        if(!isDotExist){
          newDots[dateStr].dots.push({color: item.color});
        }
        newItems[dateStr].push(newItem);
      });
      
      this.setState({
        items: newItems,
        marked: newDots,
      });
    }, 300);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: 70}]}
        onPress={() => this.openUpdateModal(item.key)}
      >
        {/* <View style={{flexDirection: 'row'}}>
          <View style={{flex:5, backgroundColor: 'red', height: 65}}>

          </View>
          <View style={{flex:80, marginLeft: 10, backgroundColor: 'white'}}>

          </View>
          <View style={{flex:252, backgroundColor: 'white'}}>
            <Text>{item.name}</Text>
          </View>
        </View> */}

        <View style={{flexDirection: 'row', alignItems: 'center', borderLeftColor: item.color, borderLeftWidth: 4, height: 75}}>
          {/* <View style={{flex:5, backgroundColor: 'red', height: 75, marginTop: 5}}>

          </View> */}
          <View style={{flex:80, marginLeft: 5, backgroundColor: 'transparent', alignItems: 'center'}}>
            <Text style={{textAlign: 'center'}}>
              {item.startTime + "\n ~ \n" + item.endTime}
            </Text>
          </View>
          <View style={{flex:252, backgroundColor: 'transparent'}}>
            <Text>
              {"  " + item.title}
            </Text>
          </View>
        </View>
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
    return dateFormat(date, 'isoDateTime').split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'transparent',
    flex: 1,
    borderRadius: 5,
    //padding: 10,
    paddingTop: 5,
    marginRight: 10,
    marginTop: 15,
    //borderBottomWidth:1, 
    borderTopWidth:1,
    borderColor: '#EEEEEE'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});