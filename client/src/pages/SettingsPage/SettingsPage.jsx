import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/auth/AuthContext";
import { updateUser, getProfile, deleteAccount } from "../../api/userService";
import styles from "./SettingsPage.module.css";
import WavesLottie from "../../components/WavesLottie/WavesLottie";
import Button from "../../components/Button/Button";
import PasswordField from "../../components/PasswordField/PasswordField";

export default function SettingsPage() {
  const { user, token, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, "Too long"),
      email: Yup.string().email("Invalid email").required("Required"),
      bio: Yup.string().max(200, "Max 200 characters"),
      password: Yup.string().min(6, "Min 6 characters"),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match",
      ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setMessage(null);
      setError(null);
      const confirm = values.password
        ? window.confirm("Are you sure you want to change your password?")
        : true;
      if (!confirm) return;

      try {
        const updated = await updateUser(
          {
            name: values.name,
            email: values.email,
            bio: values.bio,
            ...(values.password ? { password: values.password } : {}),
          },
          token,
        );
        setUser(updated);
        resetForm({ values: { ...values, password: "", passwordConfirm: "" } });
        setMessage("Profile updated successfully");
      } catch (err) {
        const msg = err.response?.data?.detail || "Failed to update profile";
        setError(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account and all your entries? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await deleteAccount(token);
      logout();
      navigate("/login");
    } catch (err) {
      alert("Failed to delete account. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, setUser]);

  return (
    <>
      <WavesLottie variant="blue" />
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h1 className={styles.title}>Settings ⚙️</h1>
          <p className={styles.subheading}>
            Manage your account and personal info.
          </p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.profileCard}>
              <h3>Basic Info</h3>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user?.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Name:</strong> {user?.name || "—"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Bio:</strong> {user?.bio || "—"}
              </p>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className={styles.form}
              noValidate
            >
              <div className={styles.cardSection}>
                <h4 className={styles.sectionTitle}>Update Profile</h4>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Name
                    <input
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      className={styles.input}
                    />
                  </label>

                  <label className={styles.label}>
                    Email
                    <input
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className={styles.input}
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className={styles.error}>{formik.errors.email}</p>
                    )}
                  </label>

                  <label className={styles.label}>
                    Bio
                    <textarea
                      name="bio"
                      onChange={formik.handleChange}
                      value={formik.values.bio}
                      className={styles.input}
                      rows="3"
                    />
                  </label>
                </div>
              </div>

              <div className={styles.cardSection}>
                <h4 className={styles.sectionTitle}>Change Password</h4>
                <div className={styles.fieldGroup}>
                  <PasswordField
                    label="New Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Leave blank to keep current"
                    error={formik.touched.password && formik.errors.password}
                  />
                  <PasswordField
                    label="Confirm Password"
                    name="passwordConfirm"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    placeholder="Repeat new password"
                    error={
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    }
                  />
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <Button
                  type="submit"
                  className="edit"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>

            {message && (
              <p className={`${styles.message} ${styles.success}`}>{message}</p>
            )}
            {error && (
              <p className={`${styles.message} ${styles.error}`}>{error}</p>
            )}

            <div className={styles.dangerZone}>
              <h4 className={styles.dangerZoneTitle}>Danger Zone</h4>
              <p className={styles.warningText}>
                Once deleted, your account and all data cannot be recovered.
              </p>
              <div className={styles.buttonWrapper}>
                <Button
                  type="button"
                  className="deleteAccount"
                  onClick={handleDeleteAccount}
                >
                  Delete Account Permanently
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
