import { Test, TestingModule } from '@nestjs/testing';
import { FactionController } from './faction.controller';

describe('FactionController', () => {
  let controller: FactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactionController],
    }).compile();

    controller = module.get<FactionController>(FactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
