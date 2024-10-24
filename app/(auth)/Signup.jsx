import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { router } from 'expo-router'
const Signup = () => {
  const [form,setFrom] = useState({
    email:"",
    password:"",
    userName:""
  })

  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(true)

    if (form.userName === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    try {
      const result = await createUser(form.email, form.password, form.userName);
      console.log(result);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }

  }
  return (
   <SafeAreaView className="bg-primary h-full px-4">
    <ScrollView> 
      <View className="w-full justify-center min-h-[85vh] px-4 my-6">
    <Image 
    source={images.logo}
    resizeMode="contain"
    className="w-[115px] h-[35px]"
    />
    <Text className="text-2xl text-semibold mt-10 text-white font-psemibold">
      Sign up for U Videos
    </Text>

    <FormField 
    title="Email"
    value={form.email}
    handleChangeText={(value) => setFrom({...form,email:value})}
    otherStyles="mt-7"
    keyboardType="email-address"
    />
     <FormField 
    title="Username"
    value={form.userName}
    handleChangeText={(value) => setFrom({...form,userName:value})}
    otherStyles="mt-7"
    />
    <FormField 
    title="Password"
    value={form.password}
    handleChangeText={(value) => setFrom({...form,password:value})}
    otherStyles="mt-7"
    />

    <CustomButton
    title="Sign in"
    handlePress={() => {submit}}
    containerStyles={"mt-7"}
    isLoading={loading}
    />
    <View className="justify-center pt-5 flex-row gap-2">
      <Text className="text-lg text-gray-100 font-pregular">
        Have an account?
      </Text>
      <Link className='text-lg font-psemibold text-secondary' href="/Signin">
      Signin
      </Link>
    </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Signup