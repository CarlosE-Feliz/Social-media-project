import { useState } from "react";
import { postData } from "../../services/apiPost.service";
import { LoggedUser } from "../../helper/user.helper";

const PostSection = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:5000/api/posts/";
  const user = LoggedUser();
  const handleShare = async () => {
    if (content.trim()) {
      if (!user) return;
      const data = {
        caption: content,
        userId: user.id,
      };
      try {
        setIsLoading(true);
        await postData(url, data);
        setContent("");
      } catch (error) {
        console.log("Failed to create post", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-2 m-12 w-105 h-52 justify-self-center-safe">
      <textarea
        className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="¿Qué estás pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        {content ? (
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={handleShare}
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? "Compartiendo..." : "Compartir"}
          </button>
        ) : (
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={handleShare}
            disabled={true}
          >
            {isLoading ? "Compartiendo..." : "Compartir"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostSection;
