import firebase, { firestore } from 'firebase';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Card } from 'react-native';
import db from '../config';

export default class RecieverDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            recieverID: this.props.navigation.getParam('details')["user_id"],
            requestID: this.props.navigation.getParam('details')["request_id"],
            bookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["reason_to_request"],
            recieverName: '',
            recieverContact: '',
            recieverAddress: '',
            recieverRequestDocID: '',
            username: ''
        }
    }

    addNotification = () => {
        var message = this.state.username + " Has Shown Interest in donating the bookn";
        db.collection("all_notifications").add({
            "targeted_user_id": this.state.recieverID,
            "donor_id": this.state.userID,
            "request_id": this.state.requestID,
            "book_name": this.state.bookName,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status": "unread",
            "message": message
        })
    }

    upDateBookStatus = () => {
        db.collection('all_donations').add({
            book_name: this.state.bookName,
            request_id: this.state.requestID,
            requested_by: this.state.recieverName,
            donor_id: this.state.userID,
            request_status: "Donor interested",
        })
    }

    render() {
        return (
            <View>
                <View>
                    <Card title={"Book information"} titleStyle={{ fontSize: 20 }} >
                        <Card>
                            <Text> Name:{this.state.bookName} </Text>
                        </Card>
                        <Card>
                            <Text> Reason to request:{this.state.reason_for_requesting} </Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    <Card title={"Reciever information"} titleStyle={{ fontSize: 20 }} >
                        <Card>
                            <Text> Name:{this.state.recieverName} </Text>
                        </Card>
                        <Card>
                            <Text> Contact:{this.state.recieverContact} </Text>
                        </Card>
                        <Card>
                            <Text> Address:{this.state.recieverAddress} </Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    {this.state.recieverID !== this.state.userID ? (
                        <TouchableOpacity onPress={() => {
                            this.upDateBookStatus()
                            this.addNotification()
                            this.props.navigation.navigate('MyDonations')
                        }} >
                            <Text> I want to Donate </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        )
    }
}