export type RecommendationAction =
  | {
      type: "recommendation/loading";
    }
  | {
      type: "recommendation/fetchedPublicStyles";
      payload: StyleData[];
    }
  | {
      type: "recommendation/fetchedUserStyles";
      payload: UserStyleData[];
    };

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

export type UserStyleData = {
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
