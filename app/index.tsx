import { PermissionGate } from "@/components/PermissionGate";
import { MediaGrid } from "@/components/MediaGrid";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  function handleSelect(asset: MediaLibrary.Asset) {
    router.push(`/viewer/${asset.id}?uri=${encodeURIComponent(asset.uri)}&type=${asset.mediaType}`);
  }

  return (
    <PermissionGate>
      <MediaGrid onSelect={handleSelect} />
    </PermissionGate>
  );
}
