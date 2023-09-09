import { Input } from "@rneui/base";
import { Button, Icon } from "@rneui/themed";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { NavigationProp } from "./LoginScreen";

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
    <View style={styles.container}>
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
      <Button radius={5} onPress={createChat} title="Create New Chat" />
    </View>
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
