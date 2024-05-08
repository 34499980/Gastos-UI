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
    Categoria: string;
    Monto: number;
    Tipo: string;
    movement?: Movement[];
}
export interface SummaryByMonth{
    key: string;
    category: string;
    image: string;
    amount: number;
    type: string;
    description: string;
    date: string;    
    due?: Due;
}
export interface SummaryByYear{
    input: number;
    buy: number;
    balance: number;
    date: string;
    month: string;
    year: string;
}
export interface Due{
    key?: string;
    amount?: number;
    countDues: number;
    actualCount?: number;
    movementKey?: string;
    totalAmount: number;
    
}
