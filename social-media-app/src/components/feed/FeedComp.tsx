import { useEffect, useState } from "react";
import { getData } from "../../services/api.service";
import CardPost from "../Card/CardPost";
import type { Post } from "../../types/post.types";
//import { getPosts } from "../../services/GetPost.service";

// type FeedCompProp = {
//   children: ReactNode;
// };

function FeedComp() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getData<Post>("posts", "posts");
      setPosts(data);
    } catch (error) {
      setError("Failed to fetch posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // if (loading) return <div>Loading posts...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!posts.length) return <div>No posts available</div>;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <CardPost posts={posts} />
    </div>
  );
}

export default FeedComp;
