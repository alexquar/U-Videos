import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import { router } from 'expo-router'
import { createVideoPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'
const Create = () => {
  const [form,setForm] = useState({
    title:"",
    video:null,
    thumbNail:null,
    prompt:""
  })
  const [loading, setLoading] = useState(false)
  const {user} = useGlobalContext()

  const openPicker = async (selectType)=>{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbNail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        }); 
      }
    }
  } 

   const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbNail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setLoading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
    <Text className="text-2xl text-white font-psemibold">
      Create a Post
    </Text>
    <Text className="text-base mt-7 text-gray-100 font-pmedium">
    Video Title
  </Text>
    <FormField 
    value={form.title}
    placeholder="Give your vid a title"
    handleChangeText={(value) => setForm({...form,title:value})}
/>  
<View className="mt-7 space-y-2">
  <Text className="text-base text-gray-100 font-pmedium">
    Upload Video
  </Text>
  <TouchableOpacity onPress={()=>openPicker('video')}>
    {form.video ? 
    <Video 
    source={{uri:form.video.uri}}
    className="w-full h-64 rounded-2xl"
    resizeMode={ResizeMode.COVER}

    /> :
    <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
      <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
        <Image  source={icons.upload} resizeMode='contain' className="w-1/2 h-1/2" />
      </View>
      </View>
  }
  </TouchableOpacity>
</View>
<View className="mt-7 space-y-2">
<Text className="text-base text-gray-100 font-pmedium">
   Thumbnail Image
  </Text>
  <TouchableOpacity onPress={()=>openPicker('image')}>
    {form.thumbNail ? 
    <Image 
    source={{uri:form.thumbNail.uri}}
    resizeMode='cover'
    className="w-full h-64 rounded-2xl"
    />
    :
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
        <Image  source={icons.upload} resizeMode='contain' className="w-5 h-5" />
        <Text className="text-sm text-gray-100 font-pmedium">
          Choose a file
        </Text>
      </View>
  }
  </TouchableOpacity>
</View>
<Text className="text-base mt-7 text-gray-100 font-pmedium">
    Prompt Used
  </Text>
<FormField 
    value={form.prompt}
    placeholder="Prompt used to create the video"
    handleChangeText={(value) => setForm({...form,prompt:value})}
/>  
<CustomButton title="Submit & Post "
handlePress={submit}
containerStyles="mt-7"
isLoading={loading}
/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create