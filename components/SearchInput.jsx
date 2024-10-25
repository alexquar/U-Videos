import { View, Text, Alert } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { Image } from "react-native";
import { router, usePathname } from "expo-router";
const SearchInput = ({
  initialQuery
}) => {
const pathName = usePathname()
const [query, setQuery] = useState(initialQuery||'')
  return (
      <View className="w-full h-16 px-4 bg-black-100 flex-row border-2 border-black-200 rounded-2xl space-x-4 focus:border-secondary items-center">
        <TextInput
          className="flex-1 mt-0.5  text-white font-pregular text-base"
          value={query}
          
          placeholder="Search videos"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e)=>setQuery(e)}
        />

        
          <TouchableOpacity onPress={()=>{
            if(!query){
              return Alert.alert("Missing Search","Please enter a search")
            }
            if(pathName.startsWith("/search")){
              router.setParams({query})
            } else {
              router.push(`/search/${query}`)
            }
          }}  >
            <Image
              source={icons.search}
              className="w-5 h-5"
              resizeMode="contain"
              
            />
          </TouchableOpacity>
        
      </View>
  );
};

export default SearchInput;
