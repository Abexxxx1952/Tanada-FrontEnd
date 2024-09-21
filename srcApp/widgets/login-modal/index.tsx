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
import styles from "./styles.module.css";
import { notifyResponse } from "@/srcApp/shared/model/notifyResponse";
import { isUserFromServer } from "@/srcApp/entities/user/model/isUserFromServer";
import { UserLoginFormData } from "./model/types";
import { validationSchema } from "./lib/schema";
import { transformZodErrors } from "./model/transformZodErrors";
import { set } from "zod";

type LoginModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserFromServer | null>>;
};
export function LoginModal({ setModalOpen, setUser }: LoginModalProps) {
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
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={() => setModalOpen(false)}></div>

      <div className={styles.content}>
        <div className={styles.content__rectangle}>
          <div className={styles.content__frame}>
            <Image
              src="/images/loginPageFrame.png"
              fill={true}
              alt="loginPageFrame"
              sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
              placeholder="blur"
              blurDataURL="/images/loginPageFrame_blur.png"
            />
          </div>
          <span className={styles.content__tagline}>
            Turn your ideas into reality.
          </span>
        </div>

        <div className={styles.loginContainer}>
          <img
            className={styles.crossLogo}
            src="/icons/cross.svg"
            alt="Cross icon"
          />
          {!registerModal && (
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
                >
                  Create an account
                </span>
              </div>
            </div>
          )}
          {registerModal && (
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
