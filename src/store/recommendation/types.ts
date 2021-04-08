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
    }
  | {
      type: "recommendation/fetchedPubliStyleRating";
      payload: UserRatingPublicStyle[];
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
  userStyles: UserStyleData[];
  publicStylesRating: UserRatingPublicStyle[];
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

export type UserRatingPublicStyle = {
  createdAt: string;
  id: number;
  imageUrl: string;
  maxTemp: number;
  minTemp: number;
  updatedAt: string;
  users: UserRating[];
};

export type UserRating = {
  id: number;
  publicstyleRating: {
    rating: number;
  };
};
