//Signin model 

export class Signin {
  constructor(
    public userid: number,
    public username: string,
    public password: string,
    public remember:string    
  ) {  }

  //   let signin =  new Signin(111, 'uds','uds123');
//   console.log('My creds are ' +signin.username);

}