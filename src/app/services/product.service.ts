import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }
  productsService: Product[] = [
    {
      idProduct: 1,
      nameProduct: 'טלפון סלולרי',
      descriptionProduct:
        'טלפון סלולרי בעל מסך LCD צבעוני גדול ופונקציות מתקדמות',
      manufacturer: 'Samsung',
      qty: 100,
      priceProduct: 1500,
      productImage: 'https://example.com/phone1.jpg',
    },
    {
      idProduct: 2,
      nameProduct: 'מחשב נייד',
      descriptionProduct: 'מחשב נייד דק וקל בעל מעבד מהיר וזיכרון גדול',
      manufacturer: 'HP',
      qty: 50,
      priceProduct: 3000,
      productImage: 'https://example.com/laptop1.jpg',
    },
    {
      idProduct: 3,
      nameProduct: 'טלוויזיה חכמה',
      descriptionProduct:
        "טלוויזיה חכמה בגודל 55 אינץ', עם תמיכה באפליקציות נפוצות ותכנים בעלי איכות גבוהה",
      manufacturer: 'LG',
      qty: 30,
      priceProduct: 2500,
      productImage: 'https://example.com/tv1.jpg',
    },
    {
      idProduct: 4,
      nameProduct: 'אוזניות אלחוטיות',
      descriptionProduct:
        'אוזניות אלחוטיות בעלות איכות סאונד מעולה וטכנולוגיה לידי הפעלה נוחה',
      manufacturer: 'Sony',
      qty: 80,
      priceProduct: 200,
      productImage: 'https://example.com/earphones1.jpg',
    },
    {
      idProduct: 5,
      nameProduct: 'מקרן קולנוע ביתי',
      descriptionProduct: 'מקרן קולנוע ביתי ברזולוציה גבוהה וצבעים חיים',
      manufacturer: 'Epson',
      qty: 20,
      priceProduct: 4000,
      productImage: 'https://example.com/projector1.jpg',
    },
    {
      idProduct: 6,
      nameProduct: 'ספסל גינה',
      descriptionProduct: 'ספסל גינה נוח ואיכותי בעל עיצוב ייחודי',
      manufacturer: 'GardenTech',
      qty: 10,
      priceProduct: 300,
      productImage: 'https://example.com/bench1.jpg',
    },
    {
      idProduct: 7,
      nameProduct: 'שולחן עבודה',
      descriptionProduct: 'שולחן עבודה מרווח ואיכותי לשימוש במשרד או בבית',
      manufacturer: 'OfficePro',
      qty: 25,
      priceProduct: 600,
      productImage: 'https://example.com/desk1.jpg',
    },
    {
      idProduct: 8,
      nameProduct: 'תרמיל טיולים',
      descriptionProduct: 'תרמיל טיולים עמיד ונוח בעל מערכות תיקונים מתקדמות',
      manufacturer: 'NorthFace',
      qty: 40,
      priceProduct: 250,
      productImage: 'https://example.com/backpack1.jpg',
    },
    {
      idProduct: 9,
      nameProduct: 'מכונת קפה',
      descriptionProduct:
        'מכונת קפה אוטומטית עם טכנולוגיה חכמה להכנת קפה מושלם',
      manufacturer: 'DeLonghi',
      qty: 15,
      priceProduct: 1000,
      productImage: 'https://example.com/coffeemachine1.jpg',
    },
    {
      idProduct: 10,
      nameProduct: 'מסילת רולר בליידס',
      descriptionProduct:
        'מסילת רולר בליידס מקצועית ואיכותית לשימוש בפארקים וברחובות',
      manufacturer: 'RollerBlade',
      qty: 60,
      priceProduct: 150,
      productImage: 'https://example.com/rollerblades1.jpg',
    },
  ];

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(
      'https://localhost:44382/api/Product/GetProducts'
    );
  }

  deleteProduct(idProduct: number): Observable<Product[]> {
    return this.http.delete<Product[]>('https://localhost:44382/api/Product/DeleteProduct/' + idProduct);
  }
  addProduct(productToAdd: Product): Observable<Product[]> {
    return this.http.post<Product[]>('https://localhost:44382/api/Product/AddProduct', productToAdd)
  }

  editProduct(productToEdit : Product) : Observable <Product[]>{
    return this.http.put <Product[]> ('https://localhost:44382/api/Product/EditProduct' , productToEdit )
  }


}
