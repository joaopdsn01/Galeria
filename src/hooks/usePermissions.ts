import { useState, useEffect, useCallback } from "react";
import * as MediaLibrary from "expo-media-library";

type PermissionStatus = "undetermined" | "granted" | "denied" | "limited";

export function usePermissions() {
  const [status, setStatus] = useState<PermissionStatus>("undetermined");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MediaLibrary.getPermissionsAsync().then(({ status: s }) => {
      setStatus(s as PermissionStatus);
      setLoading(false);
    });
  }, []);

  const request = useCallback(async () => {
    setLoading(true);
    const { status: s } = await MediaLibrary.requestPermissionsAsync();
    setStatus(s as PermissionStatus);
    setLoading(false);
    return s === "granted";
  }, []);

  return { status, loading, request, granted: status === "granted" || status === "limited" };
}
