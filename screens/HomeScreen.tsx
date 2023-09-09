import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/base";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login" | "Chat"
>;

type Props = {
  navigation: NavigationProp;
};

type Chat = {
  id: string;
  data: DocumentData;
};

const HomeScreen = ({ navigation }: Props) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "chats"));
      // const r = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   data: doc.data(),
      // }));
      // setChats(r);
      setChats(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    })();
  }, [chats]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleAlign: "center",
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity activeOpacity={.5} onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL ||
                  "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity activeOpacity={.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  console.log(chats[0]);
  const enterChat = (id: string, chatName: string) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        overScrollMode="always"
        style={styles.container}
        data={chats}
        renderItem={({ item }) => (
          <CustomListItem
            id={item?.id}
            chatName={item?.data?.chatName}
            enterChat={enterChat}
          />
        )}
        keyExtractor={({ id }) => id}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
