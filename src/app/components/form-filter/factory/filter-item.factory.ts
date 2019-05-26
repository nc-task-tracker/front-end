import { Injectable, InjectionToken, Inject } from '@angular/core';
import { AbstractBuilder } from '../builders/abstract.builder';
import {FilterType, InputModel} from "../../../models/filter-item.model";
// import { FilterType, InputModel } from '../models/filter-item.model';

export const FILTER_ITEM_BUILDER = new InjectionToken('FILTER_ITEM_BUILDER');

@Injectable()
export class FilterItemFactory {

    private buildersMap: Map<FilterType, AbstractBuilder> = new Map();

    constructor(@Inject(FILTER_ITEM_BUILDER) private builders: AbstractBuilder[]) {
        console.log(builders);
        builders.forEach(builder => {
            if (builder.type instanceof Array) {
                builder.type.forEach(type => {
                    this.buildersMap.set(type, builder);
                });
            } else {
                this.buildersMap.set(builder.type, builder);
            }
        });
    }

    createItem(model: InputModel) {
        const builder = this.buildersMap.get(model.type);
        return builder ? builder.build(model) : null;
    }

}
