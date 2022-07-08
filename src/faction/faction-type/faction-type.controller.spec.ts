import { Test, TestingModule } from '@nestjs/testing';
import { FactionTypeController } from './faction-type.controller';

describe('FactionTypeController', () => {
  let controller: FactionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactionTypeController],
    }).compile();

    controller = module.get<FactionTypeController>(FactionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
