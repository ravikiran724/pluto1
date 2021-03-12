import { Component, OnInit } from "@angular/core";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { CoreService } from "app/service/core/core.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "app/service/my-service/user/user.service";

@Component({
  selector: "ms-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  tableTabData;
  arrDataDelete;
  isShow = false;

  displayedTransactionColumns: string[] = [
    "Checkbox",
    "Id",
    "Username",
    "Action",
  ];

  constructor(
    private pageTitleService: PageTitleService,
    private coreService: CoreService,
    private toastr: ToastrService,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.arrDataDelete = [];
    this.pageTitleService.setTitle("Users");

    this.service.getAll().subscribe(
      (result) => {
        this.tableTabData = result;
        for (let i in this.tableTabData) {
          this.tableTabData[i].Checkbox = false;
        }
      },
      (error) => {
        if (error.status == 401) {
          this.toastr.error("Login error");
        }
      }
    );
  }

  showDetail(id) {
    this.coreService.editUser(id).subscribe((res) => {
      if (res) {
        this.ngOnInit();
        this.toastr.success("Item updated");
      } else if (res == "Deleted") {
        this.ngOnInit();
        this.toastr.success("Item deleted");
      }
    });
  }

  addNew() {
    this.coreService.addUser().subscribe((res) => {
      if (res) {
        this.ngOnInit();
        this.toastr.success("Item created");
      }
    });
  }
  selected(id) {
    for (let i in this.tableTabData) {
      let item = this.tableTabData[i];
      if (item.id == id) {
        item.Checkbox = !item.Checkbox;
        if (item.Checkbox == true) {
          this.arrDataDelete.push(item.id);
        } else {
          if (this.arrDataDelete.indexOf(id) != -1) {
            this.arrDataDelete.splice(this.arrDataDelete.indexOf(id), 1);
          }
        }
      }
    }
    console.log(this.arrDataDelete);
    console.log(this.tableTabData);
  }
  deleteAllselect() {
    this.isShow = !this.isShow;
    for (const item of this.tableTabData) {
      item.Checkbox = false;
      this.arrDataDelete = [];
    }
    console.log(this.arrDataDelete);
  }
  selectAll() {
    this.isShow = !this.isShow;
    for (const item of this.tableTabData) {
      item.Checkbox = true;
      this.arrDataDelete.push(item.id);
    }
    console.log(this.arrDataDelete);
  }
  deleteObject(id) {
    if (id) {
      this.coreService
      .deleteObject("Are you sure you want to delete this user")
      .subscribe((res) => {
            if (res === "yes") {
          this.service.deleteUser(id).subscribe(
            (result) => {
                this.toastr.success("Item deleted");
                this.ngOnInit();
            },
            (error) => {
              if (error.status == 401) {
                this.toastr.error("Login error");
              } else this.toastr.error(error.error.message);
            }
          );
        }
      });
    } else {
      this.coreService
      .deleteObject("Are you sure you want to delete this users")
      .subscribe((res) => {
        if (res === "yes") {
          
            this.service.deleteUsers(this.arrDataDelete).subscribe(
              (result) => {
                  this.toastr.success("Items deleted");
                  this.ngOnInit();
              },
              (error) => {
                if (error.status == 401) {
                  this.toastr.error("Login error");
                } else this.toastr.error(error.error.message);
              }
            );
        }
      });
    }
    
  }
}
