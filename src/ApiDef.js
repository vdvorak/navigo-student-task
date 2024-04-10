export const IdParam = {
    _className: 'IdParam',
    properties: {
    id: {
      required:true
    }
  }
  }
  
  export const UserData = {
    _className: 'UserData',
   properties: {
    id: {
      required:false
    }
    name: {
      required:true
    },
    surname: {
      required:true
    },
    hourlyRate: {
      required:true
    },
   }
    
  }
  
  export const UsersFilter = {
    _className: 'UsersFilter',
    // Input params
  }
  


  export class Endpoint{
    constructor(method, inputType, outputType){
      this._method = method
      this._inputType = inputType
      this._outputType = outputType
    }

    get getMethod(){
      return this._method
    }

    get geInputType(){
      return this._inputType
    }


    get getOutputType(){
      return this._outputType
    }
  }

  export const Endpoints = {
    GetUser: new Endpoint("user/get", IdParam, UserData)
    UpsertUser: new Endpoint("user/upsert", UserData, IdParam)
  }