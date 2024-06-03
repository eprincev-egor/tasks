export class TaskModel {
    constructor(
        readonly id: string,
        public title: string,
        public description: string
    ) {}
}