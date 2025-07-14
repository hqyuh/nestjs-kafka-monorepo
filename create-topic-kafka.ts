import { Kafka } from 'kafkajs';

async function createTopics() {
  const kafka = new Kafka({
    clientId: 'topic-creator',
    brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
  });

  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      { topic: 'create_user', numPartitions: 3, replicationFactor: 3 },
      { topic: 'order_created', numPartitions: 3, replicationFactor: 3 },
      { topic: 'topic-test', numPartitions: 3, replicationFactor: 3 },
    ],
    waitForLeaders: true,
  });
  await admin.disconnect();
  console.log('Kafka topics ensured!');
}
// This script is used to create Kafka topics.
// don't do this in production, this is just for development
createTopics().catch((e) => {
  console.error('Error creating topics:', e);
  process.exit(1);
});
