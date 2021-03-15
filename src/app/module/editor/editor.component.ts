import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: ['']
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('editor component');
  }

}
