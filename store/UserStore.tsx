import {observable, action} from 'mobx';
import {User} from '../types';

class UserStore {
  @observable user: User = {};

  @action async updateUser(user: User) {
    this.user = user;
    return user;
  }
}

export default new UserStore();
