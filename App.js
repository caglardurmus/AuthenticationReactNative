import React, { Component } from 'react';
import { View } from 'react-native';
import CardSection from './src/components/CardSection';
import Button from './src/components/Button';
import Spinner from './src/components/Spinner';
import Header from './src/components/Header';
import LoginForm from './src/LoginForm'
import firebase from '@firebase/app';
import '@firebase/auth';

export default class App extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    const firebaseConfig = {
      //firebase bağlantı ayarlarınız
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  clickLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={this.clickLogout.bind(this)}>Çıkış</Button>
          </CardSection>
        );
      case false:
        return (
          <LoginForm />
        );
      default:
        return (
          <Spinner size="large" />
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Giriş Ekranı" />       
        {this.renderContent()}
      </View>
    );
  }
}

