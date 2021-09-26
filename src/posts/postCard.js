import { useContext, useState } from "react";
import PostContext from "./postContext";

const PostCard = ({ data, index }) => {
  const { posts, setPosts, createPost, updatePost } = useContext(PostContext);

  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState({ title: "", caption: "" });

  const handleEdit = () => {
    setEditMode(true);
    setInput({ title: data.title, caption: data.caption });
  };

  const handleUpdatePost = () => {
    updatePost(data, input, index);
    setInput({ title: "", caption: "" });
    setEditMode(false);
  };

  return (
    <>
      <div style={{ visibility: editMode ? "hidden" : "visible" }}>
        <div>{data.title}</div>
        <div>{data.caption}</div>
      </div>
      <button
        style={{ visibility: editMode ? "hidden" : "visible" }}
        onClick={handleEdit}
      >
        Edit
      </button>
      <input
        name="title"
        style={{ visibility: editMode ? "visible" : "hidden" }}
        type="text"
        value={input.title}
        onChange={(e) => setInput({ ...input, title: e.target.value })}
      />
      <input
        name="caption"
        style={{ visibility: editMode ? "visible" : "hidden" }}
        type="text"
        value={input.caption}
        onChange={(e) => setInput({ ...input, caption: e.target.value })}
      />
      <button
        style={{ visibility: editMode ? "visible" : "hidden" }}
        onClick={handleUpdatePost}
      >
        Update
      </button>
    </>
  );
};
export default PostCard;
