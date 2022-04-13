import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service'

import { User } from '../shared/users.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UsersService] 
})
export class ListComponent implements OnInit {

  users: User[] = []
  usersBeforeFiltr: User[] = []
  filtr = {
    name: '',
    city: ''
  }

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.userService.load().subscribe((data:Array<User>) => {
      this.users = data
      this.usersBeforeFiltr = this.users
      console.log(this.users)
    })
  }

  applyFiltr(){
    let usersBeforeFiltr = this.usersBeforeFiltr
    if (this.filtr.name != ''){
      usersBeforeFiltr = usersBeforeFiltr.filter((user: User)=>{
        return(user.name == this.filtr.name)
      })
    }
    if (this.filtr.city != ''){
      usersBeforeFiltr = usersBeforeFiltr.filter((user: User)=>{
        return(user.address.city == this.filtr.city)
      })      
    }
    this.users = usersBeforeFiltr
  }

  sortByName(){
    this.users = this.users.sort((a, b)=>{
      if (a.name<b.name){
        return -1
      } else {
        return 1
      }
    })
  }

  sortByCity(){
    this.users = this.users.sort((a, b)=>{
      if (a.address.city<b.address.city){
        return -1
      } else {
        return 1
      }
    })
  }

  reset(){
    this.users = this.usersBeforeFiltr
  }

}
