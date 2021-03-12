import { Component, OnInit } from "@angular/core";
import { from } from "rxjs";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { CoreService } from "app/service/core/core.service";
import { RelationshipTypeService } from "app/service/my-service/relationship-type/relationship-type.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ms-relation-type",
  templateUrl: "./relation-type.component.html",
  styleUrls: ["./relation-type.component.scss"],
})
export class RelationTypeComponent implements OnInit {
  tableTabData;
  arrDataDelete;
  isShow = false;

  displayedTransactionColumns: string[] = [
    "Checkbox",
    "Name",
    "AToBDescription",
    "BToADescription",
    "Action",
  ];

  constructor(
    private pageTitleService: PageTitleService,
    private coreService: CoreService,
    private service: RelationshipTypeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.arrDataDelete = [];
    this.pageTitleService.setTitle("Relationship Type");

    console.log(this.tableTabData);
    this.service.getAll().subscribe((result) => {
      console.log(result);
      this.tableTabData = result;
      for (let i in this.tableTabData) {
        this.tableTabData[i].Checkbox = false;
      }
    }),
      (error) => {
        if (error.status == 401) {
          this.toastr.error("Login error");
        }
      };
  }

  showDetail(id) {
    this.coreService.editRelationType(id).subscribe((result) => {
      console.log(result);
      if (result) {
        this.toastr.success("Item updated");
        this.ngOnInit();
      }
      if (result == "Deleted") {
        this.toastr.success("Item deleted");
        this.ngOnInit();
      }
    });
  }
  addNew() {
    this.coreService.addRelationType().subscribe((result) => {
      if (result) {
        this.toastr.success("Item created");
        this.ngOnInit();
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
      .deleteObject("Are you sure you want to delete this Relationships Type")
      .subscribe((res) => {
        if (res === "yes") {
            this.service
              .deleteRelationshipType(id)
              .subscribe(
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
      .deleteObject("Are you sure you want to delete this Relationships Type")
      .subscribe((res) => {
        if (res === "yes") {
            this.service
              .deleteRelationshipTypes(this.arrDataDelete)
              .subscribe(
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
    }
    
  }
}
