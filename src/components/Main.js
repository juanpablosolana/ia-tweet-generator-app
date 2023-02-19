import { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import createTweet from '../services/createTweet';
import { imageDefaultUrl } from '../constants/';
export default function Main() {

  const [formTweet, setFormTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imgGenerator, setImgGenerator] = useState(imageDefaultUrl);

  const handlerCreateTweet = () => {
    setIsLoading(true);
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

  return (
    <View>
      <Text>Amazing tweet AI generator</Text>
      <TextInput
        placeholder="Type here to tweet!"
        onChangeText={text => setFormTweet(text)}
      />
      <Button
        title="Generate AI tweet"
        onPress={handlerCreateTweet}
      />
      <Image
        source={{ uri: imgGenerator }}
        style={{ width: 200, height: 200 }}
      />
      {isLoading ? <ActivityIndicator/> : <Text>{message}</Text>}
    </View>
  );
}