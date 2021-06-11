import {observable, action} from 'mobx';
import {User} from '../types';

class UserStore {
  @observable user: User = {
    favorites: [],
  };

  @action updateUser(user: User) {
    this.user = user;
  }
}

export default new UserStore();
