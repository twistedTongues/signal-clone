import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { useLayoutEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: NavigationProp;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Back to Login",
    });
  }, [navigation]);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      updateProfile(userCredential.user, {
        displayName: name,
        photoURL: imageUrl ||
          "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
      }).then(() => {
        console.log(name);
        console.log("Profile Updated");
      }).catch((error) => {
        console.error(error);
      });
      console.log(userCredential.user);
    } catch (error) {
      console.error(error);
    }

    // createUserWithEmailAndPassword(auth, email, password).then((authUser) => {
    //   updateProfile(authUser.user, {
    //     displayName: name,
    //     photoURL: imageUrl ||
    //       "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
    //   });
    // }).catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>Create a Signal Account</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          value={email}
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile picture URL (optional)"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        disabled={!name || !password || !email}
        containerStyle={styles.button}
        title="Register"
        onPress={register}
        radius={5}
        raised
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
