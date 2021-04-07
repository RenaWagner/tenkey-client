export type RecommendationAction =
  | {
      type: "recommendation/loading";
    }
  | {
      type: "recommendation/fetchedPublicStyles";
      payload: StyleData;
    };
//   | {
//       type: "user/logout";
//     };

// export type UserData = {
//   clothingType: string;
//   createdAt: string;
//   email: string;
//   firstName: string;
//   id: number;
//   lastName: string;
//   sensitiveness: string;
//   token: string;
//   updatedAt: string;
// };

export type StyleData = {
  clothingType: string;
  createdAt: string;
  id: number;
  imageUrl: string;
  maxTemp: number;
  minTemp: number;
  updatedAt: string;
};

export type RecommendationState = {
  loading: boolean;
  publicStyles: StyleData[];
  userStyles: StyleData[];
};
