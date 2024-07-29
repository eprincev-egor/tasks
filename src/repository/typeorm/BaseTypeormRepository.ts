import { FindOptionsWhere, Repository } from "typeorm";

export class BaseTypeormRepository<TModel extends {id: string}> {

    constructor(
        protected orm: Repository<TModel>
    ) {}

    protected async findOneWhere(where: FindOptionsWhere<TModel>): Promise<TModel | undefined> {
        return await this.orm.findOne({ where }) || undefined;
    }

    async save(model: TModel): Promise<void> {
        await this.orm.save(model);
    }
}
