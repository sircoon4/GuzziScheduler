import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function path(){
    const user = auth().currentUser;
    return '/users/' + user.email.slice(0,-4) + '/schedules';
}

export async function getSchedule(order){
    const snapshot = await database().ref(path() + '/s' + order).once('value');
    return snapshot.val();
}

export async function getAllSchedule(){
    const snapshot = await database().ref(path()).once('value');
    return snapshot.val();
}

export async function createSchedule(json){
    const sendData = json;

    const snapshot = await database().ref(path()).orderByChild('order').limitToLast(1).once('value');
    const data = snapshot.val();

    if(data == null){
        sendData.order = 0;
    }
    else {
        sendData.order = data[Object.keys(data)[0]].order + 1;
    }
    
    const dbset = await database().ref(path() + '/s' + sendData.order).set(sendData);
    return sendData.order;
}

export async function updateSchedule(order, json){
    const sendData = json;

    const snapshot = await database().ref(path() + '/s' + order).once('value');
    const data = snapshot.val();

    if(data != null){
        const dbupd = await database().ref(path() + '/s' + order).update(sendData);
        return order;
    }
    else {
        return -1;
    }
}

export async function deleteSchedule(order){
    const snapshot = await database().ref(path() + '/s' + order).once('value');
    const data = snapshot.val();

    if(data != null){
        const dbdel = await database().ref(path() + '/s' + order).remove();
        return order;
    }
    else {
        return -1;
    }
}