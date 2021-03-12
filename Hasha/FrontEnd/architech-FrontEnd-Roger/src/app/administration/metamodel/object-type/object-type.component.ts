import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { TranslateService } from "@ngx-translate/core";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { CoreService } from "app/service/core/core.service";
import { ObjectTypeService } from "app/service/my-service/object-type/object-type.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ms-object-type",
  templateUrl: "./object-type.component.html",
  styleUrls: ["./object-type.component.scss"],
})
export class ObjectTypeComponent implements OnInit {
  tableTabData;
  arrDataDelete;
  isShow = false;

  displayedTransactionColumns: string[] = ["Checkbox", "Name", "Action"];

  constructor(
    private pageTitleService: PageTitleService,
    private coreService: CoreService,
    private service: ObjectTypeService,
    private matDialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.arrDataDelete = [];
    this.pageTitleService.setTitle("Object Type");
    this.service.getAll().subscribe(
      (results) => {
        this.tableTabData = results;
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
  }
  selectAll() {
    this.isShow = !this.isShow;
    for (const item of this.tableTabData) {
      item.Checkbox = true;
      this.arrDataDelete.push(item.id);
    }
    console.log(this.arrDataDelete);
  }
  showDetail(id) {
    this.coreService.editObjectType(id).subscribe((result) => {
      if (result == "Updated") {
        this.ngOnInit();
        this.toastr.success("Item Updated");
      }

      if (result == "Deleted") {
        this.ngOnInit();
        this.toastr.success("Item Deleted");
      }
    });
  }
  addNew() {
    this.coreService.addObjectType().subscribe((result) => {
      if (result == "Created") {
        this.ngOnInit();
        this.toastr.success("Item Created");
      }
        
    });
  }
  deleteObject(id) {
    
    this.coreService
      .deleteObject("Are you sure you want to delete this Object Type")
      .subscribe((res) => {
        if (res === "yes") {
          if (id) {
            this.service.deleteObjectType(id).subscribe(
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
          } else if (this.arrDataDelete.length>0) {
            this.service.deleteObjectTypes(this.arrDataDelete).subscribe(
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
            
        }
      });
  }
}
