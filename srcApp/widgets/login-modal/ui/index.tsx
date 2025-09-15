"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useImperativeDisableScroll } from "@/srcApp/shared/hooks/useImperativeDisableScroll";
import { Button } from "@/srcApp/shared/ui/button";
import { Input } from "@/srcApp/shared/ui/input";
import { registerUser } from "@/srcApp/features/auth/registration/model/register-user";
import { RegistrationButton } from "@/srcApp/features/auth/registration/ui/button";
import { toast } from "react-toastify";
import { LoginWithGoogleButton } from "@/srcApp/features/auth/auth-by-google/ui/button";
import { LoginWithGithubButton } from "@/srcApp/features/auth/auth-by-github/ui/button";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "@/srcApp/shared/model/types";
import { LoginButton } from "@/srcApp/features/auth/login/ui/button";
import { loginUser } from "@/srcApp/features/auth/login/model/login-user";
import { useKeyboardHandler } from "@/srcApp/shared/hooks/useKeyboardHandler";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import { isUserFromServer } from "@/srcApp/entities/user/model/isUserFromServer";
import { UserLoginFormData } from "@/srcApp/widgets/login-modal/model/types";
import { validationSchema } from "@/srcApp/widgets/login-modal/lib/schema";
import { transformZodErrors } from "@/srcApp/widgets/login-modal/model/transformZodErrors";
import { useAppContext } from "@/srcApp/shared/hooks/useAppContext";
import styles from "./styles.module.css";

type LoginModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function LoginModal({ setModalOpen }: LoginModalProps) {
  const { setUser, currentUser, setCurrentUser } = useAppContext();
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<UserLoginFormData>>({});

  const router = useRouter();

  const body = document.querySelector("body");
  useImperativeDisableScroll(body, true);

  useKeyboardHandler(body, [
    ["Escape", () => setModalOpen(false)],
    [
      "Enter",
      registerModal
        ? () => handleRegisterUser(email, password)
        : () => handleLoginUser(email, password),
      [registerModal, email, password],
    ],
  ]);

  const googleLoginUrl: string = process.env.NEXT_PUBLIC_LOGIN_GOOGLE || "";
  const githubLoginUrl: string = process.env.NEXT_PUBLIC_LOGIN_GITHUB || "";

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.type === "email") {
      setEmail(e.currentTarget.value);
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
    }
    if (e.currentTarget.type === "password") {
      setPassword(e.currentTarget.value);
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    }
  }

  function handleLoginWithGoogle() {
    router.push(googleLoginUrl);
  }

  function handleLoginWithGithub() {
    router.push(githubLoginUrl);
  }

  async function handleLoginUser(email: string, password: string) {
    const validationResult = validationSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setErrors(
        transformZodErrors(validationResult.error.formErrors.fieldErrors)
      );
      return;
    }

    setLoading(true);
    try {
      const userOrError: UserFromServer | undefined | ErrorData =
        await loginUser(email, password);

      notifyResponse<UserFromServer>(
        userOrError,
        `Successfully logged ${userOrError?.email}`
      );
      if (isUserFromServer(userOrError)) {
        setUser(userOrError);
        if (currentUser === null) {
          setCurrentUser(userOrError);
        }
        router.push("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        position: "top-right",
      });
    }

    setLoading(false);
    setModalOpen(false);
  }

  async function handleRegisterUser(email: string, password: string) {
    const validationResult = validationSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setErrors(
        transformZodErrors(validationResult.error.formErrors.fieldErrors)
      );
      return;
    }

    setLoading(true);
    try {
      const userOrError: UserFromServer | undefined | ErrorData =
        await registerUser(email, password);

      notifyResponse<UserFromServer>(
        userOrError,
        `Successfully registered ${userOrError?.email}`
      );
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        position: "top-right",
      });
    }
    setLoading(false);
    setModalOpen(false);
  }

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={styles.overlay}
        onClick={() => setModalOpen(false)}
        aria-hidden="true"
      ></div>

      <div className={styles.content}>
        <div className={styles.content__rectangle}>
          <span className={styles.content__frame}>
            <Image
              src="/images/loginPageFrame.png"
              fill={true}
              alt="loginPageFrame"
            />
          </span>
          <span className={styles.content__tagline}>
            Turn your ideas into reality.
          </span>
        </div>

        <div className={styles.loginContainer}>
          <span className={styles.crossLogo}>
            <Image src="/icons/cross.svg" fill={true} alt="Cross icon" />
          </span>

          {!registerModal && (
            /*     ------------------Login Form------------------ */
            <div className={styles.loginBox}>
              <h2 className={styles.loginBox__title}>Login to your Account</h2>
              <div className={styles.loginBox__googleButton}>
                <LoginWithGoogleButton onClickHandler={handleLoginWithGoogle} />
              </div>
              <div className={styles.loginBox__githubButton}>
                <LoginWithGithubButton onClickHandler={handleLoginWithGithub} />
              </div>

              <span className={styles.loginBox__divider}>
                ------------- or Sign in with Email -------------
              </span>
              <div className={styles.loginBox__emailInput}>
                <Input
                  text={`Email (example: ${process.env.NEXT_PUBLIC_TEST_USER_EMAIL})`}
                  placeholder="Enter your email"
                  type="email"
                  onChange={handleInput}
                  value={email}
                  required={true}
                  error={errors.email}
                />
              </div>
              <div className={styles.loginBox__passwordInput}>
                <Input
                  text={`Password (example: ${process.env.NEXT_PUBLIC_TEST_USER_PASSWORD})`}
                  placeholder="Enter your password"
                  type="password"
                  onChange={handleInput}
                  value={password}
                  required={true}
                  error={errors.password}
                />
              </div>
              <div className={styles.loginBox__loginButton}>
                <LoginButton
                  onClickHandler={() => handleLoginUser(email, password)}
                  loading={loading}
                  disabled={!email || !password}
                />
              </div>
              <div className={styles.loginBox__registerContainer}>
                <span className={styles.loginBox__registerText}>
                  Not Registered Yet?
                </span>
                <span
                  className={styles.loginBox__registerLink}
                  onClick={() => setRegisterModal(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Create an account"
                >
                  Create an account
                </span>
              </div>
            </div>
          )}
          {registerModal && (
            /*    -----------------Register Form----------------- */
            <div className={styles.loginBox}>
              <h2 className={styles.loginBox__title}>Registration</h2>

              <div className={styles.loginBox__emailInput}>
                <Input
                  text="Email"
                  placeholder="email@gmail.com"
                  type="email"
                  onChange={handleInput}
                  value={email}
                  required={true}
                  error={errors.email}
                />
              </div>
              <div className={styles.loginBox__passwordInput}>
                <Input
                  text="Password"
                  placeholder="**********"
                  type="password"
                  onChange={handleInput}
                  value={password}
                  required={true}
                  error={errors.password}
                />
              </div>
              <div className={styles.loginBox__loginButton}>
                <RegistrationButton
                  onClickHandler={() => handleRegisterUser(email, password)}
                  loading={loading}
                  disabled={!email || !password}
                />
              </div>
              <div className={styles.loginBox__backButton}>
                <Button
                  onClick={() => setRegisterModal(false)}
                  text="Back"
                  textColor="white"
                  backgroundColor="var(--logoColor)"
                  focusBackgroundColor="var(--logoColor)"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
