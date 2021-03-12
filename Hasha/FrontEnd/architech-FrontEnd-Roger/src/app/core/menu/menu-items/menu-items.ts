import { Injectable } from "@angular/core";

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: "home",
    name: "Home",
    type: "button",
    icon: "fa fa-home",
  },
  {
    state: "model",
    name: "Model",
    type: "sub",
    icon: "fa fa-cube",
    children: [
      {
        state: "objects",
        name: "Objects",
      },
      {
        state: "relationships",
        name: "Relationships",
      },
    ],
  },
  {
    state: "administration/metamodel",
    name: "Metamodel",
    type: "sub",
    icon: "fa fa-pie-chart",
    children: [
      { state: "objecttype", name: "Object Type" },
      { state: "relationtype", name: "Relationship Type" },
      { state: "attributes", name: "Attributes" },
    ],
  },
  {
    state: "administration",
    name: "Administration",
    type: "sub",
    icon: "fa fa-user-circle",
    children: [{ state: "users", name: "Users" }],
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
