import * as React from 'react';
import {View} from "react-native";
import {Text} from "react-native-ui-kitten";
import {styleStatus} from "./StatusBar.style";

interface IProps {
    status: string
}

const mapStatusToBar = {
    REGISTERED:{
        text: 'ЗАРЕГЕСТРИРОВАН',
        step: 1,
        style:{
            backgroundColor: '#97aeb2'
        }
    },
    IN_PROGRESS:{
        text: 'ВЗЯТ В РАБОТУ',
        step: 2,
        style:{
            backgroundColor: '#3caea3'
        }
    },
    ASSIGNED:{
        text: 'ДОСТАВЛЯЕМ ЗАКАЗ',
        step: 3,
        style:{
            backgroundColor: '#f6d55c'
        }
    },
    DONE:{
        text: 'ЗАКАЗ ДОСТАВЛЕН',
        step: 4,
        style:{
            backgroundColor: 'green'
        }
    }
};

type State = Readonly<{}>;

class StatusOrderBar extends React.Component<IProps, State> {

    makeBarBalls(statusNum:number){
        let components = [];
        for(let i = 0; i < statusNum; i++){
            components.push( <View key={'g' + i } style={styleStatus.greenBall}/> );
        }
        for(let i = statusNum; i < 4; i++){
            components.push (<View key={'r' + i } style={styleStatus.grayBall}/> );
        }
        return components;
    }

    render() {
        const { status } = this.props;
        return (
            <View style={styleStatus.Wrapper}>
                <View style={styleStatus.Bar}>
                    {this.makeBarBalls(mapStatusToBar[status].step)}
                </View>
                <Text style={{...styleStatus.textStatus, ...mapStatusToBar[status].style}}>{mapStatusToBar[status].text} </Text>
            </View>
        );
    }
}

export default StatusOrderBar;
