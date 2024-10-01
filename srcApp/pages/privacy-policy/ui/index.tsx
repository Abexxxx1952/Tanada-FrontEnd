import styles from "./styles.module.css";

export function PrivacyPolicy() {
  return (
    <article
      className={styles.policyContainer}
      aria-labelledby="privacy-policy-heading"
    >
      <h1
        className={styles.policyContainer__generalHeading}
        id="privacy-policy-heading"
      >
        Privacy Policy
      </h1>
      <p className={styles.policyContainer__paragraph}>
        We respect your privacy and are committed to protecting your personal
        data. This privacy policy will inform you about how we collect, use,
        store, and protect your data.
      </p>

      <h2 className={styles.policyContainer__heading}>Data Collection</h2>
      <p className={styles.policyContainer__paragraph}>
        We may collect the following information:
      </p>
      <ul className={styles.list} role="list">
        <li className={styles.list__item} role="listitem">
          Personal information: name, email address, phone number, etc.
        </li>
        <li className={styles.list__item} role="listitem">
          Usage data: information about how you use our application, including
          pages visited, time spent in the application, etc.
        </li>
        <li className={styles.list__item} role="listitem">
          Location data: geographical location of your device.
        </li>
      </ul>

      <h2 className={styles.policyContainer__paragraph}>Data Usage</h2>
      <p className={styles.policyContainer__paragraph}>
        The collected data is used for:
      </p>
      <ul className={styles.list} role="list">
        <li className={styles.list__item} role="listitem">
          Providing and improving our services.
        </li>
        <li className={styles.list__item} role="listitem">
          Personalizing the user experience.
        </li>
        <li className={styles.list__item} role="listitem">
          Analyzing and researching to improve the application.
        </li>
        <li className={styles.list__item} role="listitem">
          Communicating with you about your use of the application.
        </li>
      </ul>

      <h2 className={styles.policyContainer__paragraph}>Data Sharing</h2>
      <p className={styles.policyContainer__paragraph}>
        We do not share your personal data with third parties without your
        consent, except as required by law.
      </p>

      <h2 className={styles.policyContainer__paragraph}>Data Storage</h2>
      <p className={styles.policyContainer__paragraph}>
        We take reasonable measures to protect your data from unauthorized
        access, use, or disclosure.
      </p>

      <h2 className={styles.policyContainer__paragraph}>Your Rights</h2>
      <p className={styles.policyContainer__paragraph}>
        You have the right to request access to your personal data, its
        correction, or deletion. To do so, please contact us at:
        [email@example.com].
      </p>

      <h2 className={styles.policyContainer__paragraph}>Contact</h2>
      <p className={`${styles.policyContainer__paragraph} ${styles.contact}`}>
        If you have any questions or complaints regarding this privacy policy,
        please contact us at: [email@example.com].
      </p>
    </article>
  );
}
