/* eslint-disable @typescript-eslint/require-await */
import { DeepPartial, matchedFields, shallowDeepEqual } from "./utils";
import { clone } from "lodash";
import { strict } from "assert";

export class BaseFakeRepository<TModel extends { id: string }> {

    private models: TModel[] = [];
    private savesMap: Record<string, boolean> = {};

    async save(model: TModel): Promise<void> {
        this.set(model);
        this.savesMap[ model.id ] = true;
    }

    /* istanbul ignore next */
    /** ASSERT UTILS FOR TESTS ONLY: throw error if model was not saved with concrete data */
    wasSaved(expectedModel: DeepPartial<TModel>) {
        const actualBestMatchedModel = this.models.filter(model =>
            matchedFields(model, expectedModel).length > 0
        ).sort((a, b) =>
            matchedFields(a, expectedModel).length -
            matchedFields(b, expectedModel).length
        ).pop();
        strict.ok(actualBestMatchedModel, `not found model: ${JSON.stringify(expectedModel, null, 4)}`);
        strict.ok(actualBestMatchedModel.id in this.savesMap, `should be called method ${this.constructor.name}.save() for model: ${JSON.stringify(expectedModel, null, 4)}`);

        shallowDeepEqual(expectedModel, actualBestMatchedModel);
    }

    /* istanbul ignore next */
    /** ASSERT UTILS FOR TESTS ONLY: throw error if model was saved */
    wasNotSaved(expectedModel: Partial<TModel>) {
        const savedModel = this.models.find(model =>
            matchedFields(model, expectedModel).length === Object.keys(expectedModel).length
        );
        const wasSaved = savedModel && savedModel.id in this.savesMap;
        strict.ok(
            !wasSaved,
            `should NOT be saved model: ${JSON.stringify(expectedModel, null, 4)}`
        );
    }

    /** ASSERT UTILS FOR TESTS ONLY: get all models */
    getAll() {
        return clone(this.models);
    }

    /** ASSERT UTILS FOR TESTS ONLY: get last version of saved model by any condition */
    getLast() {
        return clone(this.models.at(-1));
    }

    /** ASSERT UTILS FOR TESTS ONLY: get last version of saved model by any condition */
    getBy(by: (model: TModel) => boolean | undefined) {
        return clone(this.models.find(by));
    }

    /** ASSERT UTILS FOR TESTS ONLY: insert or update model into memory */
    set(model: TModel) {
        this.models = this.models.filter(existent => existent.id !== model.id);
        this.models.push(clone(model));
    }
}
