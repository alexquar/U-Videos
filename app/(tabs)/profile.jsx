import { View, FlatList, Image, Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants';
import EmptyState from '../../components/EmptyState';
import { getUserPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/globalProvider';
import InfoBox from '../../components/InfoBox';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';
const profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: posts } = useAppwrite(()=>getUserPosts(user.$id));

  const logout = async () => {
    try{
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/Signin");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center pt-6 pb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
            <Image
            source={icons.logout} resizeMode='contain' className="w-6 h-6"/>
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                {user &&
              <Image source={{uri: user.avatar || null}} className="w-[90%] h-[90%] rounded-lg" resizeMode='cover'/>
                }
              </View>
              <InfoBox
              title={user?.userName}
              containerStyles="mt-5"
              titleStyles="text-lg"
               />
               <View className="mt-5 flex-row">
                <InfoBox  title={posts.length || 0} subTitle="Posts" containerStyles="mr-10" titleStyles="text-xl"  />
                <InfoBox title={800} subTitle="Followers" titleStyles="text-xl" />
               </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="Sorry, we got nothing to show you for your search..." />
        )
        }
      />
    </SafeAreaView>
  );
};

export default profile;