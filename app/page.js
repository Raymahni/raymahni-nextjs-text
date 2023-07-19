import styles from "./page.module.css";
import Exchange from "@/app/Exchange";

export default function Home() {
  return (
    <main className={styles.main}>
      <Exchange />
    </main>
  );
}
