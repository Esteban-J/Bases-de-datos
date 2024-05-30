import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getEvaluations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/evaluations`);
  }

  deleteEvaluation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/evaluations/${id}`);
  }

  updateEvaluation(evaluation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/evaluations/${evaluation.id}`, evaluation);
  }

  createEvaluation(evaluation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/evaluations`, evaluation);
  }
}
