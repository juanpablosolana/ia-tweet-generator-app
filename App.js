import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/components/Main';

export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Main />
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
});
