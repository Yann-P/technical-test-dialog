import { Table, Entity } from 'dynamodb-onetable';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import Dynamo from 'dynamodb-onetable/Dynamo';

const ddb = new DynamoDBClient({
  credentials: {
    accessKeyId: 'fake-key',
    secretAccessKey: 'fake-secret',
  },
  endpoint: 'http://localhost:8001',
  region: 'local',
});

const MySchema = {
  format: 'onetable:1.1.0',
  version: '0.0.1',
  indexes: {
      primary: { hash: 'PK', sort: 'SK' },
  },
  models: {
      Collection: {
          PK: { type: String, value: '${_type}' },
          SK: { type: String, value: '${contractAddress}' },
          contractAddress: { type: String, required: true },
          collectionName: { type: String },
          logo: { type: String },
      },
  },
  params: {
      'isoDates': true,
      'timestamps': true,
  },
}

const table = new Table({
  client: new Dynamo({client: ddb}),
  name: 'appTable',
  // name: process.env.APP_TABLE_NAME,
  schema: MySchema,
})

export const Collection = table.getModel('Collection');
export type CollectionType = Entity<typeof MySchema.models.Collection>;
