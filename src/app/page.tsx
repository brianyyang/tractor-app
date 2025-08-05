import { Button, Flex } from '@mantine/core';
import styles from './page.module.css';

export default function Home() {
  return (
    <Flex className={styles.pageContainer} justify='center' align='center'>
      <Button className={styles.button}>New Game</Button>
      <Button className={styles.button}>Past Games</Button>
    </Flex>
  );
}
