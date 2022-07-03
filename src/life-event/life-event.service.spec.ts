import { Test, TestingModule } from '@nestjs/testing';
import { LifeEventService } from './life-event.service';

describe('LifeEventService', () => {
  let service: LifeEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeEventService],
    }).compile();

    service = module.get<LifeEventService>(LifeEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
