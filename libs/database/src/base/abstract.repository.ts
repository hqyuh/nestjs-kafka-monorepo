/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const createdUser = await this.model.create(data);
    return createdUser.toObject();
  }

  async createMany(datas: Partial<T>[]): Promise<T[]> {
    const entities: T[] = [];
    for (const data of datas) {
      const record = await this.create(data);
      entities.push(record);
    }
    return entities;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = (await this.model
      .findOne(filterQuery, {}, { lean: true })
      .exec()) as T;

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = (await this.model
      .findOneAndUpdate(filterQuery, update, {
        lean: true,
        new: true,
      })
      .exec()) as T;

    if (!document) {
      this.logger.warn(
        `Document not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery, {}, { lean: true }).exec() as Promise<
      T[]
    >;
  }
}
