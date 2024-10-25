import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { Image } from "react-native";
const SearchInput = ({
  value,
  handleChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
      <View className="w-full h-16 px-4 bg-black-100 flex-row border-2 border-black-200 rounded-2xl space-x-4 focus:border-secondary items-center">
        <TextInput
          className="flex-1 mt-0.5  text-white font-pregular text-base"
          value={value}
          
          placeholder="Search videos"
          placeholderTextColor="7b7b8b"
          onChangeText={handleChangeText}
        />

        
          <TouchableOpacity >
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
