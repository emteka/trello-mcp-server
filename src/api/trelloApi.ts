import axios from "axios";
import { TRELLO_BASE_URL } from "../config/config";

export class TrelloApi {
  private apiKey: string;
  private token: string;
  private baseUrl: string;

  constructor(
    apiKey: string,
    token: string,
    baseUrl: string = TRELLO_BASE_URL ?? ""
  ) {
    this.apiKey = apiKey;
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async get(path: string, params: Record<string, any> = {}) {
    const response = await axios.get(`${this.baseUrl}${path}`, {
      params: {
        key: this.apiKey,
        token: this.token,
        ...params,
      },
    });
    return response.data;
  }

  async post(path: string, data: Record<string, any> = {}) {
    const response = await axios.post(`${this.baseUrl}${path}`, null, {
      params: {
        key: this.apiKey,
        token: this.token,
        ...data,
      },
    });
    return response.data;
  }

  async put(path: string, data: Record<string, any> = {}) {
    const response = await axios.put(`${this.baseUrl}${path}`, null, {
      params: {
        key: this.apiKey,
        token: this.token,
        ...data,
      },
    });
    return response.data;
  }

  async delete(path: string, data: Record<string, any> = {}) {
    const response = await axios.delete(`${this.baseUrl}${path}`, {
      params: {
        key: this.apiKey,
        token: this.token,
        ...data,
      },
    });
    return response.data;
  }

  async createList(boardId: string, name: string) {
    return await this.post("/lists", { idBoard: boardId, name });
  }

  async getLabels(boardId: string) {
    return await this.get(`/boards/${boardId}/labels`, {
      fields: "id,name,color",
    });
  }

  async createLabel(boardId: string, name: string, color: string | null) {
    return await this.post("/labels", {
      idBoard: boardId,
      name,
      color: color ?? "",
    });
  }

  async addLabelToCard(cardId: string, labelId: string) {
    return await this.post(`/cards/${cardId}/idLabels`, { value: labelId });
  }
}
