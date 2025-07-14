import { Kafka } from 'kafkajs';

async function printTopicLeaders(topicName: string) {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
  });

  const admin = kafka.admin();
  await admin.connect();

  try {
    const metadata = await admin.fetchTopicMetadata({ topics: [topicName] });

    const topic = metadata.topics.find((t) => t.name === topicName);
    if (!topic) {
      console.log(`❌ Topic "${topicName}" not found.`);
      return;
    }

    console.log(`🧠 Topic: ${topicName}`);
    for (const partition of topic.partitions) {
      console.log(
        `Partition ${partition.partitionId} → Leader: ${partition.leader}, Replicas: [${partition.replicas.join(', ')}], ISR: [${partition.isr.join(', ')}]`,
      );
    }
  } catch (error) {
    console.error('❌ Failed to fetch topic metadata:', error);
  } finally {
    await admin.disconnect();
  }
}

printTopicLeaders('order_created');
