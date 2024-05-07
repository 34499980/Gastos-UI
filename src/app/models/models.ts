export class Category{
    key: string;
    name: string;
    image: string;
    imageKey?: string;
    createdDate: string;
}
export interface Movement{
    key: string;
    description: string;
    amount: number;
    typeKey: string;
    categoryKey: string;
    month: number;
    year: number;
    dueKey: string;
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
    dueBool: boolean;
    due?: Due;
}
export interface SummaryHome {
    category: string;
    amount: number;
    type: string;
}
export interface Due{
    key: string;
    amount: number;
    countDues: number;
    actualCount: number;
    movementKey: string;
    totalAmount: number;
    
}