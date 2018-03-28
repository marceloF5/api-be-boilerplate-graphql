import { IModels } from "./models.interface";

export interface IBaseModel {
    prototype?;
    associate?(models: IModels): void;
}