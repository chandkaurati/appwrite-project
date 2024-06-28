import React, { useEffect, useState } from "react";
import service from "../conf/config";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import Container from '../Componants/Container'
import Button from "../Componants/Button"
import parse from 'html-react-parser'

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);



  const isAuthor = post && user ? post.userId === user.$id : false;
  const deletePost = async () => {
    const status = await service.deletePost(post.id);
    status && service.deleteFile(post.featuredImge);
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative
        border rounded-xl p-2
        ">
          <img src={service.getFilePreview(post.featuredImge)} alt={post.title}
          className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3 ">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>Edit</Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
         <h1 className="text-2xl font-bold ">{post.title}</h1>
         <div className="">
         {parse(post.content)}
         </div>
        </div>

      </Container>
    </div>
  ) : null
}

export default Post;

// check if is user is author
// add delete post
