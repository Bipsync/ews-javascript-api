﻿import {XmlAttributeNames} from "../Core/XmlAttributeNames";
import {ViewBase} from "./ViewBase";
import {OffsetBasePoint} from "../Enumerations/OffsetBasePoint";
import {ServiceRequestBase} from "../Core/Requests/ServiceRequestBase";
import {ExchangeService} from "../Core/ExchangeService";
import {EwsServiceXmlWriter} from "../Core/EwsServiceXmlWriter";
import {Strings} from "../Strings";
import {Grouping} from "./Grouping";
export class PagedView extends ViewBase {
    get PageSize(): number { return this.pageSize; }
    set PageSize(value) {
        if (value <= 0) {
            throw new Error(Strings.ValueMustBeGreaterThanZero);
        }
        this.pageSize = value;
    }
    OffsetBasePoint: OffsetBasePoint;
    get Offset(): number { return this.offset; }
    set Offset(value) {
        if (value >= 0) {
            this.offset = value;
        }
        else {
            throw new Error(Strings.OffsetMustBeGreaterThanZero);
        }
    };

    private pageSize: number;
    //private offsetBasePoint: OffsetBasePoint; //not used as there is not difference in auto proerpty get or set.
    private offset: number;
    constructor(pageSize: number,
        offset: number = 0,
        offsetBasePoint: OffsetBasePoint = OffsetBasePoint.Beginning) {
        super();
        this.PageSize = pageSize;
        this.Offset = offset;
        this.OffsetBasePoint = offsetBasePoint;
    }
    GetMaxEntriesReturned(): number { return this.PageSize; }
    InternalValidate(request: ServiceRequestBase): void { super.InternalValidate(request); }
    InternalWritePagingToJson(jsonView: any/*JsonObject*/, service: ExchangeService): any { throw new Error("PagedView.ts - InternalWritePagingToJson : Not implemented."); }
    InternalWriteSearchSettingsToXml(writer: EwsServiceXmlWriter, groupBy: Grouping): void {
        if (groupBy !== null && typeof groupBy !== 'undefined') {
            groupBy.WriteToXml(writer);
        }
    }
    InternalWriteViewToXml(writer: EwsServiceXmlWriter): void {
        super.InternalWriteViewToXml(writer);
        writer.WriteAttributeValue(XmlAttributeNames.Offset, this.Offset);
        writer.WriteAttributeValue(XmlAttributeNames.BasePoint, OffsetBasePoint[this.OffsetBasePoint]);
    }
    WriteGroupingToJson(service: ExchangeService, groupBy: Grouping): any { throw new Error("PagedView.ts - WriteGroupingToJson : Not implemented."); }
    WriteOrderByToXml(writer: EwsServiceXmlWriter): void { /* No order by for paged view*/ }
}