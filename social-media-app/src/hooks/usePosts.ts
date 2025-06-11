import { useState, useEffect } from 'react';
import { getData } from '../services/api.service';

interface Post {
  id: number;
  caption: string;
  fullname: string;
  imageUrl: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getData<Post>("posts", "posts");
        const normalizedPosts = data.map((post) => ({
          id: post.id,
          caption: post.caption,
          fullname: post.fullname ?? "",
          imageUrl: post.imageUrl ?? "",
        }));
        setPosts(normalizedPosts);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch posts');
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};