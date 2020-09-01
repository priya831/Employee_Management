import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
    
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  empDetails : any;
  myForm = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl()
  })

  constructor(private service: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.service.getSelectedDetails(this.id).subscribe(response => {
      if(response['status']==='success'){
        this.empDetails = response['data'] as []
        this.editFieldsValue()
      }
    })
  }

  editFieldsValue(){
  this.myForm.patchValue({
        name : this.empDetails[0].name,
        location: this.empDetails[0].location,
        email: this.empDetails[0].email,
        mobile: this.empDetails[0].mobile
      })
    }

  onSubmit(){
    const name = this.myForm.value.name
    const location = this.myForm.value.location
    const email = this.myForm.value.email
    const mobile = this.myForm.value.mobile
    this.service.updateEmployee(this.id,name,location,email,mobile).subscribe(response => {
       if(response['status'] === 'success'){
          this.router.navigate(['employee'])
      }
    })
  }

}
