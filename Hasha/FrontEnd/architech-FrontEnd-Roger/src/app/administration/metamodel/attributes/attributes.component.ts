import { Component, OnInit } from "@angular/core";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { CoreService } from "app/service/core/core.service";
import { AttributeTypeService } from "app/service/my-service/attribute-type/attribute-type.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ms-attributes",
  templateUrl: "./attributes.component.html",
  styleUrls: ["./attributes.component.scss"],
})
export class AttributesComponent implements OnInit {
  tableTabData;
  arrDataDelete;
  isShow = false;

  displayedTransactionColumns: string[] = [
    "Checkbox",
    "Name",
    "Format",
    "Action",
  ];
  displayedTransactionColumnsFields: string[] = [
    "Checkbox",
    "name",
    "format",
    "Action",
  ];

  constructor(
    private pageTitleService: PageTitleService,
    private coreService: CoreService,
    private service: AttributeTypeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.arrDataDelete = [];
    this.pageTitleService.setTitle("Attributes");

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
    this.coreService.editAttribute(id).subscribe((result) => {
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
    let res = this.coreService.addAttribute().subscribe((result) => {
      if (result === "Created") {
        this.toastr.success("Item Created");
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
  deleteObject(id = null) {
    if (id) {
      this.coreService
      .deleteObject("Are you sure you want to delete this Attribute type?")
      .subscribe((res) => {
        this.service.deleteAttributeType(id).subscribe(
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
          
      });
    } else if (this.arrDataDelete.length>0) {
      this.coreService
      .deleteObject("Are you sure you want to delete this Attribute type?")
      .subscribe((res) => {
        if (res === "yes") {
            this.service.deleteAttributeTypes(this.arrDataDelete).subscribe(
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
  selectAll() {
    this.isShow = !this.isShow;
    this.arrDataDelete = [];
    for (const item of this.tableTabData) {
      item.Checkbox = true;
      this.arrDataDelete.push(item.id);
    }
    console.log(this.arrDataDelete);
  }
}
