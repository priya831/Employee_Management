import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  
  employee: []
  constructor(private activatedRoute: ActivatedRoute, private service : EmployeeService) { }

  ngOnInit() {
    this.getSelectedEmpDetails()
  }

  getSelectedEmpDetails(){
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getSelectedEmployeeDetails(id).subscribe(response => {
      if(response['status']==='success'){
        this.employee = response['data'] as []
      }
    })
  }

}
