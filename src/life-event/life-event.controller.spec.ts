import { Test, TestingModule } from '@nestjs/testing';
import { LifeEventController } from './life-event.controller';

describe('LifeEventController', () => {
  let controller: LifeEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifeEventController],
    }).compile();

    controller = module.get<LifeEventController>(LifeEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
