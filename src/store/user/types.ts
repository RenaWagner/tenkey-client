export type UserAction =
  | {
      type: "user/loading";
    }
  | {
      type: "user/login";
      payload: UserData;
    };
//   | {
//       type: "weatherForecast/fetch";
//       payload: WeatherForecast[];
//     };

export type UserData = {
  clothingType: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  sensitiveness: string;
  token: string;
  updatedAt: string;
};

export type UserState = {
  loading: boolean;
  userInfo: UserData[];
  token: string;
};

export type UserInputData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
  sensitiveness: string;
};
