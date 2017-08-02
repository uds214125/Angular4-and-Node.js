//signup model 

export class Signup {
  constructor(
    public username: string,
    public firstname: string,
    public lastname:string,
    public password:string,
    public email:string,
    public phone:number,
    public notificaion:string,    
  ) {  }
}