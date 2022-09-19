import axios from "axios";

export const cecatiAPI = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL}/api`
});