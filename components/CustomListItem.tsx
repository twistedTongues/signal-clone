import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
};

export type chatMessage = {
  displayName: string;
  email: string;
  message: string;
  photoURL: string;
  timestamp: string;
};

const CustomListItem = ({ id, chatName, enterChat }: Props) => {
  const [chatMessages, setChatMessages] = useState<chatMessage[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (querySnapshot) =>
        setChatMessages(querySnapshot.docs.map((detail) => (detail.data()))),
    );
    return unsub;
  }, []);

  return (
    <ListItem
      key={id}
      bottomDivider
      onPress={() => enterChat(id, chatName)}
    >
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL ||
            "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
