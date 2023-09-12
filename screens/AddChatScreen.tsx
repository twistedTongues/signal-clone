import { Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { NavigationProp } from "./LoginScreen";
import { StatusBar } from "expo-status-bar";

type Props = {
  navigation: NavigationProp;
};

const AddChatScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a New Chat",
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: input,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon
            style={{ paddingRight: 5 }}
            name="wechat"
            type="antdesign"
            size={24}
            color="black"
          />
        }
      />
      <Button
        disabled={!input}
        radius={5}
        onPress={createChat}
        title="Create New Chat"
      />
    </SafeAreaView>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
