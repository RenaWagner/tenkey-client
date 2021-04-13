export type UserAction =
  | {
      type: "user/loading";
    }
  | {
      type: "user/login";
      payload: { data: UserData; token: string };
    }
  | {
      type: "user/logout";
    }
  | {
      type: "user/updateProfile";
      payload: { userToUpdate: UserData };
    }
  | {
      type: "user/allStyles";
      payload: UserUploadedStyles[];
    }
  | {
      type: "user/deleteStyle";
      payload: number;
    };

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
  styles: UserUploadedStyles[];
};

export type UserUploadedStyles = {
  comment: string;
  createdAt: string;
  id: number;
  imageUrl: string;
  maxTemp: number;
  minTemp: number;
  rating: number;
  updatedAt: string;
  userId: number;
  wearingDate: string;
};

export type UserInputData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
  sensitiveness: string;
};

export type UpdateProfile = {
  type: string;
  sensitiveness: string;
};
