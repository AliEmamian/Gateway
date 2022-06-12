import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.model';

describe('AppController', () => {
  let appController: AppController;
  let appServicer: AppService;
  let user: User
  beforeEach(async () => {
    // const app: TestingModule = await Test.createTestingModule({
    //   controllers: [AppController],
    //   providers: [AppService],
    // }).compile();
    // appController = app.get<AppController>(AppController);
    appServicer = new AppService();
    appController = new AppController(appServicer);
    user = appController.createUser({ name: 'ali', age: 22, nationalCode: '23124', address: 'Iran mashhad' });
  });

  describe('CRUD user', () => {
    it('create', () => {
      expect(user.name).toBe('ali');
    });
    it('find', () => {
      let users = [];
      users = appController.find({name:'ali'});
      expect(users.length).toBe(1);
      expect(users[0].age).toBe(22);
    });
    it('update', () => {
      let updateUser = appController.updateUser(user.id,{name:'ahmad'});
      expect(updateUser.name).toBe('ahmad');
    });    
    it('delete', () => {
      let deleteUser = appController.removeUser(user.id );
      expect(deleteUser.name).toBe('ali');      
      let users=appController.find({});
      expect(users.length).toBe(0);      

    });
  });
});
