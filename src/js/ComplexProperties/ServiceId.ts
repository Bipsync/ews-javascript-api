﻿import {ExchangeService} from "../Core/ExchangeService";
import {XmlNamespace} from "../Enumerations/XmlNamespace";
import {EwsUtilities} from "../Core/EwsUtilities";
import {EwsServiceXmlReader} from "../Core/EwsServiceXmlReader";
import {EwsServiceXmlWriter} from "../Core/EwsServiceXmlWriter";
import {XmlAttributeNames} from "../Core/XmlAttributeNames";

import {StringHelper} from "../ExtensionMethods";

import {ComplexProperty} from "./ComplexProperty";
export class ServiceId extends ComplexProperty {
    public get IsValid(): boolean { return this.IsValidProxy(); }
    protected IsValidProxy(): boolean { return !StringHelper.IsNullOrEmpty(this.UniqueId); } //proxy to be able to call super. from inherited child
    UniqueId: string;
    ChangeKey: string;
    //private changeKey: string; not needed for proxy
    //private uniqueId: string; - not needed for proxy

    constructor();
    constructor(uniqueId: string);
    constructor(uniqueId?: string) {
        super();
        if (!StringHelper.IsNullOrEmpty(uniqueId)) {
            EwsUtilities.ValidateParam(uniqueId, "uniqueId");
            this.UniqueId = uniqueId;
        }
    }

    Assign(source: ServiceId): void {
        this.UniqueId = source.UniqueId;
        this.ChangeKey = source.ChangeKey;
    }
    Equals(obj: any): boolean {
        if (this === obj) {//object.ReferenceEquals(this, obj)) {
            return true;
        }
        else {
            var other: ServiceId = obj;

            if (!(other instanceof ServiceId)) {// == null) {
                return false;
            }
            else if (!(this.IsValid && other.IsValid)) {
                return false;
            }
            else {
                return this.UniqueId === other.UniqueId;//.Equals(other.UniqueId);
            }
        }
    }
    //GetHashCode(): number { return this.IsValid ? this.UniqueId.GetHashCode() : super.GetHashCode();}
    //GetJsonTypeName(): string { throw new Error("ServiceId.ts - GetJsonTypeName : Not implemented."); }
    GetXmlElementName(): string { throw new Error("abstract method must implement."); }
    LoadFromXmlJsObject(jsObject: any, service: ExchangeService): void {
        for (var key in jsObject) {
            switch (key) {
                case XmlAttributeNames.Id:
                    this.UniqueId = jsObject[key];
                    break;
                case XmlAttributeNames.ChangeKey:
                    this.ChangeKey = jsObject[key];
                    break;
                default:
                    break;
            }
        }
    }
    /**@internal */
    ReadAttributesFromXmlJsObject(reader: EwsServiceXmlReader): void {
        this.UniqueId = reader.ReadAttributeValue(null, XmlAttributeNames.Id);
        this.ChangeKey = reader.ReadAttributeValue(null, XmlAttributeNames.ChangeKey);
    }
    SameIdAndChangeKey(other: ServiceId): boolean {
        if (this.Equals(other)) {
            return ((this.ChangeKey == null) && (other.ChangeKey == null)) ||
                this.ChangeKey === other.ChangeKey;
        }
        else {
            return false;
        }
    }
    ToString(): string { return (this.UniqueId == null) ? "" : this.UniqueId; }
    /**@internal */
    WriteAttributesToXml(writer: EwsServiceXmlWriter): void {
        writer.WriteAttributeValue(XmlAttributeNames.Id, this.UniqueId);
        writer.WriteAttributeValue(XmlAttributeNames.ChangeKey, this.ChangeKey);
    }
    /** @internal */
    WriteToXml(writer: EwsServiceXmlWriter, xmlElementName?: string, xmlNamespace?: XmlNamespace): void { //todo: fix third call with namespace
        if (arguments.length > 2) {
            super.WriteToXml(writer, xmlElementName, xmlNamespace);
        }
        else if (arguments.length > 1) {
            super.WriteToXml(writer, xmlElementName);
        }
        else {
            super.WriteToXml(writer, this.GetXmlElementName());
        }
    }
}