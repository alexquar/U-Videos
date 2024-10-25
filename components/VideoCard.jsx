

import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
const VideoCard = ({video: {title, thumbnail, video, users}}) => {
    let avatar
    let name
    if(users){
     avatar = users.avatar
     name = users.userName 
    }

    const [playing, setPlaying] = useState(false)


    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        {avatar ? (
                            <Image
                                source={{ uri: avatar }}
                                className="w-full h-full rounded-lg"
                            />
                        ) : (
                            <View className="w-full h-full rounded-lg bg-gray-200" />
                        )}
                    </View>
                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {name}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
            </View>
            {
                playing ?
                <Text>Playing</Text>
                :
                <TouchableOpacity onPress={() => setPlaying(true)}>
                    
                </TouchableOpacity>
            }
        </View>
    )
}


export default VideoCard