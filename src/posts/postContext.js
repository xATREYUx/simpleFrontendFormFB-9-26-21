import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import domain from "../util/domain";
const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    //get posts from firebase
    try {
      console.log("getPosts Initiated");
      let getPostsRes = await axios.get(`${domain}/posts`);
      console.log("getPosts response", getPostsRes.data);
      setPosts(getPostsRes.data);
    } catch (err) {
      console.log(err);
    }
    //setPosts to context
  };

  const createPost = async (formData) => {
    console.log("---createPost Initiated---");

    //Send data to firebase
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("http://localhost:5000/posts", formData, config)
      .then((res) => console.log("axios res", res))
      .catch((err) => console.log("axios err", err));

    //get updated list of post from friebase for the postsList
  };

  const updatePost = async (data, input, index) => {
    console.log("---updatePost Initiated---");
    //get postToUpdateData
    const editPostId = data.id;
    console.log("editPost data", input);
    //send updateData to firebase
    var formData = new FormData();
    const dataFunction = async () => {
      formData.append("title", input.title);
      formData.append("caption", input.caption);
    };
    await dataFunction();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const editPostRes = await axios.put(
      `${domain}/posts/${editPostId}`,
      formData,
      config
    );

    console.log("editPost log", editPostRes);
    getPosts();
    //if uploadData to firebase succeeds then update frontend list
    // let allPosts = posts;
    // let postToUpdate = allPosts[index];
    // postToUpdate.title = input.title;
    // postToUpdate.caption = input.caption;
    // allPosts[index] = postToUpdate;
    // setPosts(allPosts);
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, getPosts, createPost, updatePost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
export { PostContextProvider };
