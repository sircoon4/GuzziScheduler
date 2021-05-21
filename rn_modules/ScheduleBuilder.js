import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button } from "react-native";

import dateFormat from 'dateformat';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScheduleBuilder = (props) => {
    const [color, setColor] = useState('red');
    const [showTip, setTip] = useState(false);

    const [title, onChangeTitle] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState('start');

    const [repeat, setRepeat] = useState(0);
    const [ddopen, setddOpen] = useState(false);
    const [dditems, setddItems] = useState([
        { label: '안 함', value: 0 },
        { label: '매 일', value: 1 },
        { label: '매 주', value: 2 },
    ]);

    const val = React.useRef();
    React.useEffect(
        () => {
            val.current = props;
        },
        [props]
    );
    React.useEffect(() => {
        return () => {
            console.log(props, val.current);
        };
    }, []);

    const onChange = (event, selectedDate) => {
        if (dateType == 'start') {
            const currentDate = selectedDate || startDate;
            if (mode == 'day') {
                setDate(currentDate);
                setMode('time');
            }
            else if (mode == 'time') {
                setStartDate(currentDate);
                setShow(false);
            }
        }
        else if (dateType == 'end') {
            const currentDate = selectedDate || endDate;
            setEndDate(currentDate);
            setShow(false);
        }
    };

    const showMode = (currentType, currentMode) => {
        setDateType(currentType);

        if (dateType == 'start')
            setDate(startDate);
        else if (dateType == 'end')
            setDate(endDate);

        setMode(currentMode);
        setShow(true);
    };

    const submit = () => {
        var data = {};

        data.color = color;
        data.title = title;
        data.startDate = startDate;
        data.endDate = endDate;
        data.repeat = repeat;

        props.saveSchedule(data);
    }

    const createToolTip = (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 200}}>
            <TouchableOpacity onPress={() => setColor('red')}>
                <Icon name = "circle" size={30} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('blue')}>
                <Icon name = "circle" size={30} color="blue"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('green')}>
                <Icon name = "circle" size={30} color="green"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColor('black')}>
                <Icon name = "circle" size={30} color="black"/>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text>{"\n"}</Text>
            <Tooltip
                isVisible={showTip}
                content={createToolTip}
                onClose={() => setTip(false)}
                placement="bottom"
                closeOnContentInteraction={false}
            >
                <TouchableOpacity
                    onPress={() => setTip(true)}
                >
                    <Icon name = "circle" size={30} color={color}/>
                </TouchableOpacity>
            </Tooltip>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                placeholder="Title"
                value={title}
            />
            <Text>{"\n"}</Text>
            <View>
                <Text>
                    Start Date Time
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => showMode('start', 'day')}
                >
                    <Text>{dateFormat(startDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</Text>
                </TouchableOpacity>
            </View>
            <Text>{"\n"}</Text>
            <View>
                <Text>
                    End Date Time
            </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => showMode('end', 'time')}
                >
                    <Text>{dateFormat(endDate, "h:MM:ss TT")}</Text>
                </TouchableOpacity>
            </View>
            <Text>{"\n"}</Text>
            <View>
                <Text>
                    반복
                </Text>
                <DropDownPicker
                    open={ddopen}
                    value={repeat}
                    items={dditems}
                    setOpen={setddOpen}
                    setValue={setRepeat}
                    setItems={setddItems}
                />
            </View>
            <Text>{"\n"}</Text>
            <Button
                title="save"
                onPress={submit}
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '80%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        width: '70%',
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});

export default ScheduleBuilder;