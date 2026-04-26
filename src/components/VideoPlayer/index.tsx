import { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { VideoView, useVideoPlayer, useEventListener } from "expo-video";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface Props {
  uri: string;
}

export function VideoPlayer({ uri }: Props) {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
  });

  const [playing, setPlaying] = useState(false);

  useEventListener(player, "playingChange", ({ isPlaying }) => {
    setPlaying(isPlaying);
  });

  const togglePlay = useCallback(() => {
    if (playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [playing, player]);

  const seek = useCallback(
    (seconds: number) => {
      player.currentTime = Math.max(0, player.currentTime + seconds);
    },
    [player]
  );

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => seek(-10)} style={styles.btn}>
          <Ionicons name="play-back" size={28} color="#fff" />
          <Text style={styles.seekLabel}>10s</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay} style={styles.btnPrimary}>
          <Ionicons name={playing ? "pause" : "play"} size={36} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => seek(10)} style={styles.btn}>
          <Ionicons name="play-forward" size={28} color="#fff" />
          <Text style={styles.seekLabel}>10s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center" },
  video: { width, height: width * 0.5625 },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginTop: 24,
  },
  btn: { alignItems: "center", gap: 4 },
  seekLabel: { color: "#aaa", fontSize: 11 },
  btnPrimary: {
    backgroundColor: "#fff",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
