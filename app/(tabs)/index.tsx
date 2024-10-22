import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="text-white">
      <Text className='text-red-800'>Home</Text>
      <Link href="../profile">
        <Text>Go to profile</Text>
      </Link>
    </View>
  );
}

