export interface ITasks{
    id:string 
    text:string 
    status:string 
    date:string
}

export type InputTask=Omit<ITasks,"id"> 

export interface IState{
    list:ITasks[]
}

export enum IStatus{
    pending,
    completed,
    inProgress,
    
}