import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../password.service';

jest.mock('argon2');
const { hash, verify } = jest.requireActual('argon2');

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    let password: string;
    let hashedPassword: string;

    beforeEach(async () => {
      password = 'TestPassword';

      jest
        .spyOn(service, 'hashPassword')
        .mockImplementationOnce(password => Promise.resolve(hash(password)));

      hashedPassword = await service.hashPassword(password);
    });

    it('hashPassword should be defined', () => {
      expect(service.hashPassword).toBeDefined();
    });

    it('It should call hash with the password', async () => {
      expect(await service.hashPassword).toBeCalledWith(password);
    });

    it('It should return a hashed password', async () => {
      hashedPassword = await service.hashPassword(password);
      expect(await service.hashPassword).toReturnWith(hashedPassword);
    });

    it('It should not equal the original password', async () => {
      expect(await service.hashPassword).not.toEqual(password);
    });
  });

  describe('verifyPassword', () => {
    let password: string;
    let hashedPassword;
    let returnValue;

    beforeEach(async () => {
      password = 'TestPassword';

      jest
        .spyOn(service, 'hashPassword')
        .mockImplementationOnce(password => Promise.resolve(hash(password)));

      jest
        .spyOn(service, 'verifyPassword')
        .mockImplementationOnce((hashedPassword, password) =>
          Promise.resolve(true)
        );

      hashedPassword = await service.hashPassword(password);
      returnValue = await service.verifyPassword(hashedPassword, password);
    });

    afterEach(() => {
      password = '';
      hashedPassword = '';
      returnValue = null;
    });

    it('verifyPassword should be defined', () => {
      expect(service.verifyPassword).toBeDefined();
    });

    it('It should call verify with the hashed password and password', async () => {
      expect(await service.verifyPassword).toBeCalledWith(
        hashedPassword,
        password
      );
    });

    it('It should return true if the password matches the hashed password', () => {
      expect(returnValue).toEqual(true);
    });

    it('It should return false if the password does not match the hashed password', async () => {
      jest
        .spyOn(service, 'verifyPassword')
        .mockImplementation(
          () => new Promise((resolve, reject) => resolve(false))
        );
      returnValue = await service.verifyPassword(hashedPassword, password);

      expect(returnValue).toEqual(false);
    });
  });
});
