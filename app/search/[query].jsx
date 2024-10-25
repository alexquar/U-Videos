import { View, Text, FlatList, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { RefreshControl } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
const Search = () => {
  const {query} = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(()=>searchPosts(query));

useEffect(() => {
 refetch()
}, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 ">
                <Text className="font-pmedium text-sm text-gray-100">
                  Results for: {query}
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  U Videos
                </Text>
                <SearchInput initialQuery={query} />
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

export default Search;