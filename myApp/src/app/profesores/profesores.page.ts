import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  teachers: any[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(
      (data: any[]) => {
        this.teachers = data.map((teacher: any) => ({
          id: teacher[0],
          name: teacher[1],
          lastName: teacher[2], 
        }));
      },
      (error) => {
        console.error('Error fetching teachers', error);
      }
    );
  }

}
