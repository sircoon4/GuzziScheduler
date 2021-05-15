import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function path(target){
    const user = auth().currentUser;
    return '/users/' + user.email.slice(0,-4) + '/' + target;
}

//////// Schedule ////////
export async function getSchedule(order){
    const snapshot = await database().ref(path('schedules') + '/s' + order).once('value');
    return snapshot.val();
}

export async function getAllSchedule(){
    const snapshot = await database().ref(path('schedules')).once('value');
    return snapshot.val();
}

export async function createSchedule(json){
    const sendData = json;

    const snapshot = await database().ref(path('schedules')).orderByChild('order').limitToLast(1).once('value');
    const data = snapshot.val();

    if(data == null){
        sendData.order = 0;
    }
    else {
        sendData.order = data[Object.keys(data)[0]].order + 1;
    }
    
    const dbset = await database().ref(path('schedules') + '/s' + sendData.order).set(sendData);
    return sendData.order;
}

export async function updateSchedule(order, json){
    const sendData = json;

    const snapshot = await database().ref(path('schedules') + '/s' + order).once('value');
    const data = snapshot.val();

    if(data != null){
        const dbupd = await database().ref(path('schedules') + '/s' + order).update(sendData);
        return order;
    }
    else {
        return -1;
    }
}

export async function deleteSchedule(order){
    const snapshot = await database().ref(path('schedules') + '/s' + order).once('value');
    const data = snapshot.val();

    if(data != null){
        const dbdel = await database().ref(path('schedules') + '/s' + order).remove();
        return order;
    }
    else {
        return -1;
    }
}


//////// To do list ////////
export async function getTodo(order){
    const snapshot = await database().ref(path('todolist') + '/s' + order).once('value');
    return snapshot.val();
}

export async function getAllTodo(){
    const snapshot = await database().ref(path('todolist')).once('value');
    return snapshot.val();
}

export async function createTodo(json){
    const sendData = json;

    const snapshot = await database().ref(path('todolist')).orderByChild('order').limitToLast(1).once('value');
    const data = snapshot.val();

    if(data == null){
        sendData.order = 0;
    }
    else {
        sendData.order = data[Object.keys(data)[0]].order + 1;
    }
    
    const dbset = await database().ref(path('todolist') + '/s' + sendData.order).set(sendData);
    return sendData.order;
}

export async function updateTodo(order, json){
    const sendData = json;

    const snapshot = await database().ref(path('todolist') + '/s' + order).once('value');
    const data = snapshot.val();

    if(data != null){
        const dbupd = await database().ref(path('todolist') + '/s' + order).update(sendData);
        return order;
    }
    else {
        return -1;
    }
}

export async function deleteTodo(order){
    const snapshot = await database().ref(path('todolist') + '/s' + order).once('value');
    const data = snapshot.val();

    if(data != null){
        const dbdel = await database().ref(path('todolist') + '/s' + order).remove();
        return order;
    }
    else {
        return -1;
    }
}