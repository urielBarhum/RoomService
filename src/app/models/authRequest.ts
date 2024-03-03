export class AuthRequest {
    misparZehut!: string;
    roomNumber!: number;
}
export class UserToknOrder {
    iDOrderHotel!: number;
    iDHotel!: number;
    iDCustomer!: string;
    firstName!: string;
    lastName!: string;
    dateFrom!: Date;
    dateTo!: Date;
    sumPrice!: number | null;
    active!: boolean;
    roomNumber!: number;
    token!: string;
}