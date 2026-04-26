import { useState, useCallback } from "react";
import * as MediaLibrary from "expo-media-library";

const PAGE_SIZE = 60;

export function useMediaLibrary() {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const load = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;
      setLoading(true);

      const result = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        first: PAGE_SIZE,
        after: reset ? undefined : cursor,
        sortBy: MediaLibrary.SortBy.creationTime,
      });

      setAssets((prev) =>
        reset ? result.assets : [...prev, ...result.assets]
      );
      setCursor(result.endCursor);
      setHasMore(result.hasNextPage);
      setLoading(false);
    },
    [loading, hasMore, cursor]
  );

  const refresh = useCallback(() => {
    setCursor(undefined);
    setHasMore(true);
    load(true);
  }, [load]);

  return { assets, loading, hasMore, load, refresh };
}
