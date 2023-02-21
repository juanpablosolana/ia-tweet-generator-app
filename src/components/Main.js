import { useState } from 'react'
import { View, Text, TextInput, Button, ActivityIndicator, Image, StyleSheet, Linking } from 'react-native'
import createTweet from '../services/createTweet'
import { imageDefaultUrl } from '../constant'
import { Colors } from 'react-native/Libraries/NewAppScreen'
export default function Main () {
  const [formTweet, setFormTweet] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [imgGenerator, setImgGenerator] = useState(imageDefaultUrl)

  const handlerCreateTweet = () => {
    setIsLoading(true)
    Promise.all([
      createTweet('tweet', formTweet),
      createTweet('image', formTweet)
    ])
      .then(([message, imgGenerator]) => {
        setMessage(message)
        setImgGenerator(imgGenerator)
      })
      .catch((error) => {
        setMessage('Error, IA timeout or invalid category', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handlershareTweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${message}`
    Linking.openURL(url)
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Amazing Tweet AI Generator</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Type here to tweet!"
        placeholderTextColor="#9a73ef"
        onChangeText={text => setFormTweet(text)}
      />
      {!isLoading &&
        <Button
        style={styles.Button}
        title="Generate AI tweet"
        onPress={handlerCreateTweet}
      />}
      <Image
        style={styles.Image}
        source={{ uri: imgGenerator }}
      />
      {isLoading ? <ActivityIndicator /> : <Text style={styles.Message}>{message}</Text>}
      <Button
        style={styles.Button}
        title="Share on Twitter!"
        onPress={handlershareTweet}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: Colors.white
  },
  Button: {
    margin: 20
  },
  TextInput: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    color: Colors.white
  },
  Image: {
    width: 250,
    height: 250,
    margin: 20,
    borderRadius: 10
  },
  Message: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#9a73ef',
  },
})
