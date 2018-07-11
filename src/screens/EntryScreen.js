/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Container, Item, Header, Body, Title, Content, Right, Footer, FooterTab, Card, Input, Button, Text } from 'native-base'
import { Field, reduxForm } from 'redux-form'
import { update } from '../modules/user'

const red = '#FF0000'

const styles = StyleSheet.create({
  error: {
    color: red,
  },
})

// custom属性追加
const renderInput = ({ input, placeholder, meta: { touched, error }, ...custom}) => {
  const hasError = touched && error
  return (
    <View>
      <Item error={!!hasError}>
        <Input placeholder={placeholder} {...input} {...custom}/>
      </Item>
      {hasError ? <Text style={styles.error}>{error}</Text> : <Text />}
    </View>
  )
}

// メールアドレス判定
function isEmail(mail) {
  const mail_regex1 = new RegExp('(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*') // eslint-disable-line
  const mail_regex2 = new RegExp('^[^\@]+\@[^\@]+$')
  if (mail.match(mail_regex1) && mail.match(mail_regex2)) {
    // 全角チェック
    if (mail.match(/[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/)) {
      return false
    }
        // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
    if (!mail.match(/\.[a-z]+$/)) {
      return false
    }
    return true
  }
  return false
}

@reduxForm({
  form: 'login',
  validate: values => {
    const errors = {}
    if (!values.email) {
      errors.email = '必須項目です'
    } else if (!isEmail(values.email)) {
      errors.email = 'メールアドレスではありません'
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
    this.props.update(values.email).then(() => navigation.navigate('User'))
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
            <Field testID='email' name='email' component={renderInput} placeholder='メールアドレス' />
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button testID='login' full onPress={handleSubmit(this.submit)}><Text>次へ</Text></Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
