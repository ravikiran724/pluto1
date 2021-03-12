import { Component, OnInit } from "@angular/core";
import { PageTitleService } from "app/core/page-title/page-title.service";
import { CoreService } from "app/service/core/core.service";
import { TranslateService } from "@ngx-translate/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NestedTreeControl } from "@angular/cdk/tree";
import { ChildActivationEnd } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ObjectService } from "app/service/my-service/object/object.service";
import { DatePipe, CurrencyPipe } from "@angular/common";
import { TileStyler } from "@angular/material/grid-list/tile-styler";
import { ObjectTypeService } from "app/service/my-service/object-type/object-type.service";

interface FoodNode {
  id: Number;
  name: string;
  children?: FoodNode[];
  parentId: Number;
}

@Component({
  selector: "ms-objects",
  templateUrl: "./objects.component.html",
  styleUrls: ["./objects.component.scss"],
})
export class ObjectsComponent implements OnInit {
  TREE_DATA: FoodNode[] = [];
  /*TREE_DATA: FoodNode[] = [
    {
      id: 0,
      name: 'object name current A',
      children: [
        {
          id:0,
          name: 'AToBDescription: A to B description 1',
          children: [
            { 
              id:0,
              name: 'object name B',
              children: [
                {
                  id:0,
                  name: 'AToBDescription: A to B description',
                  children: [
                    {
                      id: 1,
                      name: "object name Z"
                    }
                  ]
                },
                {
                  id:0,
                  name: "BToADescription: B to A description",
                  children:[
                    {
                      id: 0,
                      name: "object name y"
                    }
                  ]
                }
              ]
            },
            {
              id:0,
              name:'objec name BB'
            }
          ]
        } ,
        {
          id:0,
          name: 'AToBDescription: A to B description 2',
          children: [
            { id:0, name: 'object name C'},
          ]
        },
        {
          id:0,
          name: 'BToADescription: B to A descrtiption 1',
          children: [
            {id:0,name: 'name object name D'},
          ]
        },
        
      ]
    },
  ];*/
  arrDataDelete;
  editName = false;
  ObjectTypeName = "";
  ObjectName = "";
  ObjectId;
  editCheck = false;
  customizerInDetail: boolean = false;
  attributeList: any[] = [];
  data;
  keySearch;
  tableTabData;
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  isShow = false;
  displayedTransactionColumns: string[] = [
    "Checkbox",
    "ObjectName",
    // "ObjectTypeName",
    // "Attribute",
    "CreationDate",
    // "Username",
    "Action",
  ];
  attributeValue = [];
  typeObjectList
  constructor(
    private pageTitleService: PageTitleService,
    public coreService: CoreService,
    public translate: TranslateService,
    private toastr: ToastrService,
    private service: ObjectService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private objectTypeService: ObjectTypeService
  ) {}

  ngOnInit(): void {
    this.arrDataDelete = [];
    this.pageTitleService.setTitle("Objects");
    this.coreService.shareKeySearch.subscribe((x) => {
      this.keySearch = x;
      this.service.getAll(this.keySearch).subscribe(
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
    });
    this.objectTypeService.getAll().subscribe(
      (result) => {
        this.typeObjectList = result;
        console.log(result)
      }
    )
    
  }

  loadAttributeTypes(id) {
    this.objectTypeService.getAttribute(id).subscribe(
      (result) =>{
        this.attributeValue = [];
        if (result) {
          let attributeTypes = result.attributeTypes;
          attributeTypes.forEach(element => {
            let attributevalueItem = {
              "id": 0,
              "name": "",
              "format":"",
              "value": "",
              "option": []
            }
            attributevalueItem.id = element.id;
            attributevalueItem.format = element.format;
            attributevalueItem.name = element.name;
            if(element.format === "Dropdown"){
              let obj = JSON.parse(element.valueOption)
              attributevalueItem.option = Object.keys(obj).map(key => ({type: key, value: obj[key]}))
            }
  
            this.attributeValue.push(attributevalueItem);
          });
          console.log(this.attributeValue);
        }
        
      }
    )
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
  }
  deleteAllselect() {
    this.isShow = !this.isShow;
    for (const item of this.tableTabData) {
      item.Checkbox = false;
      this.arrDataDelete = [];
    }
  }
  selectAll() {
    console.log("sucees");

    this.isShow = !this.isShow;
    for (const item of this.tableTabData) {
      item.Checkbox = true;
      this.arrDataDelete.push(item.id);
    }
    console.log(this.arrDataDelete);
  }
  showDetail(id, keep = false) {
    this.editCheck = false;
    this.data = null;
    if (keep == true) {
      this.ObjectId = -1;
    }
    if (id == this.ObjectId || id == -1) {
      this.customizerInDetail = !this.customizerInDetail;
      this.ObjectId = -1;
      return;
    }
    this.ObjectId = id;
    this.service.getById(id).subscribe(
      (result) => {
        this.customizerInDetail = true;
        console.log(result);
        result.attributes.forEach((element) => {
          if (element.format == "Date") {
            element.alueDislay = this.datePipe.transform(
              element.Value,
              "MM-dd-yyyy"
            );
          }
          if (element.format == "Boolean") {
            element.value = element.value == "1" ? true : false;
          }
          if (element.format == "Dropdown") {
            let obj = JSON.parse(element.ValueOption);
            element.ValueOption = Object.keys(obj).map((key) => ({
              type: key,
              value: obj[key],
            }));
          }
          for (let i in result.attributeTypes) {
            if (result.attributeTypes[i].id==element.attributeTypeId) {
              element.format = result.attributeTypes[i].format;
              element.name = result.attributeTypes[i].name;
              break;
            }
          }
        });

        console.log(result);

        this.ObjectName = result.object.name;

        for (let i in this.typeObjectList) {
          if (this.typeObjectList[i].id == result.object.objectTypeId) {
            this.ObjectTypeName = this.typeObjectList[i].name;
            break;
          }
        }

        this.data = result;

        this.dataSource.data = [
          {
            id: this.ObjectId,
            name: this.ObjectName,
            children: [],
            parentId: null,
          },
        ];
      },
      (error) => {
        if (error.status == 401) {
          this.toastr.error("Login error");
        } else this.toastr.error(error.error.message);
      }
    );
  }

  viewRelation() {
    let res = this.coreService.editObject(1).subscribe((res) => {
      console.log(res);
    });
  }

  deleteObject() {
    this.coreService
      .deleteObject("Are you sure you want to delete this Object")
      .subscribe((res) => {
        if (res === "yes") {
            this.service.deleteObjects(this.arrDataDelete).subscribe(
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
  deleteObject1(id) {
    this.coreService
      .deleteObject("Are you sure you want to delete this Object")
      .subscribe((res) => {
        if (res === "yes") {
          this.service.deleteObject(id).subscribe(
            (result) => {
                this.toastr.success("Item deleted");
                this.showDetail(-1);
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

  addNew() {
    this.coreService.addObject().subscribe(
      (result) => {
        if (result) {
          this.ngOnInit();
          this.toastr.success("Item Created");
        }
          
      },
      (error) => {
        if (error.status == 401) {
          this.toastr.error("Login error");
        }
      }
    );
  }

  edit() {
    this.editCheck = !this.editCheck;
  }

  save() {
    console.log(this.data);
    this.service.update(this.data).subscribe(
      (result) => {
        this.toastr.success("Object Updated");

        this.showDetail(this.ObjectId, true);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

  showMore(id, node) {
    console.log(node);
    this.service
      .showMoreChildren(id, node.parentId)
      .subscribe((resultChild) => {
        this.addChild(node, id, 0, resultChild.objects);
        // this.service
        //   .showMoreParent(id, node.parentId)
        //   .subscribe((resultParent) => {
        //     if (resultChild == undefined || resultChild == null) {
        //       resultChild = [];
        //     }

        //     if (resultParent == undefined || resultParent == null) {
        //       resultParent = [];
        //     }
        //     for (let element of resultParent) {
        //       if (element.id != id) {
        //         for (let j in element.children) {
        //           element.children[j].parentId = id;
        //         }
        //         resultChild.push(element);
        //       }
        //     }
        //     for (let i in resultChild) {
        //       for (let j in resultChild[i].children) {
        //         resultChild[i].children[j].parentId = id;
        //       }
        //     }
        //     console.log(resultChild);
            
        //   });
      });
  }

  transformAmount(item, element) {
    item.Value = this.currencyPipe.transform(item.Value, "$");

    element.target.value = item.Value;
  }

  addChild(obj, id, idParent, objChild) {
    obj = obj || {};
    obj.children = objChild;
    let tmp = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = tmp;

    //return this.addChild(obj.children, id, objChild);
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children != undefined && node.children.length > 0;
}
