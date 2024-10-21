import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
export default function HomeScreen() {
  return (
    <View style={styles.container} >
      <Text>Home</Text>
      <Link href="../profile">
        <Text>Go to profile</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: '808080',
    backgroundColor: '#fff',
  }
});
