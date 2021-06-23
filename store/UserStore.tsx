import {observable, action, runInAction} from 'mobx';
import {User} from '../types';

class UserStore {
  @observable user: User = {};

  @action async updateUser(user: User) {
    runInAction(() => {
      this.user = user;
    });
  }
}

export default new UserStore();
