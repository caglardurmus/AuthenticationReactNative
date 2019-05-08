import React, { Component } from 'react';
import { TextInput, Alert } from 'react-native';
import Button from './components/Button';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Spinner from './components/Spinner';
import firebase from '@firebase/app';
import '@firebase/auth';

class LoginFrom extends Component {
    state = { email: '', password: '', loading: false };
    clickLogin() {
        this.setState({ loading: true })
        const { email, password } = this.state;
        if (email === '' || password === '') {
            this.setState({ loading: false });
            Alert.alert(
                'Mesaj',
                'Her iki alanda dolu olmalı!',
                [
                    { text: 'Tamam', onPress: () => null }
                ]
            );
        } else {
            //şifre en az 6 karakter olmalı
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(this.loginSuccess.bind(this))
                .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(this.loginSuccess.bind(this))
                        .catch(this.loginFail.bind(this))
                });
        }
    }

    loginSuccess() {
        this.setState({ loading: false });
        Alert.alert(
            'Mesaj',
            'Giriş Başarılı',
            [
                { text: 'Tamam', onPress: () => null }
            ]
        );
    }

    loginFail() {
        this.setState({ loading: false });
        Alert.alert(
            'Mesaj',
            'Kullanıcı Adı veya Şifre Hatalı',
            [
                { text: 'Tamam', onPress: () => null }
            ]
        );
    }

    renderButton() {
        if (!this.state.loading) {
            return <Button onPress={this.clickLogin.bind(this)}>Giriş</Button>;
        }
        return <Spinner size="small" />
    }

    render() {
        const { inputStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <TextInput
                        placeholder="E-mail"
                        style={inputStyle}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <TextInput
                        secureTextEntry
                        placeholder="Şifre"
                        style={inputStyle}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    }
}

export default LoginFrom;
