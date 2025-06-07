import styles from "./LandingPage.module.css";

const testimonials = [
  {
    name: "Sofia L.",
    feedback:
      "AI Balance helps me stay emotionally aware and productive every day.",
  },
  {
    name: "Max K.",
    feedback:
      "A perfect blend of mindfulness and technology. Love the insights!",
  },
  {
    name: "Anna J.",
    feedback:
      "Tracking my mood with AI gave me a new perspective on self-care.",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>What Users Say</h2>
      <div className={styles.testimonials}>
        {testimonials.map((t, i) => (
          <div key={i} className={styles.testimonial}>
            <p className={styles.feedback}>"{t.feedback}"</p>
            <p className={styles.name}>— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
