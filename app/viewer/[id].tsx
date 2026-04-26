import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function ViewerScreen() {
  const { uri, type } = useLocalSearchParams<{ uri: string; type: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const decodedUri = decodeURIComponent(uri ?? "");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 8 }]}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      {type === "video" ? (
        <VideoPlayer uri={decodedUri} />
      ) : (
        <Image
          source={{ uri: decodedUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center" },
  image: { width, height },
  backBtn: {
    position: "absolute",
    left: 12,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 6,
  },
});
