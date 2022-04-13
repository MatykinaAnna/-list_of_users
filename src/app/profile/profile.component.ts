import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../shared/users.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService] 
})
export class ProfileComponent implements OnInit {

  id: number | undefined;

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap(params => params.getAll('id'))
    )
    .subscribe(data=> this.id = +data);

    
  }

}
