import { Component, Injector, ViewChild, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { PrimengTableHelper } from '../booking-history/PrimengTableHelper';


@Component({
    selector: 'app-awaiting-approval',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class AuditLogsComponent  implements OnInit {
    @ViewChild('dataTableAuditLogs', { static: true }) dataTable: Table;
    @ViewChild('paginatorAuditLogs', { static: true }) paginator: Paginator;

    
    primengTableHelper = new PrimengTableHelper();

    constructor(
    ) {
       
    }

    ngOnInit(): void {
    }



    getAuditLogs(event?: LazyLoadEvent) {
        
        this.primengTableHelper.showLoadingIndicator();

    }
}