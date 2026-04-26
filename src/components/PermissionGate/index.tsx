import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { usePermissions } from "@/hooks/usePermissions";

interface Props {
  children: React.ReactNode;
}

export function PermissionGate({ children }: Props) {
  const { granted, loading, status, request } = usePermissions();

  if (loading) return null;

  if (!granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Acesso à galeria necessário</Text>
        <Text style={styles.description}>
          {status === "denied"
            ? "Permissão negada. Habilite nas configurações do dispositivo."
            : "Para exibir suas fotos e vídeos, precisamos de permissão."}
        </Text>
        {status !== "denied" && (
          <TouchableOpacity style={styles.button} onPress={request}>
            <Text style={styles.buttonText}>Conceder permissão</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },
});
