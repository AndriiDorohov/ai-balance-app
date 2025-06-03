import { Formik, Form, Field } from "formik";
import styles from "./HistoryFilters.module.css";

export default function HistoryFilters({ initialValues, onChange }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      enableReinitialize
    >
      {({ values, handleChange }) => {
        const handleFilterChange = (e) => {
          handleChange(e);
          const updatedFilters = { ...values, [e.target.name]: e.target.value };
          onChange(updatedFilters);
        };

        return (
          <Form className={styles.filtersBox}>
            <label>
              Sort:
              <Field as="select" name="sort" onChange={handleFilterChange}>
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </Field>
            </label>

            <label>
              Mood:
              <Field as="select" name="mood" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </Field>
            </label>

            <label>
              From:
              <Field type="date" name="start" onChange={handleFilterChange} />
            </label>

            <label>
              To:
              <Field type="date" name="end" onChange={handleFilterChange} />
            </label>
          </Form>
        );
      }}
    </Formik>
  );
}
