import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
  StyleSheet,
  Linking,
  Keyboard
} from 'react-native'
import createTweet from '../services/createTweet'
import { imageDefaultUrl } from '../constant'
import { Colors } from 'react-native/Libraries/NewAppScreen'
export default function Main () {
  const [formTweet, setFormTweet] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [image, setImage] = useState(imageDefaultUrl)
  const [shareTweet, setShareTweet] = useState(false)

  const handlerCreateTweet = () => {
    Keyboard.dismiss()
    if (formTweet === '') return alert('Please type something to tweet!')
    Keyboard.dismiss()
    setIsLoading(true)
    setShareTweet(false)
    Promise.all([
      createTweet('tweet', formTweet),
      createTweet('image', formTweet)
    ])
      .then(([message, image]) => {
        setMessage(message)
        setImage(image)
        setShareTweet(true)
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

  const handlerCheckEnterKey = (event) => {
    console.log(event.Button)
    if (event.key === 'Enter') {
      alert('Tweet sent!')
    }
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Tweet AI Generator</Text>
      <Text style={styles.TextLabel}>Type a subject for which you would like to generate a tweet:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="e.g: pets, Beethoven history, mexican food, etc."
        placeholderTextColor="#9a73ef"
        onChangeText={text => setFormTweet(text)}
        returnKeyType="tweet"
        onSubmitEditing={() => handlerCreateTweet()}
      />
      {
        !isLoading &&
        <Button
          style={styles.Button}
          title="Generate AI tweet"
          onPress={handlerCreateTweet}
        />
      }
      {
        !isLoading && <Image
        style={styles.Image}
        source={{ uri: image }}
        />
      }
      {
        isLoading
          ? <ActivityIndicator size='large' color='#9a73ef' />
          : <Text style={styles.Message}>{message}</Text>
      }
      {
        shareTweet && <Button
        style={styles.Button}
        title="Share on Twitter!"
        onPress={handlershareTweet}
        />
      }
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
  TextLabel: {
    fontSize: 12,
    marginTop: 10,
    color: Colors.white
  },
  Button: {
    margin: 20,
    width: 300,
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
