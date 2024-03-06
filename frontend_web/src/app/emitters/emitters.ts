import { EventEmitter } from "@angular/core";
import { User } from "../user/model/user";


export class Emitters{
    static authEmitter=new EventEmitter<Boolean>();
}