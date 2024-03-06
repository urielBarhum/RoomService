export class AuthRequest {
    misparZehut!: string;
    roomNumber!: number;
}
export class UserToknOrder {
    iDOrderHotel!: number;
    iDHotel!: number;
    idCustomer!: string;
    firstName!: string;
    lastName!: string;
    dateFrom!: Date;
    dateTo!: Date;
    sumPrice!: number | null;
    active!: boolean;
    roomNumber!: number;
    token!: string;
}