import {
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useMediaLibrary } from "@/hooks/useMediaLibrary";
import { useEffect } from "react";

const COLUMNS = 3;
const GAP = 2;
const SIZE = (Dimensions.get("window").width - GAP * (COLUMNS + 1)) / COLUMNS;

interface Props {
  onSelect: (asset: MediaLibrary.Asset) => void;
}

export function MediaGrid({ onSelect }: Props) {
  const { assets, loading, hasMore, load, refresh } = useMediaLibrary();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(true); }, []);

  return (
    <FlatList
      data={assets}
      numColumns={COLUMNS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      onEndReached={() => load()}
      onEndReachedThreshold={0.5}
      onRefresh={refresh}
      refreshing={loading && assets.length === 0}
      ListEmptyComponent={
        loading ? null : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhuma mídia encontrada</Text>
          </View>
        )
      }
      ListFooterComponent={
        loading && assets.length > 0 ? (
          <ActivityIndicator color="#fff" style={styles.footer} />
        ) : null
      }
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)}>
          <Image source={{ uri: item.uri }} style={styles.thumb} />
          {item.mediaType === "video" && (
            <View style={styles.videoOverlay}>
              <Ionicons name="play-circle" size={28} color="rgba(255,255,255,0.85)" />
              <Text style={styles.duration}>
                {formatDuration(item.duration)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    />
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  list: { padding: GAP },
  row: { gap: GAP, marginBottom: GAP },
  thumb: { width: SIZE, height: SIZE, backgroundColor: "#1a1a1a" },
  videoOverlay: {
    position: "absolute",
    bottom: 4,
    left: 4,
    right: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: { color: "#fff", fontSize: 11, fontWeight: "600", textShadowColor: "#000", textShadowRadius: 4 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 80 },
  emptyText: { color: "#666", fontSize: 15 },
  footer: { paddingVertical: 20 },
});
