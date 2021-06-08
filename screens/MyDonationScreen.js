import firebase, { firestore } from 'firebase';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Card } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import MyHeader from '../components/MyHeader';
import db from '../config';

export default class MyDonationScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            donorID: firebase.auth().currentUser.email,
            donorName: '',
            allDonation: []
        }
        this.requestRef = null
    }

    static navigationOptions = { header: null }

    getDonorDetails = () => {
        this.requestRef = db.collection("all_donations").where("donor_id", "==", this.state.donorID)
            .onSnapshot((snapshot) => {
                var allDonations = [];
                snapshot.docs.map((doc) => {
                    var donation = doc.data();
                    donation["doc_id"] = doc.id;
                    allDonations.push(donation);
                })
                this.setState({
                    allDonation: allDonations
                })
            })
    }

    sendNotification = (bookDetails, requestStatus) => {
        var requestID = bookDetails.request_id;
        var donorID = bookDetails.donor_id;
        db.collection("all_notifications").where("request_id", "==", requestID)
            .where("donor_id", "==", donorID)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = "";
                    if (requestStatus === "Book Sent") {
                        message = this.state.donorName + " Sent You book"
                    }
                    else {
                        message = this.state.donorName + " has Shown Interest in donating the book"
                    }
                    db.collection("all_notifications").doc(doc.id).update({
                        "message": message,
                        "notification_status": "unread",
                        "date": firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
            })
    }

    sendBook = (bookDetails) => {
        if (bookDetails.requestStatus === "Book Sent") {
            var requestStatus = "Donor Interested";
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status": requestStatus
            })
            this.sendNotification(bookDetails, requestStatus)
        } else {
            var requestStatus = "Book Sent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status": "Book Sent"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
    }

    keyExtractor = (item, i) => i.toString();

    renderItem = ({ item, i }) => {
        <ListItem
        
        />
    }

    render() {
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="My Donation" />
                <View>
                    {
                        this.state.allDonation.length == 0
                            ? (
                                <View> <Text> List of all Book Donations </Text> </View>
                            ) : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allDonation}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}