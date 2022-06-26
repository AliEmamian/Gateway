import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
const axios = require('axios').default;

describe('UserController', () => {
  let userController: UserController;
  let user:any;
  beforeEach(async () => {
    // const app: TestingModule = await Test.createTestingModule({
    //   controllers: [UserController],
    //   providers: [UserService],
    // }).compile();
    // UserController = app.get<UserController>(UserController);
    //userController = new UserController();
    //user = userController.create({ name: 'ali', age: 22, nationalCode: '23124', address: 'Iran mashhad' });
    user = await axios({method : 'POST',url:'http://localhost:3000/user', data:{ name: 'ali', age: 22, nationalCode: '23124', address: 'Iran mashhad' }})
  });

  describe('CRUD user',  () => {
    it('create', () => {
      expect(user.data.status).toBe(200);
    });
    it('findfindById', async() => {
      //let user ;
      //user = userController.findById(user.id);
      let findUser =await axios({method : 'get',url:'http://localhost:3000/user/'+user.data.id})
      expect(findUser.data.status).toBe(200);
      expect(findUser.data.data.age).toBe(22);
    });
    it('update',async () => {
      //let updateUser = userController.update(user.id,{id:user.id,name:'ahmad',age:25,nationalCode:'0858765485',address:'Iran esfehan'});
      let updateUser = await axios({method : 'put',url:'http://localhost:3000/user/'+user.data.id, data:{  age:25 ,address:'Iran esfehan' }})

      expect(updateUser.data.status).toBe(200);
    });    
    it('delete', async () => {
      //let deleteUser = userController.remove(user.id );
      let deleteUser =await axios({method : 'delete',url:'http://localhost:3000/user/'+user.data.id })
      expect(deleteUser.data.status).toBe(200);      
      //let user2=userController.findById(user.id);
      let user2= await axios({method : 'get',url:'http://localhost:3000/user/'+user.data.id})

      expect(user2.data.status).toBe(404);      

    });
  });
});
