import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "30160414-47cf1727b7538b95ab171b382";

export const fethImages = async (query, page) => {
const {data} = await axios.get(`?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
return data;
}