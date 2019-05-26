// import { FilterType } from '../models/filter-item.model';

import {FilterType} from "../../../models/filter-item.model";

export interface AbstractBuilder<Model = any, ReturnType = any> {
    type: FilterType | Array<FilterType>;
    build(model: Model): ReturnType;
}
