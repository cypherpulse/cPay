import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import type { FeedItem } from "@shared/schema";
import { mockGetFeed } from "@/mocks/mockApi";
import { subscribeToMockState, getSnapshot } from "@/mocks/mockState";
import { useConfig } from "./useConfig";

export function useFeed(filter?: string) {
  const { config } = useConfig();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSyncExternalStore(subscribeToMockState, getSnapshot);

  const fetchFeed = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (config.mockMode) {
        const data = await mockGetFeed(filter);
        setFeedItems(data);
      } else {
        setFeedItems([]);
      }
    } catch (err) {
      setError("Failed to fetch feed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [config.mockMode, filter]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  useEffect(() => {
    if (config.mockMode) {
      const unsubscribe = subscribeToMockState(() => {
        mockGetFeed(filter).then(setFeedItems);
      });
      return unsubscribe;
    }
  }, [config.mockMode, filter]);

  return { feedItems, isLoading, error, refetch: fetchFeed };
}
