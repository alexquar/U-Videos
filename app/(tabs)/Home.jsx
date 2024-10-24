import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
      data={[
        {$id:1},
        {$id:2}
      ]}
      keyExtractor={item=>item.$id}
      renderItem={({item})=>(
        <View>
          <Text className="">{item.$id}</Text>
        </View>
      )}
      ListHeaderComponent={()=>{
        <View className="my-6 px-4 space-y-6">
          <View className="justify-between items-start flex-row mb-6">
        <View>
          <Text>Welcome Back</Text>
          <Text>U Videos</Text>
        </View>
          </View>
        </View>
      }}
      />
    </SafeAreaView>
  )
}

export default Home