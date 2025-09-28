import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // NEW state for loading

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      setLoading(true);  // start loading
      setError(null);    // reset errors
      setUser(null);     // clear old user
      
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();

      const person = data.results[0];
      setUser({
        name: `${person.name.first} ${person.name.last}`,
        picture: person.picture.large,
      });
    } catch (err) {
      setError("Failed to fetch user 😢");
    } finally {
      setLoading(false); // stop loading (success or error)
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get User" onPress={fetchUser} />

      {loading && <ActivityIndicator size="large" color="#704e4eff" style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {user && !loading && (
        <View style={styles.userBox}>
          <Image source={{ uri: user.picture }} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userBox: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
