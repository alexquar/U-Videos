import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
    <Tabs
    screenOptions={
      {
        tabBarShowLabel: false, //gets rid of extra label
        tabBarActiveTintColor: '#FFA001', //selected color
        tabBarInactiveBackgroundColor: '#CDCDE0', //unselected color
        tabBarStyle: {
          backgroundColor: '#161622', //bg color
          borderTopWidth: 1, //0-1
          borderTopColor: '#232533', //transparent too
          height: 70, //bar height
          paddingVertical: 10, //y padding
        },
      }
    }
    >
        <Tabs.Screen 
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
         /> 
          <Tabs.Screen
          name="Bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
    </ Tabs>
    </>
  )
}

export default TabsLayout