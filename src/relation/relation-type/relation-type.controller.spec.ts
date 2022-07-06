import { Test, TestingModule } from '@nestjs/testing';
import { RelationTypeController } from './relation-type.controller';

describe('RelationTypeController', () => {
  let controller: RelationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationTypeController],
    }).compile();

    controller = module.get<RelationTypeController>(RelationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
