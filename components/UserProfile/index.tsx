import React, { FC, useState } from 'react';
import { View, Slider, Text, StyleSheet } from 'react-native';
import { Layout, CheckBox } from 'react-native-ui-kitten';

const weekDays = {
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье"
}

const UserProfile: FC = () => {
    const [ searchRadius, setSearchRadius ] = useState(15),
        [schedule, setSchedule] = useState({
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false
        });

    const switchScheduleDay = (field: keyof typeof schedule) => () => {
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [field]: !prevSchedule[field]
        }))
    }

    return(
	    <Layout style={{flex: 1, justifyContent: "flex-start", alignItems: "center", padding: 20}}>
            <View style={styles.container}>
                <Text style={styles.label}>Радиус поиска заказов: {searchRadius} км</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={100}
                    style={{ width: "100%" }}
                    onValueChange={value => setSearchRadius(Math.round(value))}
                    value={searchRadius}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.label}>График работы</Text>

                <View>
                    { Object.entries(weekDays).map(([ key, value ]) =>
                        <CheckBox
                            key={key}
                            style={styles.checkbox}
                            onChange={switchScheduleDay(key as keyof typeof schedule)}
                            text={value}
                            checked={schedule[key as keyof typeof schedule]}
                        />
                    )}
                </View>
            </View>
        </Layout>
    )
};

const styles = StyleSheet.create({
    label: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },

    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        marginBottom: 20
    },

    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },

    checkbox: {
        marginTop: 5,
        marginBottom: 5
    }
});

export default UserProfile;