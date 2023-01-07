import axios from "axios";
import { baseURL } from "./data";
export const API_URL = baseURL;

class AuthService {
  login(data) {
    console.log(data);
    return axios.postForm(API_URL + "/auth/login/", data);
  }

  createVoting(data) {
    return axios.post(API_URL + "/api/createvotingcode/", data);
  }

  getcreateVoting() {
    return axios.get(API_URL + "/api/createvotingcode/");
  }

  setVotingEndTime(data) {
    return axios.put(API_URL + "/api/createvotingcode/", data);
  }

  getVoting({ queryKey }) {
    const [_, votingcode] = queryKey;
    return axios.get(API_URL + "/api/votingm/", {
      params: {
        votingcode: votingcode,
      },
    });
  }

  addKing(data) {
    return axios.post(API_URL + "/api/selectionking/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  editKing(data) {
    return axios.put(API_URL + "/api/selectionking/", data);
  }

  editqueen(data) {
    return axios.put(API_URL + "/api/selectionqueen/", data);
  }

  deleteKing(data) {
    return axios.delete(API_URL + "/api/selectionking/", {
      params: {
        id: data.id,
        votingcode: data.votingcode,
      },
    });
  }

  getQueenImage({ queryKey }) {
    const [_, id] = queryKey;
    return axios.get(API_URL + "/api/selectionqueenimage/", {
      params: {
        queenid: id,
      },
    });
  }

  getKingImage({ queryKey }) {
    const [_, id] = queryKey;
    return axios.get(API_URL + "/api/selectionkingimage/", {
      params: {
        kingid: id,
      },
    });
  }

  addKingImage(data) {
    return axios.post(API_URL + "/api/selectionkingimage/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  addQueenImage(data) {
    return axios.post(API_URL + "/api/selectionqueenimage/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  addQueen(data) {
    return axios.post(API_URL + "/api/selectionqueen/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteQueen(data) {
    return axios.delete(API_URL + "/api/selectionqueen/", {
      params: {
        id: data.id,
        votingcode: data.votingcode,
      },
    });
  }

  deletecreateVoting(data) {
    return axios.delete(API_URL + "/api/createvotingcode/", {
      params: {
        id: data.id,
      },
    });
  }

  getKingResult({ queryKey }) {
    const [_, votingcode] = queryKey;
    if (votingcode) {
      return axios.get("/api/kingresult/", {
        params: {
          votingcode: votingcode,
        },
      });
    }
  }

  getQueenResult({ queryKey }) {
    const [_, votingcode] = queryKey;
    if (votingcode) {
      return axios.get("/api/queenresult/", {
        params: {
          votingcode: votingcode,
        },
      });
    }
  }

  getDevice({queryKey}) {
    const [_,votingcode] = queryKey;
    console.log(votingcode)
    return axios.get("/api/registerdevice/", {
      params: {
        votingcode: votingcode,
      },
    });
   
  }

  admin() {
    axios.get(API_URL + "/login").then((res) => console.log(res));
  }

  logout() {
    localStorage.removeItem("user_token");
  }

  register(data) {
    return axios.post(API_URL + "/auth/register/", data);
  }

  getCurrentUserToken() {
    return localStorage.getItem("user_token");
  }
}

export default new AuthService();
