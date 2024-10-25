import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const {query} = useLocalSearchParams();
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>Queries</Text>
    </SafeAreaView>
  )
}

export default Search