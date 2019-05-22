import { Injectable } from '@angular/core';
import { AbstractBuilder } from './abstract.builder';
import { FilterType, InputFilterItem, FieldType, InputModel } from '../../../models/filter-item.model';

@Injectable()
export class SearchStringItemBuilder implements AbstractBuilder<InputModel, InputFilterItem> {
    type = FilterType.SEARCH_STRING;

    build(model: InputModel): InputFilterItem {
        return {
            ...model,
            fieldType: FieldType.INPUT,
            placeholder: 'Contains Value',
            value: model.value || ''
        };
    }
}
