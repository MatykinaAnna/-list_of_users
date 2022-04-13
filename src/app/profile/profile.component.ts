import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User, UsersService } from '../shared/users.service'
import { map, filter } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService] 
})
export class ProfileComponent implements OnInit {

  id: number | undefined;
  user: User | null = null;

  profileForm = new FormGroup({
    name: new FormControl({value: null, disabled: true}, Validators.required),
    username: new FormControl({value: null, disabled: true}, Validators.required),
    email: new FormControl({value: null, disabled: true}, Validators.required),
    street: new FormControl({value: null, disabled: true}, Validators.required),
    city: new FormControl({value: null, disabled: true}, Validators.required),
    zipcode: new FormControl({value: null, disabled: true}, Validators.required),
    phone: new FormControl({value: null, disabled: true}, Validators.required),
    website: new FormControl({value: null, disabled: true}, Validators.required),
    comment: new FormControl({value: null, disabled: false}),
  });

  constructor(private route: ActivatedRoute,
              private userService: UsersService) { 
  }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap(params => params.getAll('id'))
    )
    .subscribe((data)=> {
      this.id = +data
      console.log('userService')
      this.userService.load().subscribe((data)=>{
        let users: User[] = data
        users = users.filter((user)=>{
          return user.id == this.id
        })
        this.user = users[0]
        console.log(this.user)
        this.fillTheForm(this.user)
      })
    });
  }

  fillTheForm(user: User){
    this.profileForm.patchValue({
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode,
      phone: user.phone,
      website: user.website
    });
  }

}
