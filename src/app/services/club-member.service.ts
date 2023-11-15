import { Injectable } from '@angular/core';
import { ClubMember } from '../models/clubMember';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubMemberService {

  constructor(private http:HttpClient) {

   }
  
}
