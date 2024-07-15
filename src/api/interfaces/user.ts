import { IBase } from "./base";

interface ISurveyResult {
  purpose?: "looking-pet" | "looking-guardian" | "other";
  animalPreference?: "cat" | "dog" | "other" | "just-looking";
  ageRange?: "baby" | "adult" | "senior";
  genderPreference?: "male" | "female";
  healthStatus?: "healthy" | "special-needs";
  animalCareHistory?: boolean;
  reason?: string;
}
interface IUser extends IBase {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: "paw-seeker" | "paw-guardian" | "other" | "paw-admin";
  surveyResults?: ISurveyResult;
  country: string;
  city: string;
}
interface IUserCreateDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: "paw-seeker" | "paw-guardian" | "other";
  surveyResults?: ISurveyResult;
  country: string;
  city: string;
}
export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterDto {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userType?: "paw-seeker" | "paw-guardian" | "other";
  surveyResults?: ISurveyResult;
  country: string;
  city: string;
}
export type { IUser, IUserCreateDto, ISurveyResult };
