import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Pet } from "src/app/model/Pet.model";
@Injectable({
    providedIn: 'root'
})
export class PetService {
    // httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   }),
    // };
    constructor(private http: HttpClient) { }


    getPetsbyStatus(status: any): Observable<any> {
        return this.http.get<Pet[]>(`${environment.apiurl}/pet/findByStatus?status=${(status)}`)
    }
    getPetbyId(id: number): Observable<any> {
        return this.http.get<Pet[]>(`${environment.apiurl}/pet/${(id)}`)
    }
    updatePet(id: number, data): Observable<any> {
        return this.http.post<Pet>(`${environment.apiurl}/pet/${(id)}`, data)
    }
    deletePet(id: number): Observable<any> {
        return this.http.delete<Pet>(`${environment.apiurl}/pet/${(id)}`)
    }
    newPet(data: Pet): Observable<any> {
        return this.http.post<Pet>(`${environment.apiurl}/pet`, data)
    }
}