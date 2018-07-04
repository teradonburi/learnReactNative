/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Item, Header, Body, Title, Content, Right, Footer, FooterTab, Card, Input, Button, Text } from 'native-base'
import { Field, reduxForm } from 'redux-form'
import isEmail from 'validator/lib/isEmail'
import { update } from '../modules/user'

const red = '#FF0000'

const styles = StyleSheet.create({
  error: {
    color: red,
  },
})

const renderInput = ({ input, placeholder, meta: { touched, error } }) => {
  const hasError = touched && error
  return (
    <Item error={!!hasError}>
      <Input placeholder={placeholder} {...input}/>
      {hasError ? <Text style={styles.error}>{error}</Text> : <Text />}
    </Item>
  )
}

@reduxForm({
  form: 'login',
  validate: values => {
    const errors = {}
    if (!values.email) {
      errors.email = '必須項目です'
    } else if (!isEmail(values.email)) {
      errors.email = 'メアドでありません'
    }
    return errors
  },
})
@connect(
() => ({}),
{update})
export default class EntryScreen extends React.Component {

  submit = (values) => {
    const { navigation } = this.props
    this.props.update(values.email).then(() => navigation.navigate('Login'))
  }

  render () {
    const {handleSubmit} = this.props

    return (
      <Container>
        <Header>
          <Body>
            <Title>ログイン</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <Field name='email' component={renderInput} placeholder='メールアドレス' />
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={handleSubmit(this.submit)}><Text>次へ</Text></Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
