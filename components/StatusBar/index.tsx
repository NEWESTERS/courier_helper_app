import * as React from 'react';
import {View} from "react-native";
import {Text} from "react-native-ui-kitten";

import {styleStatus} from "./StatusBar.style";
import { OrderStatus } from '../../store/orders';

interface IProps {
    status: OrderStatus
}

const mapStatusToBar = {
    [OrderStatus.Registered]:{
        text: 'ЗАРЕГЕСТРИРОВАН',
        step: 1,
        style:{
            backgroundColor: '#97aeb2'
        }
    },
    [OrderStatus.InProgress]:{
        text: 'ВЗЯТ В РАБОТУ',
        step: 2,
        style:{
            backgroundColor: '#3caea3'
        }
    },
    [OrderStatus.Assigned]:{
        text: 'ДОСТАВЛЯЕМ ЗАКАЗ',
        step: 3,
        style:{
            backgroundColor: '#f6d55c'
        }
    },
    [OrderStatus.Done]:{
        text: 'ЗАКАЗ ДОСТАВЛЕН',
        step: 4,
        style:{
            backgroundColor: 'green'
        }
    }
};

class StatusOrderBar extends React.Component<IProps> {
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

                <Text
                    style={[
                        styleStatus.textStatus,
                        mapStatusToBar[status].style
                    ]}
                >{mapStatusToBar[status].text} </Text>
            </View>
        );
    }
}

export default StatusOrderBar;
