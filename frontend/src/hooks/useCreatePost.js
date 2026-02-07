import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const useCreatePost = () => {
    const navigate = useNavigate();

    const createPost = async ({ content, media }) => {
        const formData = new FormData();
        formData.append("content", content);

        if (media) {
            formData.append("media", media);
        }

        await api.post("/api/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        navigate("/feed", { replace: true });
    };

    return { createPost };
};

export default useCreatePost;