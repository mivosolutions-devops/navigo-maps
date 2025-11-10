import { getAuthorizationHeader } from "@/lib/utils";
import axios, { AxiosInstance } from "axios";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export class UsersService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      adapter: fetchAdapter,
    });
  }

  getUsers = async (
    { limit = 10, page = 1, orderBy, orderDirection, search }: TParams,
    options?: Record<string, boolean>,
  ) => {
    const params = {
      page,
      limit,
      search,
      orderBy,
      orderDirection,
      ...options,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined),
    );

    const response = await this.instance.get(`/users`, {
      headers: getAuthorizationHeader({}),
      params: filteredParams,
    });

    return response.data.payload;
  };

  getMe = async ({
    isClient,
    tokens,
  }: {
    isClient?: boolean;
    tokens?: TAuthTokens;
  }) => {
    const response = await this.instance.get(`/profiles/get-profile`, {
      headers: getAuthorizationHeader({ isClient, tokens }),
    });
    return { user: response.data.payload.user, status: response.status };
  };

  getUser = async (id: string, options: Record<string, boolean>) => {
    const params: Record<string, boolean> = {};

    Object.keys(options).forEach((key) => {
      if (options[key] !== undefined) params[key] = options[key];
    });

    const response = await this.instance.get(`/users/${id}`, {
      headers: getAuthorizationHeader({}),
      params,
    });

    return response.data.payload;
  };
}
