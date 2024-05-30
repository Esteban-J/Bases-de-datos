import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  evaluations: any[] = [];
  newEvaluation: any = {};

  constructor(private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.loadEvaluations();
  }

  loadEvaluations() {
    this.evaluationService.getEvaluations().subscribe(
      (data) => {
        this.evaluations = data;
      },
      (error) => {
        console.error('Error fetching evaluations', error);
      }
    );
  }

  eliminarEvaluacion(evaluation: any) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(
      () => {
        const index = this.evaluations.indexOf(evaluation);
        if (index !== -1) {
          this.evaluations.splice(index, 1);
        }
      },
      (error) => {
        console.error('Error deleting evaluation', error);
      }
    );
  }

  actualizarEvaluacion(evaluation: any) {
    this.evaluationService.updateEvaluation(evaluation).subscribe(
      () => {
        console.log('Evaluation updated successfully');
      },
      (error) => {
        console.error('Error updating evaluation', error);
      }
    );
  }

  crearEvaluacion() {
    this.evaluationService.createEvaluation(this.newEvaluation).subscribe(
      (data) => {
        this.evaluations.push(data);
        this.newEvaluation = {};  // Reset the new evaluation object
      },
      (error) => {
        console.error('Error creating evaluation', error);
      }
    );
  }
}
