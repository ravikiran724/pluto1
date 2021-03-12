import { Component, OnInit } from "@angular/core";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { CoreService } from "app/service/core/core.service";
import { ToastrService } from "ngx-toastr";
import { RelationshipService } from "app/service/my-service/relationship/relationship.service";

@Component({
  selector: "ms-relationships",
  templateUrl: "./relationships.component.html",
  styleUrls: ["./relationships.component.scss"],
})
export class RelationshipsComponent implements OnInit {
  tableTabData;
  arrDataDelete;
  isShow = false;

  displayedTransactionColumns: string[] = [
    "Checkbox",
    "FromObject",
    "ToObject",
    "AToBDescription",
    "BToADescription",
    "Created",
    "Username",
    "Action",
  ];

  users = [];
  relationshipTypes = [];
  objects = [];

  constructor(
    private pageTitleService: PageTitleService,
    private coreService: CoreService,
    private service: RelationshipService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.arrDataDelete = [];
    this.pageTitleService.setTitle("Relationships");

    this.service.getAll().subscribe(
      (result) => {
        console.log(result);
        if(result.relationships) {
          this.tableTabData = result.relationships;
          this.users = result.users;
          this.relationshipTypes = result.relationshipTypes;
          this.objects = result.objects;
          for (let i in this.tableTabData) {
            this.tableTabData[i].Checkbox = false;
            for (let j in this.users) {
              if (this.users[j].id == this.tableTabData[i].createdByUserId) {
                this.tableTabData[i].user = this.users[j];
                break;
              }
            }
            for (let j in this.relationshipTypes) {
              if (this.relationshipTypes[j].id == this.tableTabData[i].relationshipTypeId) {
                this.tableTabData[i].relationshipType = this.relationshipTypes[j];
                break;
              }
            }
            for (let j in this.objects) {
              if (this.objects[j].id == this.tableTabData[i].fromObjectId) {
                this.tableTabData[i].fromObject = this.objects[j];
                break;
              }
            }
            for (let j in this.objects) {
              if (this.objects[j].id == this.tableTabData[i].toObjectId) {
                this.tableTabData[i].toObject = this.objects[j];
                break;
              }
            }
          }
          
        }
        
      },
      (error) => {
        if (error.status == 401) {
          this.toastr.error("Login error");
        }
      }
    );
  }

  addNew() {
    this.coreService.addRelationship().subscribe((result) => {
      console.log(result);
        if (result) {
          this.toastr.success("Item created");
          this.ngOnInit();
        }
        
    });
  }
  isDate(value) {
    return value instanceof Date;
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
      this.arrDataDelete.push(item.Id);
    }
    console.log(this.arrDataDelete);
  }
  showDetail(element) {
    this.coreService.editRelation(element).subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.toastr.success("Item Updated");
      }

      if (result == "Deleted") {
        this.ngOnInit();
        this.toastr.success("Item Deleted");
      }
    });
  }
  deleteObject(id) {
    if (id) {
      this.coreService
      .deleteObject("Are you sure you want to delete this Relationships")
      .subscribe((res) => {
        if (res === "yes") {
            this.service.deleteRelationship(id).subscribe(
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
      .deleteObject("Are you sure you want to delete this Relationships")
      .subscribe((res) => {
        if (res === "yes") {
            this.service.deleteRelationships(this.arrDataDelete).subscribe(
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
