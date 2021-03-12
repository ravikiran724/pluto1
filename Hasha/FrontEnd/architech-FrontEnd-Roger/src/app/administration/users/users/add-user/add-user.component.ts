import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators,
  FormGroup,
  EmailValidator, } from '@angular/forms';
import { MatDialogRef , MatDialog} from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CoreService } from 'app/service/core/core.service';
import { UserService } from 'app/service/my-service/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ms-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  username;
  password;
  public formLogin: FormGroup;
  public typePassword = "password";
  constructor(
    public formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditUserComponent>,
    private coreService: CoreService,
    private service: UserService,
    private toastr : ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$"),
          Validators.minLength(1),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
  
  create(e){
      this.service.createUser(e).subscribe(
        (result) => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.toastr.error("Email already exists");
        }
      )
    
    
  }

  cancel(){
    this.dialogRef.close();
  }

}
