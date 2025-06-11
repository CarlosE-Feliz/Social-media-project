import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "../../types/post.types";

interface CardPostProps {
  posts: Post[];
}

function CardPost({ posts }: CardPostProps) {
  return (
    <div className="grid gap-4 p-4 justify-center">
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-2xl overflow-hidden max-w-sm sm:max-w-md md:max-w-lg"
        >
          {post.imageUrl ? (
            <>
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4">
                <p className="font-bold text-gray-800">{post.fullname}</p>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  {post.caption}
                </p>
                <div className="flex justify-between items-center text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle size={20} />
                    <span className="text-sm">Comment</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                    <Share2 size={20} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4">
              <div>
                <p className="font-bold text-gray-800">{post.fullname}</p>
                <div className="h-80 content-center">
                  <h1 className="text-sm sm:text-base text-gray-600 mb-4 justify-self-center">
                    {post.caption}
                  </h1>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Share2 size={20} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CardPost;
