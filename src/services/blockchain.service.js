import http from "../http-common";

class BlockChainApiService {
    register(data) {
        return http.post("/register", data);
    }
    getAllUsers() {
        return http.get("/getAllUsers");
    }

}

export default new BlockChainApiService();