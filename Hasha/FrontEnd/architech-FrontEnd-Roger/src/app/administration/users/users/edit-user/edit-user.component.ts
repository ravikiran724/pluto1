import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { CoreService } from "app/service/core/core.service";
import { UserService } from "app/service/my-service/user/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ms-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  id;
  username;
  password = "";

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private coreService: CoreService,
    private service: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.getById(this.id).subscribe(
      (result) => {
        this.username = result.username;
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

  update() {
    let data = {
      id: this.id,
      password: this.password,
    };
    this.service.updateUser(data).subscribe(
      (result) => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error.error);
      }
    );
    this.dialogRef.close("form");
  }
  cancel() {
    this.dialogRef.close();
  }
  delete() {
    this.coreService
      .deleteObject("Are you sure you want to delete this User")
      .subscribe((res) => {
        if (res == "yes") {
          this.service.deleteUser(this.id).subscribe(
            (result) => {
              this.dialogRef.close(true);
            },
            (error) => {
              console.log(error);
              this.toastr.error(error.error.message);
            }
          );
        }
      });
  }
}
