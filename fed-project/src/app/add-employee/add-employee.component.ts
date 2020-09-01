import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl()
  })

  constructor(private service : EmployeeService,private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.myForm.value.name)
    const name = this.myForm.value.name
    const location = this.myForm.value.location
    const email = this.myForm.value.email
    const mobile = this.myForm.value.mobile

    this.service.addEmp(name,location,email,mobile).subscribe(response => {
       if(response['status'] === 'success'){
          this.router.navigate(['employee'])
      }
    })
  }
}
