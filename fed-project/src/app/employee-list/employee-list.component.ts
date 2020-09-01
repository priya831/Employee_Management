import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  empDetails = []
  employee = []
  filteredEmp = []

  name = ''
  location = ''
  email = ''
  mobile = ''

  constructor(private service: EmployeeService,private router: Router, private http: HttpClient) {
    
  }

  ngOnInit() {
    this.getDetails()
  }

  filter(searchStr : string){
      this.filteredEmp = searchStr ? this.empDetails.filter(emp => emp.name.toLowerCase().includes(searchStr.toLowerCase())) : this.empDetails
  }
  
  getDetails(){
      this.service.getEmployeeDetails().subscribe(response => {
        if(response['status'] === 'success'){
          this.filteredEmp = this.empDetails = response['data']
        }
    })
  }

  editEmployee(id : number){
    this.service.getSelectedDetails(id).subscribe(response => {
      if(response['status']==='success'){
        this.router.navigate(['/edit-employee-id/'+id])
      }
    })
  }

  deleteEmployee(id: number){
    this.service.deleteEmployee(id).subscribe( response => {
      if(response['status']==='success'){
        this.getDetails()
      }
    })
  }

  getSelectedEmpDetails(id : number){
    this.service.getSelectedEmployeeDetails(id).subscribe(response => {
      if(response['status']==='success'){
        this.employee = response['data']
        this.router.navigate(['/employee-details/'+id], { queryParams: { emp: this.employee } })
      }
    })
  }

}
