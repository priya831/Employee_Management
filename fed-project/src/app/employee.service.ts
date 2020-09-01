import { Injectable,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:4000'
  
  constructor(private http : HttpClient) { 
    this.http = http
  }

  getEmployeeDetails(){
    return this.http.get(this.url+'/employee')
  }

  getSelectedEmployeeDetails(id: number){
    return this.http.get(this.url+'/employee-details/' + id)
  }

  getSelectedDetails(id: number){
    return this.http.get(this.url+'/edit-employee-id/' + id)
  }

  updateEmployee(id : number , name : string , location: string , email: string , mobile : string){
    const body = {
      id : id,
      name: name,
      location: location, 
      email: email,
      mobile: mobile
    }
    return this.http.put(this.url + '/edit-employee/' + id , body)
  }

  addEmp(name : string , location: string , email: string , mobile : string){
    const body = {
      name: name,
      location: location, 
      email: email,
      mobile: mobile
    }
    return this.http.post(this.url + '/add-employee' , body)
  }

  deleteEmployee(id: number){
    return this.http.delete(this.url + '/employee/' + id)
  }

}
