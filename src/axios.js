import axios from "axios";

const instance = axios.create({
  //THE API (cloud function) URL
  // "https://us-central1-challenge-a2148.cloudfunctions.net/api",
  baseURL: "http://localhost:5001/challenge-a2148/us-central1/api", //The API (cloud function ) URL
});

export default instance;
