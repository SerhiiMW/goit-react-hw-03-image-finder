import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api",
})


export const searchImg = (q, page = 1) => {
    const API_KEY = '40825042-d0f3996893bece4a81b491d71';
    return instance.get("/", {
        params: {
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            q,
            per_page: 12,
            page,
        }
    })
}

