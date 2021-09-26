import { useContext } from "react";
import PostContext from "./postContext";
import { useForm } from "react-hook-form";
// import { createPost } from "./postActions";

const PostForm = () => {
  const { setPosts, createPost } = useContext(PostContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm("");

  const submitPost = async (data) => {
    var formData = new FormData();
    const dataFunction = async () => {
      formData.append("title", data.title);
      formData.append("caption", data.caption);
    };
    await dataFunction();
    // setPosts((currentValues) => [...currentValues, data]);
    await createPost(formData);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitPost)}>
        <label>Post Form</label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          {...register("title", { required: true })}
        />
        {errors.title && errors.title.type === "required" && (
          <span>This is required</span>
        )}

        <input
          type="caption"
          placeholder="Caption"
          name="caption"
          {...register("caption")}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
