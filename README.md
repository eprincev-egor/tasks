# Кто Что Зачем (UserStories)
- Мне как менеджеру интересно знать когда будет выполнена задача, чтобы укладываться в оговоренные с клиентом сроки.
- Мне как менеджеру необходимо добавлять новые задачи на трек разработчика посреди выполнения одной из задач, чтобы пофиксить срочный баг
- Мне как разработчику не хочется часто переключаться между задачами, чтобы не тратить кучу времени на переключение между задачами 
(минимум 20 минут, чтобы загрузить и выгрузить контекст задачи)
- Мне как менеджеру необходимо указывать согласованный срок сдачи задачи с клиентом, чтобы эта договоренность не была нарушена
- Мне как менеджеру необходимо получать уведомление о достижение половины времени выполнения задачи, чтобы я мог поговорить с разработчиком и узнать статус задачи, чтобы понимать укладываемся мы в сроки или нет
- Мне как менеджеру нужно видеть какие задачи зависят от других задач, чтобы соблюдать очередность выполнения задач, т.к. некоторые задачи невозможно выполнить до выполнения других задач
- Мне как менеджеру нужно видеть расписание по одному или нескольким проектом за раз на доске, чтобы быстрее найти нужную задачу по проекту и увидеть ее сроки
- Я как разработчик хочу детализировать потраченное время на задачу, чтобы было понятно сколько потрачено на разработку, а сколько на другие вещи, что поможет анализировать потраченное время
- Я как администратор хочу изменять расписание в прошлом, чтобы исправлять ошибки

?? Менеджер утверждает потраченное программистом время

удалить
подвинуть
расширить
сменить разработчика (за счет двух действий удаление + создание)

Magnit,DM    < DateStart >
        25.05.24                     26.05.24                      31.05.24                    |
        10 11 12 13 14 15 16 17 18   10 11 12 13 14 15 16 17 18    10 11 12 13 14 15 16 17 18  |
Alex    <X5-1577            .now.>   <! BUG-123  ><X5-1577    >    <X5-1577                 >  | <X5-1577    >
Damir   <X5-1234                 >   <X5-1244  >  <X5-1234                                 >
Andrew  <LW-1567                    > <XXXXXXXXX> <LW-1567                    > <Vacation>

Lida                                                <X5-1234  >
...

IncompleteStack

BacklogStack
X5-1577

GantDiagramView
GantDiagramViewModel
    timelines: TimelineModel[];
    incompleteTasks: TaskModel[];
    backlogTasks: TaskModel[];

ScheduleModel
    startDate: DateTimeValueObject;
    endDate: DateTimeValueObject;
    items: ScheduleItemModel[];

ScheduleItemModel
    developer: DeveloperModel;
    task: TaskModel;
    date: DateTimeValueObject;
    duration: HoursValueObject; max duration 8 hours

    исполнитель подтверждает начало работы
    исполнитель завершает задачу
        может сделать это досрочно

    ! программист может детализировать время


DeveloperModel
    level: TaskLevelType;
    vacation: VacationModel;


ProjectModel

CalendarModel
    tasks: TaskModel[];

TaskModel
    project: ProjectModel;
    priority: PriorityLevelValueObject; Low/Normal/High
    key: TaskNumberValueObject;
    author: ManagerModel;
    title: string;
    creationDate: DateTimeValueObject;
    level?: TaskLevelType;
    <deadline?: DateTimeValueObject;>!
    items: TodoListItemModel[];
    spentTime: SpentTimeModel[];

TodoListItemModel
    cost?: HoursValueObject;
    description: string;

